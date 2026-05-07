"use client";

import { useEffect, useRef, useState } from "react";
import { allChecklistSections } from "@/lib/checklistData";

type Section = { title: string; items: { id: string; label: string }[] };

const sections: Section[] = allChecklistSections;

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
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dirtyRef = useRef(false);

  const allItems = sections.flatMap((s) => s.items);
  const doneCount = allItems.filter((i) => checked[i.id]).length;
  const total = allItems.length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  // Debounced save — only when admin can edit AND user actually changed state
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

      {/* Progress + save indicator */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-gray-700 uppercase tracking-wide">
              Progress
            </span>
            <span className="text-gray-500">
              {doneCount} of {total}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all ${
                pct === 100 ? "bg-emerald-500" : "bg-blue-500"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div
          className={`text-2xl font-bold w-14 text-right ${
            pct === 100 ? "text-emerald-600" : "text-blue-600"
          }`}
        >
          {pct}%
        </div>
        {canEdit && <SaveIndicator state={saving} />}
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map((section) => {
          const sectionDone = section.items.filter((i) => checked[i.id]).length;
          return (
            <div
              key={section.title}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="px-5 py-2.5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                  {section.title}
                </h2>
                <span className="text-xs text-gray-400">
                  {sectionDone}/{section.items.length}
                </span>
              </div>
              <ul className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`flex items-center gap-3 px-5 py-2.5 transition-colors ${
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

      {pct === 100 && (
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
