"use client";

import { useState } from "react";

type CheckItem = { id: string; label: string };
type Section = { title: string; items: CheckItem[] };

// ============ Tab 1: When Date Is Confirmed ============

const confirmedSections: Section[] = [
  {
    title: "Approval & Calendar",
    items: [
      { id: "ap1", label: "Approval received from Sharlene" },
      { id: "ap2", label: "Logged relevant in Google Calendar (e.g. FD Calendar, AIA GE etc)" },
      { id: "ap3", label: "Invite relevant PICs via email" },
    ],
  },
  {
    title: "Email to Building Management",
    items: [
      { id: "em1", label: "Email to mercumkpmoffice@gmail.com (≥1 week before)" },
      { id: "em2", label: "Event name included" },
      { id: "em3", label: "Event date & time included" },
      { id: "em4", label: "Estimated pax included" },
      { id: "em5", label: "Guest list PDF attached" },
      { id: "em6", label: "Reserved parking requested (if applicable)" },
      { id: "em7", label: "Use of Bomba / Service lift (if applicable)" },
      { id: "em8", label: "Aircond requested (if applicable)" },
    ],
  },
  {
    title: "Other Prep",
    items: [
      { id: "op1", label: "Guest list printed and passed to security" },
      { id: "op2", label: "Parking confirmed (if applicable)" },
      { id: "op3", label: "Aircond confirmed (if applicable)" },
      { id: "op4", label: "Bomba lift booking confirmed" },
    ],
  },
];

// ============ Tab 2: Pre-Event ============

const preEventSections: Section[] = [
  {
    title: "Setup & Display",
    items: [
      { id: "sd1", label: "Prepare lanyard sleeve" },
      { id: "sd2", label: "Prepare lanyard strap" },
      { id: "sd3", label: "Print lanyard nametag" },
      { id: "sd4", label: "Bunting placement" },
      { id: "sd5", label: "Lobby TV display" },
      { id: "sd6", label: "Event hall layout arrangement" },
      { id: "sd7", label: "Extension" },
      { id: "sd8", label: "Mic batteries" },
      { id: "sd9", label: "Testimonial Room" },
    ],
  },
  {
    title: "Comms",
    items: [
      { id: "co1", label: "Event reminders" },
      { id: "co2", label: "Announcement to FD Official Group Chat with Agenda" },
    ],
  },
  {
    title: "People (PICs)",
    items: [
      { id: "pe1", label: "Registration PIC assigned" },
      { id: "pe2", label: "AV PIC assigned" },
      { id: "pe3", label: "Testimonial PIC" },
      { id: "pe4", label: "Cleaner (if applicable)" },
    ],
  },
  {
    title: "Refreshments & Catering",
    items: [
      { id: "rc1", label: "Food / Catering" },
      { id: "rc2", label: "Coffee / Tea" },
      { id: "rc3", label: "Candies, snacks" },
      { id: "rc4", label: "Crew food" },
    ],
  },
  {
    title: "Others",
    items: [
      { id: "ot1", label: "Standby credit card machines (company & internal events)" },
      { id: "ot2", label: "Any special arrangements" },
    ],
  },
];

// ============ Tab 3: On Event Date ============

const eventDaySections: Section[] = [
  {
    title: "Morning Setup",
    items: [
      {
        id: "ms1",
        label:
          "Event PIC and Project PIC arrive at least 1 hour before (1.5 hours for larger call times)",
      },
      {
        id: "ms2",
        label:
          "Set up registration desk with nametags and attendance list; assigned personnel on standby",
      },
      { id: "ms3", label: "Switch on all lights and aircond (if weekend)" },
      {
        id: "ms4",
        label:
          "Both TVs at entrance turned on with holding slides or assigned video",
      },
    ],
  },
  {
    title: "AV & Technical Check",
    items: [
      { id: "av1", label: "All microphones tested and working" },
      { id: "av2", label: "Screen tested" },
      { id: "av3", label: "Slides / presentation loaded and tested" },
      { id: "av4", label: "Speaker / PA system tested" },
      {
        id: "av5",
        label:
          "Recording / live stream setup (if applicable) — send Zoom link in the group",
      },
    ],
  },
];

// ============ Tab 4: Post-Event ============

const postEventSections: Section[] = [
  {
    title: "Wrap Up",
    items: [
      { id: "pv1", label: "Ensure all rubbish is cleared and tied up" },
      { id: "pv2", label: "Switch off all lights" },
      { id: "pv3", label: "Ensure the Big Hall back door is locked" },
      {
        id: "pv4",
        label:
          "Walk through the entire office premises to confirm everyone has left",
      },
      {
        id: "pv5",
        label:
          "Before heading home, make sure the entrance door is closed and all lights are off",
      },
    ],
  },
];

const tabs = [
  { id: "confirmed", label: "When Date Is Confirmed", data: confirmedSections },
  { id: "pre", label: "Pre-Event", data: preEventSections },
  { id: "event", label: "On Event Date", data: eventDaySections },
  { id: "post", label: "Post-Event", data: postEventSections },
];

export default function V2ChecklistPage() {
  const [activeTab, setActiveTab] = useState("confirmed");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const allItems = currentTab.data.flatMap((s) => s.items);
  const doneCount = allItems.filter((i) => checked[i.id]).length;
  const totalCount = allItems.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const resetTab = () => {
    const ids = allItems.map((i) => i.id);
    setChecked((prev) => {
      const next = { ...prev };
      ids.forEach((id) => delete next[id]);
      return next;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero — matches Event Playbook */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 sm:p-10 text-white mb-8 shadow-sm">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-blue-200 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              Interactive
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Event Checklist
            </h1>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl">
              Tick off items as you complete them. Progress is saved per phase.
            </p>
          </div>
          {/* Progress ring */}
          <ProgressRing pct={pct} done={doneCount} total={totalCount} />
        </div>
      </div>

      {/* Segmented pill tabs */}
      <div className="bg-gray-100 p-1 rounded-xl mb-6 flex flex-wrap gap-1">
        {tabs.map((tab) => {
          const tabItems = tab.data.flatMap((s) => s.items);
          const tabDone = tabItems.filter((i) => checked[i.id]).length;
          const isActive = activeTab === tab.id;
          const isDone = tabDone === tabItems.length && tabItems.length > 0;
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
                {tabDone}/{tabItems.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reset link */}
      <div className="flex justify-end mb-3">
        <button
          onClick={resetTab}
          className="text-xs text-gray-400 hover:text-gray-700"
        >
          ↺ Reset this tab
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {currentTab.data.map((section) => {
          const sectionDone = section.items.filter((i) => checked[i.id]).length;
          const sectionTotal = section.items.length;
          const sectionDoneAll = sectionDone === sectionTotal;
          const visual = sectionVisuals[section.title] || {
            icon: "📌",
            border: "border-l-gray-300",
            iconBg: "bg-gray-50",
          };
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
                    className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
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
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
          <p className="text-2xl mb-1">🎉</p>
          <p className="font-semibold text-emerald-800">
            All {currentTab.label} tasks completed
          </p>
        </div>
      )}
    </div>
  );
}

// Per-section visual cues. Section title → icon + accent border tint.
const sectionVisuals: Record<
  string,
  { icon: string; border: string; iconBg: string }
> = {
  "Approval & Calendar": {
    icon: "✅",
    border: "border-l-blue-400",
    iconBg: "bg-blue-50",
  },
  "Email to Building Management": {
    icon: "✉️",
    border: "border-l-indigo-400",
    iconBg: "bg-indigo-50",
  },
  "Other Prep": {
    icon: "📋",
    border: "border-l-violet-400",
    iconBg: "bg-violet-50",
  },
  "Setup & Display": {
    icon: "🎯",
    border: "border-l-rose-400",
    iconBg: "bg-rose-50",
  },
  Comms: {
    icon: "📢",
    border: "border-l-amber-400",
    iconBg: "bg-amber-50",
  },
  "People (PICs)": {
    icon: "👥",
    border: "border-l-emerald-400",
    iconBg: "bg-emerald-50",
  },
  "Refreshments & Catering": {
    icon: "🍱",
    border: "border-l-orange-400",
    iconBg: "bg-orange-50",
  },
  Others: {
    icon: "📌",
    border: "border-l-slate-400",
    iconBg: "bg-slate-50",
  },
  "Morning Setup": {
    icon: "🌅",
    border: "border-l-amber-400",
    iconBg: "bg-amber-50",
  },
  "AV & Technical Check": {
    icon: "🎤",
    border: "border-l-cyan-400",
    iconBg: "bg-cyan-50",
  },
  "Wrap Up": {
    icon: "🧹",
    border: "border-l-emerald-400",
    iconBg: "bg-emerald-50",
  },
};

// Circular progress ring shown in the hero.
function ProgressRing({
  pct,
  done,
  total,
}: {
  pct: number;
  done: number;
  total: number;
}) {
  const r = 32;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const isDone = pct === 100;
  return (
    <div className="flex items-center gap-4 self-start sm:self-auto">
      <div className="relative w-20 h-20 flex-shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke={isDone ? "#34d399" : "#60a5fa"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{pct}%</span>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-200 mb-0.5">
          This tab
        </p>
        <p className="text-sm font-semibold text-white">
          {done} of {total} done
        </p>
      </div>
    </div>
  );
}
