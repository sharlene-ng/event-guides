"use client";

import { useEffect, useRef, useState } from "react";
import { checklistTabs, getSectionVisual } from "@/lib/checklistData";

const tabs = checklistTabs;
const allItems = tabs.flatMap((t) => t.data.flatMap((s) => s.items));

export default function EventChecklist({
  eventId,
  initialState,
  canEdit = false,
}: {
  eventId: string;
  initialState: Record<string, boolean>;
  canEdit?: boolean;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>(initialState);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dirtyRef = useRef(false);

  const totalDone = allItems.filter((i) => checked[i.id]).length;
  const totalCount = allItems.length;
  const totalPct = totalCount > 0 ? Math.round((totalDone / totalCount) * 100) : 0;

  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const tabItems = currentTab.data.flatMap((s) => s.items);
  const tabDone = tabItems.filter((i) => checked[i.id]).length;

  useEffect(() => {
    if (!canEdit || !dirtyRef.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaving("saving");
    saveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/events/${eventId}/checklist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state: checked }),
        });
        const data = await res.json();
        setSaving(data.ok ? "saved" : "error");
        setTimeout(() => setSaving("idle"), 1500);
      } catch {
        setSaving("error");
      }
    }, 600);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, canEdit]);

  function toggle(id: string) {
    if (!canEdit) return;
    dirtyRef.current = true;
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div>
      {!canEdit && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs px-3 py-2 rounded-lg mb-4 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          View only — only Admin can update the checklist.
        </div>
      )}

      {/* Overall progress */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-gray-700 uppercase tracking-wide">
              Progress
            </span>
            <span className="text-gray-500">
              {totalDone} of {totalCount}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all ${
                totalPct === 100 ? "bg-emerald-500" : "bg-blue-500"
              }`}
              style={{ width: `${totalPct}%` }}
            />
          </div>
        </div>
        <div
          className={`text-2xl font-bold w-14 text-right ${
            totalPct === 100 ? "text-emerald-600" : "text-blue-600"
          }`}
        >
          {totalPct}%
        </div>
        {canEdit && <SaveIndicator state={saving} />}
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 p-1 rounded-xl mb-4 flex flex-wrap gap-1">
        {tabs.map((tab) => {
          const items = tab.data.flatMap((s) => s.items);
          const done = items.filter((i) => checked[i.id]).length;
          const isActive = activeTab === tab.id;
          const isDone = done === items.length && items.length > 0;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex-1 sm:flex-initial justify-center ${
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="truncate">{tab.label}</span>
              <span
                className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold flex-shrink-0 ${
                  isDone
                    ? "bg-emerald-100 text-emerald-700"
                    : isActive
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {done}/{items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sections within active tab */}
      <div className="space-y-3">
        {currentTab.data.map((section) => {
          const sectionDone = section.items.filter((i) => checked[i.id]).length;
          const sectionTotal = section.items.length;
          const sectionDoneAll = sectionDone === sectionTotal;
          const visual = getSectionVisual(section.title);
          return (
            <div
              key={section.title}
              className={`bg-white border border-gray-200 rounded-xl overflow-hidden border-l-4 ${visual.border}`}
            >
              <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center gap-3">
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 min-w-0">
                  <span
                    className={`${visual.iconBg} w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-base leading-none">{visual.icon}</span>
                  </span>
                  <span className="truncate">{section.title}</span>
                </h2>
                <span
                  className={`text-[10px] font-bold rounded-full px-2 py-0.5 flex-shrink-0 ${
                    sectionDoneAll
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {sectionDone}/{sectionTotal}
                </span>
              </div>
              <ul className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                      canEdit
                        ? "cursor-pointer hover:bg-gray-50"
                        : "cursor-default"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        checked[item.id]
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-gray-300"
                      }`}
                    >
                      {checked[item.id] && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        checked[item.id]
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {tabDone === tabItems.length && tabItems.length > 0 && totalPct < 100 && (
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center text-sm">
          <span className="font-semibold text-emerald-800">
            ✓ {currentTab.label} complete
          </span>
        </div>
      )}

      {totalPct === 100 && (
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center text-sm">
          🎉 <span className="font-semibold text-emerald-800">All done!</span>{" "}
          <span className="text-emerald-600">
            This event is fully prepared.
          </span>
        </div>
      )}
    </div>
  );
}

function SaveIndicator({ state }: { state: "idle" | "saving" | "saved" | "error" }) {
  if (state === "idle") return <div className="w-16" />;
  const map = {
    saving: { text: "Saving…", class: "text-gray-400" },
    saved: { text: "Saved ✓", class: "text-emerald-600" },
    error: { text: "Error", class: "text-rose-600" },
  } as const;
  const s = map[state];
  return <div className={`text-xs font-medium w-16 text-right ${s.class}`}>{s.text}</div>;
}
