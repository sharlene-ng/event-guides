"use client";

import { useState } from "react";
import { checklistTabs, getSectionVisual } from "@/lib/checklistData";

const tabs = checklistTabs;

export default function ChecklistClient() {
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
