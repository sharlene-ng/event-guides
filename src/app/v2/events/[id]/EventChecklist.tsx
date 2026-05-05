"use client";

import { useEffect, useRef, useState } from "react";

type CheckItem = { id: string; label: string };
type Section = { title: string; icon: string; items: CheckItem[] };

const sections: Section[] = [
  {
    title: "Approval & Calendar",
    icon: "✅",
    items: [
      { id: "ap1", label: "Approval received from Sharlene" },
      { id: "ap2", label: "Logged in FD Calendar" },
      { id: "ap3", label: "Logged in AIA GE Calendar" },
      { id: "ap4", label: "Self + all PICs invited" },
    ],
  },
  {
    title: "Email to Building Management",
    icon: "📧",
    items: [
      { id: "e1", label: "Email sent to mercumkpmoffice@gmail.com (≥1 wk)" },
      { id: "e2", label: "Guest list PDF attached" },
      { id: "e3", label: "Reserved parking requested (if needed)" },
      { id: "e4", label: "Service lift (Bomba) requested (if needed)" },
      { id: "e5", label: "Aircond requested (if needed)" },
    ],
  },
  {
    title: "Pre-Event Prep",
    icon: "🛠️",
    items: [
      { id: "pr1", label: "Guest list printed and passed to security" },
      { id: "pr2", label: "Parking confirmed (if applicable)" },
      { id: "pr3", label: "Aircond confirmed (if applicable)" },
      { id: "pr4", label: "Bomba lift booking confirmed (if applicable)" },
    ],
  },
  {
    title: "Event Day · Setup & Display",
    icon: "🎀",
    items: [
      { id: "s1", label: "Lanyard sleeve" },
      { id: "s2", label: "Lanyard strap" },
      { id: "s3", label: "Print lanyard nametag" },
      { id: "s4", label: "Bunting placement" },
      { id: "s5", label: "Lobby TV display" },
      { id: "s6", label: "Event hall layout set up" },
    ],
  },
  {
    title: "Event Day · Comms & PICs",
    icon: "📣",
    items: [
      { id: "c1", label: "Event reminder sent" },
      { id: "c2", label: "Announced to FD Official Group Chat" },
      { id: "p1", label: "Registration PIC in position" },
      { id: "p2", label: "AV PIC in position" },
      { id: "p3", label: "Cleaner confirmed (if needed)" },
    ],
  },
  {
    title: "Event Day · Refreshments & Other",
    icon: "🍱",
    items: [
      { id: "r1", label: "Food / catering" },
      { id: "r2", label: "Coffee / tea" },
      { id: "r3", label: "Candies, snacks" },
      { id: "r4", label: "Crew food" },
      {
        id: "o1",
        label: "Standby credit card machines (company & internal)",
      },
      { id: "o2", label: "Special arrangements done" },
    ],
  },
];

export default function EventChecklist({
  eventId,
  initialState,
}: {
  eventId: string;
  initialState: Record<string, boolean>;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>(initialState);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allItems = sections.flatMap((s) => s.items);
  const doneCount = allItems.filter((i) => checked[i.id]).length;
  const total = allItems.length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  // Debounced save
  useEffect(() => {
    // skip first render (state matches initial)
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
  }, [checked]);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div>
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
        <SaveIndicator state={saving} />
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
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-700 flex items-center gap-2">
                  <span>{section.icon}</span> {section.title}
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
                    className="flex items-center gap-3 px-5 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
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
