"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SOPEvent } from "@/lib/sheets";
import { getColorBar } from "@/lib/colors";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function dayDiff(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / 86400000);
}

type EventBar = {
  event: SOPEvent;
  startCol: number; // 0-6 within week
  endCol: number; // 0-6 within week (inclusive)
  startsBeforeWeek: boolean;
  endsAfterWeek: boolean;
};

const ROW_HEIGHT = 92; // px
const HEADER_AREA = 24; // px reserved for date number at top of cell
const BAR_HEIGHT = 18; // px
const BAR_GAP = 2; // px

export default function CalendarView({ events }: { events: SOPEvent[] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [cursor, setCursor] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  // Build the 6-week grid for the visible month
  const weeks = useMemo(() => {
    const firstOfMonth = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const startDay = firstOfMonth.getDay();
    const daysInMonth = new Date(
      cursor.getFullYear(),
      cursor.getMonth() + 1,
      0,
    ).getDate();

    const cells: { date: Date; inMonth: boolean }[] = [];
    for (let i = startDay - 1; i >= 0; i--) {
      const d = new Date(firstOfMonth);
      d.setDate(-i);
      cells.push({ date: d, inMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({
        date: new Date(cursor.getFullYear(), cursor.getMonth(), i),
        inMonth: true,
      });
    }
    while (cells.length < 42) {
      const last = cells[cells.length - 1].date;
      const next = new Date(last);
      next.setDate(next.getDate() + 1);
      cells.push({ date: next, inMonth: false });
    }

    const out: { date: Date; inMonth: boolean }[][] = [];
    for (let i = 0; i < 42; i += 7) out.push(cells.slice(i, i + 7));
    return out;
  }, [cursor]);

  // For each week, pre-compute the event bars + lane assignments
  const weekBars = useMemo(() => {
    return weeks.map((week) => {
      const weekStart = week[0].date;
      const weekEnd = week[6].date;

      const intersecting = events.filter((e) => {
        if (!e.date) return false;
        const start = parseLocalDate(String(e.date));
        const end = e.endDate ? parseLocalDate(String(e.endDate)) : start;
        return end >= weekStart && start <= weekEnd;
      });

      // Sort: longer events first, then earlier start
      intersecting.sort((a, b) => {
        const aS = parseLocalDate(String(a.date));
        const aE = a.endDate ? parseLocalDate(String(a.endDate)) : aS;
        const bS = parseLocalDate(String(b.date));
        const bE = b.endDate ? parseLocalDate(String(b.endDate)) : bS;
        const aLen = dayDiff(aS, aE);
        const bLen = dayDiff(bS, bE);
        if (aLen !== bLen) return bLen - aLen;
        return aS.getTime() - bS.getTime();
      });

      const bars: (EventBar & { lane: number })[] = [];
      const lanesEnd: number[] = []; // ending col index per lane

      for (const event of intersecting) {
        const eStart = parseLocalDate(String(event.date));
        const eEnd = event.endDate ? parseLocalDate(String(event.endDate)) : eStart;

        const visibleStart = eStart < weekStart ? weekStart : eStart;
        const visibleEnd = eEnd > weekEnd ? weekEnd : eEnd;

        const startCol = dayDiff(weekStart, visibleStart);
        const endCol = dayDiff(weekStart, visibleEnd);

        // Find lane
        let lane = lanesEnd.findIndex((endIdx) => endIdx < startCol);
        if (lane === -1) lane = lanesEnd.length;
        lanesEnd[lane] = endCol;

        bars.push({
          event,
          startCol,
          endCol,
          startsBeforeWeek: eStart < weekStart,
          endsAfterWeek: eEnd > weekEnd,
          lane,
        });
      }
      return bars;
    });
  }, [weeks, events]);

  const monthName = cursor.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  function move(delta: number) {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));
  }

  function goToday() {
    setCursor(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="font-bold text-gray-900 text-lg">{monthName}</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            BIG Hall availability — coloured bars are bookings
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => move(-1)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
            aria-label="Previous month"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            onClick={goToday}
            className="text-xs font-medium px-2.5 py-1.5 rounded-md hover:bg-gray-100 text-gray-700"
          >
            Today
          </button>
          <button
            onClick={() => move(1)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
            aria-label="Next month"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>

      {/* Day-name header */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="text-[10px] font-bold uppercase tracking-wide text-gray-500 text-center py-2"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Weeks */}
      <div>
        {weeks.map((week, wi) => {
          const bars = weekBars[wi];
          const maxLane = bars.reduce((m, b) => Math.max(m, b.lane + 1), 0);
          const overflow = bars.filter((b) => b.lane >= 3); // hide >3 lanes
          const visibleBars = bars.filter((b) => b.lane < 3);
          const minHeight = Math.max(
            ROW_HEIGHT,
            HEADER_AREA + Math.min(maxLane, 3) * (BAR_HEIGHT + BAR_GAP) + 8,
          );
          return (
            <div
              key={wi}
              className={`relative grid grid-cols-7 ${wi < weeks.length - 1 ? "border-b border-gray-100" : ""}`}
              style={{ minHeight }}
            >
              {/* Day cells */}
              {week.map(({ date, inMonth }, di) => {
                const isToday = sameDay(date, today);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                return (
                  <div
                    key={di}
                    className={`px-1.5 pt-1.5 ${di < 6 ? "border-r border-gray-100" : ""} ${inMonth ? "bg-white" : "bg-gray-50/50"}`}
                  >
                    <span
                      className={`text-xs font-semibold inline-flex items-center justify-center w-5 h-5 rounded-full ${
                        isToday
                          ? "bg-blue-600 text-white"
                          : !inMonth
                            ? "text-gray-300"
                            : isWeekend
                              ? "text-gray-400"
                              : "text-gray-700"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                  </div>
                );
              })}

              {/* Event bars (absolutely positioned) */}
              {visibleBars.map((b, idx) => {
                const left = `${(b.startCol / 7) * 100}%`;
                const width = `${((b.endCol - b.startCol + 1) / 7) * 100}%`;
                const top = HEADER_AREA + b.lane * (BAR_HEIGHT + BAR_GAP);
                const radiusLeft = b.startsBeforeWeek ? 0 : 4;
                const radiusRight = b.endsAfterWeek ? 0 : 4;
                const colorCls = getColorBar(b.event.requirements?.color);
                return (
                  <Link
                    key={`${wi}-${idx}-${b.event.id}`}
                    href={`/events/${b.event.id}`}
                    title={`${b.event.name}${b.event.startTime ? ` · ${b.event.startTime}` : ""}`}
                    className={`absolute text-[10px] font-medium truncate px-1.5 leading-none flex items-center border ${colorCls}`}
                    style={{
                      left,
                      width: `calc(${width} - 4px)`,
                      marginLeft: 2,
                      top,
                      height: BAR_HEIGHT,
                      borderRadius: `${radiusLeft}px ${radiusRight}px ${radiusRight}px ${radiusLeft}px`,
                    }}
                  >
                    {b.event.name}
                  </Link>
                );
              })}

              {/* "+N more" indicator if events overflow */}
              {overflow.length > 0 && (
                <div
                  className="absolute text-[10px] text-blue-600 font-semibold px-1.5"
                  style={{
                    left: 0,
                    right: 0,
                    bottom: 4,
                    textAlign: "right",
                  }}
                >
                  +{overflow.length} more
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-4 text-[11px] text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-4 h-2 rounded bg-blue-200 border border-blue-300" />
          Booked
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600" />
          Today
        </span>
        <span className="text-gray-400 text-[10px]">
          · Tap an event to open
        </span>
      </div>
    </div>
  );
}
