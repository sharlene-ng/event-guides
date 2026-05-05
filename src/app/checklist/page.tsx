"use client";

import { useState } from "react";

type CheckItem = { id: string; label: string; note?: string };
type Section = { title: string; items: CheckItem[] };

const preEventChecklist: Section[] = [
  {
    title: "Booking & Admin",
    items: [
      { id: "b1", label: "Written confirmation received from organizer" },
      { id: "b2", label: "Event logged in booking system" },
      { id: "b3", label: "Confirmation receipt sent to organizer" },
      { id: "b4", label: "PIC assigned for this event" },
      { id: "b5", label: "Hall availability confirmed (no conflicts)" },
    ],
  },
  {
    title: "Venue & Layout",
    items: [
      { id: "v1", label: "Venue walkthrough completed with organizer" },
      { id: "v2", label: "Seating layout confirmed and drawn up" },
      { id: "v3", label: "Stage / podium requirement confirmed" },
      { id: "v4", label: "Registration / reception area planned" },
      { id: "v5", label: "Directional signage locations confirmed" },
    ],
  },
  {
    title: "AV & Technical",
    items: [
      { id: "av1", label: "Microphone type confirmed (handheld / lapel / panel)" },
      { id: "av2", label: "Projector and screen confirmed" },
      { id: "av3", label: "Laptop connectivity tested (HDMI / USB-C)" },
      { id: "av4", label: "WiFi access confirmed and password shared" },
      { id: "av5", label: "Live stream or recording arrangement (if required)" },
      { id: "av6", label: "AV technician booked" },
    ],
  },
  {
    title: "Catering & F&B",
    items: [
      { id: "c1", label: "Catering requirement confirmed (yes / no)" },
      { id: "c2", label: "Menu and number of pax confirmed" },
      { id: "c3", label: "Halal / dietary needs addressed" },
      { id: "c4", label: "Serving area and layout confirmed" },
      { id: "c5", label: "Caterer arrival time confirmed" },
      { id: "c6", label: "Post-event cleanup by caterer confirmed" },
    ],
  },
  {
    title: "Security & Access",
    items: [
      { id: "s1", label: "Building management notified of event" },
      { id: "s2", label: "Security personnel arranged (if required)" },
      { id: "s3", label: "Access cards / passes issued to organizer team" },
      { id: "s4", label: "Vendor access list submitted to building security" },
    ],
  },
];

const dayOfChecklist: Section[] = [
  {
    title: "Morning Setup",
    items: [
      { id: "m1", label: "Hall opened at least 1 hour before event" },
      { id: "m2", label: "Tables and chairs arranged per confirmed layout" },
      { id: "m3", label: "Stage, podium, and lectern set up" },
      { id: "m4", label: "Registration desk set up with name tags / attendance list" },
      { id: "m5", label: "Directional signage placed" },
      { id: "m6", label: "Event banners and backdrop installed" },
    ],
  },
  {
    title: "AV & Technical Check",
    items: [
      { id: "av1", label: "All microphones tested and working" },
      { id: "av2", label: "Projector and screen tested" },
      { id: "av3", label: "Slide presentation loaded and tested" },
      { id: "av4", label: "Speaker / PA system tested" },
      { id: "av5", label: "WiFi accessible and password distributed" },
      { id: "av6", label: "Recording / livestream set up (if applicable)" },
    ],
  },
  {
    title: "Safety & Compliance",
    items: [
      { id: "sf1", label: "All emergency exits unobstructed" },
      { id: "sf2", label: "Fire extinguisher locations checked" },
      { id: "sf3", label: "First aid kit location confirmed" },
      { id: "sf4", label: "Capacity headcount within hall limit" },
      { id: "sf5", label: "Organizer briefed on emergency exits and procedures" },
    ],
  },
  {
    title: "Staff Deployment",
    items: [
      { id: "st1", label: "PIC on-site and reachable" },
      { id: "st2", label: "AV technician on standby" },
      { id: "st3", label: "Registration staff in position" },
      { id: "st4", label: "Security personnel on post" },
      { id: "st5", label: "Cleaning crew scheduled for post-event" },
    ],
  },
];

const postEventChecklist: Section[] = [
  {
    title: "Event Close",
    items: [
      { id: "pe1", label: "Organizer notified 15 mins before end time" },
      { id: "pe2", label: "Guests directed to exits" },
      { id: "pe3", label: "All organizer belongings collected" },
    ],
  },
  {
    title: "Damage Inspection",
    items: [
      { id: "di1", label: "Hall inspected for damage with organizer present" },
      { id: "di2", label: "Any damage documented with photos" },
      { id: "di3", label: "Organizer acknowledged and signed inspection form" },
    ],
  },
  {
    title: "Clearing & Cleaning",
    items: [
      { id: "cl1", label: "All signage, banners removed" },
      { id: "cl2", label: "Furniture returned to default layout" },
      { id: "cl3", label: "Hall swept, mopped, and sanitized" },
      { id: "cl4", label: "Waste bins emptied and replaced" },
      { id: "cl5", label: "Toilets checked and cleaned" },
    ],
  },
  {
    title: "Equipment & Admin",
    items: [
      { id: "eq1", label: "All AV equipment collected and checked" },
      { id: "eq2", label: "Booking log updated as completed" },
      { id: "eq3", label: "Post-event report prepared (within 2 business days)" },
      { id: "eq4", label: "Invoice raised if applicable (within 3 business days)" },
    ],
  },
];

const tabs = [
  { id: "pre", label: "Pre-Event", icon: "📅", data: preEventChecklist },
  { id: "day", label: "Day Of", icon: "📍", data: dayOfChecklist },
  { id: "post", label: "Post-Event", icon: "🏁", data: postEventChecklist },
];

export default function ChecklistPage() {
  const [activeTab, setActiveTab] = useState("pre");
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
          ✅ Event Checklists
        </h1>
        <p className="text-gray-600">
          Interactive checklists for every phase of the event. Check off items
          as you complete them.
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

      {/* Progress bar */}
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

      {/* Checklist sections */}
      <div className="space-y-6">
        {currentTab.data.map((section) => {
          const sectionDone = section.items.filter((i) => checked[i.id]).length;
          return (
            <div
              key={section.title}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">{section.title}</h2>
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
          <p className="text-green-600 text-sm mt-1">
            Great work. Move on to the next phase.
          </p>
        </div>
      )}
    </div>
  );
}
