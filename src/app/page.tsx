import Link from "next/link";
import { listEvents, listHolidays, type Holiday, type SOPEvent } from "@/lib/sheets";
import CalendarView from "@/components/CalendarView";

export const revalidate = 60; // re-fetch from Sheets at most every 60 s

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

export default async function V2Home() {
  let allVisible: SOPEvent[] = [];
  let holidays: Holiday[] = [];
  let backendError: string | null = null;

  try {
    // Show confirmed (approved) + reserved on home page; hide cancelled / rejected / pending
    // Fetch holidays in parallel — fails soft to [] if backend doesn't support it yet.
    const [all, hols] = await Promise.all([listEvents(), listHolidays()]);
    allVisible = all.filter(
      (e) => e.status === "approved" || e.status === "reserved",
    );
    holidays = hols;
  } catch (err) {
    backendError = String(err);
  }

  const upcoming = allVisible
    .filter((e) => isUpcoming(String(e.date)))
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));

  // Group upcoming events by month
  const grouped = upcoming.reduce<Record<string, SOPEvent[]>>((acc, e) => {
    const k = monthKey(String(e.date));
    if (!acc[k]) acc[k] = [];
    acc[k].push(e);
    return acc;
  }, {});

  const monthKeys = Object.keys(grouped).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-8 sm:p-10 text-white mb-8 shadow-sm">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-blue-100 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Internal Wiki
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              BIG Hall Event Planning
            </h1>
            <p className="text-blue-50 text-sm sm:text-base max-w-xl">
              Calendar of upcoming bookings, booking guide, and resources.
            </p>
          </div>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 shadow-md transition-colors text-sm self-start sm:self-end"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Submit New Event
          </Link>
        </div>
      </div>

      {backendError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg mb-6">
          ⚠ Could not load events: {backendError}
        </div>
      )}

      {/* Upcoming events grouped by month */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">
            Upcoming Events ({upcoming.length})
          </p>
          <Link
            href="/submit"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Submit new →
          </Link>
        </div>

        {upcoming.length === 0 ? (
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
        ) : (
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
        )}
      </section>

      {/* Calendar */}
      <section>
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
          Hall Availability
        </p>
        <CalendarView events={allVisible} holidays={holidays} />
      </section>
    </div>
  );
}

function EventCard({ event }: { event: SOPEvent }) {
  const start = parseLocalDate(String(event.date));
  const end = event.endDate ? parseLocalDate(String(event.endDate)) : start;
  const isMultiDay = end.toDateString() !== start.toDateString();

  const day = start.getDate();
  const month = start.toLocaleString("default", { month: "short" });
  const dayName = start.toLocaleString("default", { weekday: "short" });

  return (
    <Link
      href={`/events/${event.id}`}
      className="group bg-white border border-gray-200 rounded-xl p-4 flex gap-4 hover:border-blue-300 hover:shadow-md transition-all"
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
            +{Math.round((end.getTime() - start.getTime()) / 86400000)}d
          </span>
        )}
      </div>

      {/* Info (middle) */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-sm mb-1 truncate group-hover:text-blue-700">
          {event.name}
        </h3>
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
