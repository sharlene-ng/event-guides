"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SOPEvent } from "@/lib/sheets";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarView({ events }: { events: SOPEvent[] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [cursor, setCursor] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  // Map every date in event ranges to event(s)
  const eventsByDate = useMemo(() => {
    const map: Record<string, SOPEvent[]> = {};
    events.forEach((e) => {
      if (!e.date) return;
      const start = parseLocalDate(String(e.date));
      const end = e.endDate
        ? parseLocalDate(String(e.endDate))
        : start;
      const d = new Date(start);
      while (d <= end) {
        const key = dateKey(d);
        if (!map[key]) map[key] = [];
        map[key].push(e);
        d.setDate(d.getDate() + 1);
      }
    });
    return map;
  }, [events]);

  const monthName = cursor.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Build the month grid (always 6 rows × 7 cols = 42 cells)
  const cells = useMemo(() => {
    const firstOfMonth = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const startDay = firstOfMonth.getDay(); // 0 = Sun
    const out: { date: Date; inMonth: boolean }[] = [];

    for (let i = startDay - 1; i >= 0; i--) {
      const d = new Date(firstOfMonth);
      d.setDate(-i);
      out.push({ date: d, inMonth: false });
    }
    const daysInMonth = new Date(
      cursor.getFullYear(),
      cursor.getMonth() + 1,
      0,
    ).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      out.push({
        date: new Date(cursor.getFullYear(), cursor.getMonth(), i),
        inMonth: true,
      });
    }
    while (out.length < 42) {
      const last = out[out.length - 1].date;
      const next = new Date(last);
      next.setDate(next.getDate() + 1);
      out.push({ date: next, inMonth: false });
    }
    return out;
  }, [cursor]);

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
            BIG Hall availability — coloured cells are booked
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

      {/* Cells */}
      <div className="grid grid-cols-7">
        {cells.map(({ date, inMonth }, i) => {
          const key = dateKey(date);
          const dayEvents = eventsByDate[key] || [];
          const isToday = sameDay(date, today);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const hasBooking = dayEvents.length > 0;

          return (
            <div
              key={i}
              className={`min-h-[72px] sm:min-h-[88px] p-1.5 border-r border-b border-gray-100 last:border-r-0 ${i >= cells.length - 7 ? "border-b-0" : ""} ${(i + 1) % 7 === 0 ? "border-r-0" : ""} ${
                inMonth
                  ? hasBooking
                    ? "bg-blue-50"
                    : "bg-white"
                  : "bg-gray-50/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
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
                {hasBooking && (
                  <span className="text-[9px] font-bold text-blue-600">
                    {dayEvents.length}
                  </span>
                )}
              </div>
              <div className="space-y-0.5">
                {dayEvents.slice(0, 2).map((e) => (
                  <Link
                    key={e.id + key}
                    href={`/v2/events/${e.id}`}
                    className="block bg-blue-600 hover:bg-blue-700 text-white text-[10px] truncate rounded px-1.5 py-0.5 leading-tight"
                    title={`${e.name}${e.startTime ? ` · ${e.startTime}` : ""}`}
                  >
                    {e.name}
                  </Link>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[9px] text-blue-600 font-semibold pl-1.5">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-4 text-[11px] text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-white border border-gray-300" />
          Available
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-blue-50 border border-blue-200" />
          Booked
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600" />
          Today
        </span>
      </div>
    </div>
  );
}
