"use client";

import { useState } from "react";

type CheckItem = { id: string; label: string };
type Section = { title: string; icon: string; items: CheckItem[] };

const setupSection: Section[] = [
  {
    title: "Setup & Display",
    icon: "🎀",
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
    icon: "📣",
    items: [
      { id: "c1", label: "Event reminder" },
      { id: "c2", label: "Announcement to FD Official Group Chat" },
    ],
  },
  {
    title: "People (PICs)",
    icon: "👥",
    items: [
      { id: "p1", label: "Registration PIC assigned" },
      { id: "p2", label: "AV PIC assigned" },
      { id: "p3", label: "Cleaner — needed? Confirm if yes" },
    ],
  },
  {
    title: "Refreshments & Catering",
    icon: "🍱",
    items: [
      { id: "r1", label: "Food / catering" },
      { id: "r2", label: "Coffee / tea" },
      { id: "r3", label: "Candies, snacks" },
      { id: "r4", label: "Crew food" },
    ],
  },
  {
    title: "Other",
    icon: "💳",
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
    icon: "✅",
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
    icon: "📧",
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
    icon: "🛠️",
    items: [
      { id: "pr1", label: "Guest list printed and passed to security" },
      { id: "pr2", label: "Parking confirmed (if applicable)" },
      { id: "pr3", label: "Aircond confirmed (if applicable)" },
      { id: "pr4", label: "Bomba lift booking confirmed (if applicable)" },
    ],
  },
];

const tabs = [
  { id: "prep", label: "Pre-Event Prep", icon: "📅", data: prepSection },
  { id: "day", label: "Event Day", icon: "📍", data: setupSection },
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ✅ Event Checklist
        </h1>
        <p className="text-gray-600">
          Tick off items as you complete them. Progress is per tab.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">
              {currentTab.label} Progress
            </span>
            <span className="text-gray-500">
              {doneCount} / {totalCount} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                pct === 100 ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div
          className={`text-xl font-bold w-14 text-right ${
            pct === 100 ? "text-green-600" : "text-blue-600"
          }`}
        >
          {pct}%
        </div>
        <button
          onClick={resetTab}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          Reset
        </button>
      </div>

      {/* Checklist */}
      <div className="space-y-6">
        {currentTab.data.map((section) => {
          const sectionDone = section.items.filter((i) => checked[i.id]).length;
          return (
            <div
              key={section.title}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                  <span>{section.icon}</span> {section.title}
                </h2>
                <span className="text-xs text-gray-500">
                  {sectionDone}/{section.items.length}
                </span>
              </div>
              <ul className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className="flex items-center gap-4 px-6 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        checked[item.id]
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300 hover:border-blue-400"
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
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <p className="font-bold text-green-800 text-lg">
            All {currentTab.label} tasks completed!
          </p>
        </div>
      )}
    </div>
  );
}
