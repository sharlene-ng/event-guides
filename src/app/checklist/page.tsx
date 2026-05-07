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

// ============ Resources for "When Date Is Confirmed" tab ============

type Resource = { label: string; href?: string; icon: string };
const confirmedResources: Resource[] = [
  {
    icon: "✉️",
    label: "Email Template",
    href: "https://docs.google.com/document/d/1zItAHHseRnrvc7q1XnJUXgrhX9Ad1O01svnQ9dCAhD8/edit?usp=sharing",
  },
  {
    icon: "📅",
    label: "FD Calendar",
    href: "https://calendar.google.com/calendar/u/3?cid=Y18zM2RhNWU2NDY4Mzk1Mzg3NDJiOGQ1MDFiZDZkODM4OWY2ZWU2NDQzNTkzMjdiZDgwZjJiODU5MDM5NDI4ZmU2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
  },
  {
    icon: "📅",
    label: "AIA GE Calendar",
    href: "https://calendar.google.com/calendar/u/3?cid=Y180YjE3Y2YyZDE1YjkxMDliMDA0YzRkNmQ4NGNlODcxN2M3ZjVhOTEwNThjODYxMTgxODEwNmQ0NTc1YWM3MTg0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
  },
  {
    icon: "📄",
    label: "Guest List Template",
    href: "https://docs.google.com/spreadsheets/d/15HHNs5L_sAbXqrSrjggBdHFgLqnHuz_uv9SttKZ7avo/copy",
  },
  {
    icon: "🛗",
    label: "Bomba Lift Application Form",
    href: "https://drive.google.com/file/d/1Xto8QCFOFousJsSSUZXN-YXfDWrr84EM/view?usp=sharing",
  },
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
          ✅ Interactive
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Event Checklist
        </h1>
        <p className="text-gray-500">
          Tick off items as you complete them. Progress is per tab.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 flex items-center gap-4 flex-wrap">
        {tabs.map((tab) => {
          const tabItems = tab.data.flatMap((s) => s.items);
          const tabDone = tabItems.filter((i) => checked[i.id]).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              <span
                className={`text-xs rounded-full px-2 py-0.5 font-semibold ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tabDone}/{tabItems.length}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Resources panel — only for "When Date Is Confirmed" tab */}
      {activeTab === "confirmed" && (
        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800 mb-2.5">
            📌 Templates & Resources
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {confirmedResources.map((r) =>
              r.href ? (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-amber-200 rounded-md hover:bg-amber-50 hover:border-amber-300 transition-colors text-sm"
                >
                  <span className="text-base">{r.icon}</span>
                  <span className="font-medium text-gray-900 flex-1 truncate">
                    {r.label}
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-amber-500 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : (
                <div
                  key={r.label}
                  className="flex items-center gap-2 px-3 py-2 bg-white/60 border border-dashed border-amber-300 rounded-md text-sm text-gray-500"
                  title="No link configured yet"
                >
                  <span className="text-base">{r.icon}</span>
                  <span className="flex-1 truncate">{r.label}</span>
                  <span className="text-[10px] uppercase tracking-wide text-amber-600 font-semibold">
                    add link
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-gray-700 uppercase tracking-wide">
              {currentTab.label} progress
            </span>
            <span className="text-gray-500">
              {doneCount} of {totalCount}
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
        <button
          onClick={resetTab}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          Reset
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {currentTab.data.map((section) => {
          const sectionDone = section.items.filter((i) => checked[i.id]).length;
          return (
            <div
              key={section.title}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
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
