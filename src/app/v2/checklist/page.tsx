"use client";

import { useState } from "react";

type CheckItem = { id: string; label: string };
type Section = { title: string; items: CheckItem[] };

const setupSection: Section[] = [
  {
    title: "Setup & Display",
    items: [
      { id: "s1", label: "Lanyard sleeve" },
      { id: "s2", label: "Lanyard strap" },
      { id: "s3", label: "Print lanyard nametag" },
      { id: "s4", label: "Bunting placement" },
      { id: "s5", label: "Lobby TV display" },
      { id: "s6", label: "Event hall layout" },
    ],
  },
  {
    title: "Comms",
    items: [
      { id: "c1", label: "Event reminder" },
      { id: "c2", label: "Announcement to FD Official Group Chat" },
    ],
  },
  {
    title: "People (PICs)",
    items: [
      { id: "p1", label: "Registration PIC assigned" },
      { id: "p2", label: "AV PIC assigned" },
      { id: "p3", label: "Cleaner — needed? Confirm if yes" },
    ],
  },
  {
    title: "Refreshments & Catering",
    items: [
      { id: "r1", label: "Food / catering" },
      { id: "r2", label: "Coffee / tea" },
      { id: "r3", label: "Candies, snacks" },
      { id: "r4", label: "Crew food" },
    ],
  },
  {
    title: "Other",
    items: [
      {
        id: "o1",
        label: "Standby credit card machines (company & internal events)",
      },
      { id: "o2", label: "Any special arrangements?" },
    ],
  },
];

const prepSection: Section[] = [
  {
    title: "Approval & Calendar",
    items: [
      { id: "ap1", label: "Approval received from Sharlene" },
      { id: "ap2", label: "Project type identified (company / internal / external)" },
      { id: "ap3", label: "Logged in FD Calendar" },
      { id: "ap4", label: "Logged in AIA GE Calendar" },
      { id: "ap5", label: "Self + all PICs invited" },
    ],
  },
  {
    title: "Email to Building Management",
    items: [
      { id: "e1", label: "Email sent to mercumkpmoffice@gmail.com (≥1 week before)" },
      { id: "e2", label: "Event name included" },
      { id: "e3", label: "Event date & time included" },
      { id: "e4", label: "Estimated pax included" },
      { id: "e5", label: "Guest list PDF attached" },
      { id: "e6", label: "Reserved parking requested (if needed)" },
      { id: "e7", label: "Service lift (Bomba) requested (if needed)" },
      { id: "e8", label: "Aircond requested (if needed)" },
    ],
  },
  {
    title: "Other Prep",
    items: [
      { id: "pr1", label: "Guest list printed and passed to security" },
      { id: "pr2", label: "Parking confirmed (if applicable)" },
      { id: "pr3", label: "Aircond confirmed (if applicable)" },
      { id: "pr4", label: "Bomba lift booking confirmed (if applicable)" },
    ],
  },
];

const tabs = [
  { id: "prep", label: "Pre-Event", data: prepSection },
  { id: "day", label: "Event Day", data: setupSection },
];

export default function V2ChecklistPage() {
  const [activeTab, setActiveTab] = useState("prep");
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
      <div className="border-b border-gray-200 mb-6 flex items-center gap-4">
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

      {/* Progress bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-gray-700 uppercase tracking-wide">
              {currentTab.label} Progress
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
