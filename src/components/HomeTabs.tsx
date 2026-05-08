"use client";

import Link from "next/link";
import { useState } from "react";
import type { Holiday, SOPEvent } from "@/lib/sheets";
import CalendarView from "@/components/CalendarView";

const layoutLabel: Record<string, string> = {
  theater: "Theater",
  classroom: "Classroom",
  banquet: "Fishbone",
};

function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function isUpcoming(date: string): boolean {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parseLocalDate(date) >= today;
}

function monthKey(date: string): string {
  const d = parseLocalDate(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
}

type TabKey = "calendar" | "list";

export default function HomeTabs({
  events,
  holidays,
}: {
  events: SOPEvent[];
  holidays: Holiday[];
}) {
  const [tab, setTab] = useState<TabKey>("calendar");

  const upcoming = events
    .filter((e) => isUpcoming(String(e.date)))
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const happeningToday = events.filter((e) => {
    if (!e.date) return false;
    const start = parseLocalDate(String(e.date));
    const end = e.endDate ? parseLocalDate(String(e.endDate)) : start;
    end.setHours(23, 59, 59, 999);
    return today >= start && today <= end;
  });

  const grouped = upcoming.reduce<Record<string, SOPEvent[]>>((acc, e) => {
    const k = monthKey(String(e.date));
    if (!acc[k]) acc[k] = [];
    acc[k].push(e);
    return acc;
  }, {});
  const monthKeys = Object.keys(grouped).sort();

  return (
    <div>
      {/* Combined toolbar: tab switcher + happening-today pill (inline) */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="inline-flex items-center bg-gray-100 p-1 rounded-lg">
          <TabBtn
            active={tab === "calendar"}
            onClick={() => setTab("calendar")}
            icon={
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
            label="Calendar"
          />
          <TabBtn
            active={tab === "list"}
            onClick={() => setTab("list")}
            icon={
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            }
            label={`List (${upcoming.length})`}
          />
        </div>

        {happeningToday.length > 0 && (
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 text-sm min-w-0">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold text-emerald-800 flex-shrink-0">
              Today:
            </span>
            <span className="text-emerald-900 truncate">
              {happeningToday.map((e, i) => (
                <span key={e.id}>
                  {i > 0 && ", "}
                  <Link
                    href={`/events/${e.id}`}
                    className="font-semibold underline-offset-2 hover:underline"
                  >
                    {e.name}
                  </Link>
                </span>
              ))}
            </span>
          </div>
        )}
      </div>

      {/* Active view */}
      {tab === "calendar" ? (
        <CalendarView events={events} holidays={holidays} />
      ) : (
        <ListView monthKeys={monthKeys} grouped={grouped} />
      )}
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
        active
          ? "bg-white text-gray-900 shadow-sm"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ListView({
  monthKeys,
  grouped,
}: {
  monthKeys: string[];
  grouped: Record<string, SOPEvent[]>;
}) {
  if (monthKeys.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">
        <div className="text-3xl mb-2">📅</div>
        <p className="text-gray-700 font-medium mb-1">No upcoming events</p>
        <p className="text-gray-500 text-sm mb-4">
          Submit your first event to get started.
        </p>
        <Link
          href="/submit"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
        >
          Submit Event
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {monthKeys.map((key) => (
        <div key={key}>
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-baseline gap-2">
            {monthLabel(key)}
            <span className="text-xs font-medium text-gray-400">
              · {grouped[key].length} event{grouped[key].length !== 1 ? "s" : ""}
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {grouped[key].map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EventCard({ event }: { event: SOPEvent }) {
  const start = parseLocalDate(String(event.date));
  const end = event.endDate ? parseLocalDate(String(event.endDate)) : start;
  const isMultiDay = end.toDateString() !== start.toDateString();
  const isReserved = event.status === "reserved";

  const day = start.getDate();
  const month = start.toLocaleString("default", { month: "short" });
  const dayName = start.toLocaleString("default", { weekday: "short" });

  return (
    <Link
      href={`/events/${event.id}`}
      className={`group rounded-xl p-4 flex gap-4 transition-all ${
        isReserved
          ? "bg-rose-50/50 border-2 border-dashed border-red-400 hover:border-red-500 hover:shadow-md"
          : "bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md"
      }`}
    >
      {/* Date block (left) */}
      <div className="flex-shrink-0 w-14 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg py-2 relative">
        <p className="text-[10px] uppercase tracking-wide text-blue-600 font-bold">
          {month}
        </p>
        <p className="text-2xl font-bold text-blue-700 leading-none">{day}</p>
        <p className="text-[10px] text-blue-500 mt-0.5">{dayName}</p>
        {isMultiDay && (
          <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] font-bold px-1.5 rounded-full">
            {Math.round((end.getTime() - start.getTime()) / 86400000) + 1}d
          </span>
        )}
      </div>

      {/* Info (middle) */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-blue-700">
            {event.name}
          </h3>
          {isReserved && (
            <span className="text-[8px] font-bold uppercase tracking-wide bg-red-600 text-white rounded px-1 py-px leading-none flex-shrink-0">
              TBC
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-2">
          {isMultiDay ? (
            <>
              {start.toLocaleString("default", { month: "short" })}{" "}
              {start.getDate()}–
              {start.getMonth() !== end.getMonth() &&
                `${end.toLocaleString("default", { month: "short" })} `}
              {end.getDate()}
              {" · "}
              {Math.round((end.getTime() - start.getTime()) / 86400000) + 1} days
              {" · "}
            </>
          ) : (
            <>1 day · </>
          )}
          {event.startTime && `${event.startTime}`}
          {event.endTime && `–${event.endTime} · `}
          {event.pax} pax · {layoutLabel[String(event.layout)] || event.layout}
        </p>
        <div className="flex items-center gap-2 text-xs">
          {event.pic && (
            <>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                👤 PIC: {event.pic}
              </span>
              <span className="text-gray-300">·</span>
            </>
          )}
          <span className="text-gray-500 truncate">{event.organizer}</span>
        </div>
      </div>

      {/* Poster thumbnail (right) */}
      {event.posterUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={event.posterUrl}
          alt={event.name}
          className="flex-shrink-0 w-16 h-16 rounded-lg object-cover border border-gray-200"
          referrerPolicy="no-referrer"
        />
      )}
    </Link>
  );
}
