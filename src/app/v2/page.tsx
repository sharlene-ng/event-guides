import Link from "next/link";
import { listEvents, type SOPEvent } from "@/lib/sheets";

export const dynamic = "force-dynamic";

const sections = [
  { href: "/v2/hall-info", title: "Hall Info", desc: "Capacity, equipment, layouts, pricing", icon: "🏛️" },
  { href: "/v2/sop", title: "Booking Guide", desc: "Step-by-step from approval to event day", icon: "📋" },
  { href: "/v2/checklist", title: "Checklist", desc: "Generic event-day reference", icon: "✅" },
  { href: "/v2/contacts", title: "Contacts", desc: "Approver, building mgmt, PICs, vendors", icon: "📞" },
];

const layoutLabel: Record<string, string> = {
  theater: "Theater",
  classroom: "Classroom",
  banquet: "Banquet",
};

function isUpcoming(date: string): boolean {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(date);
  return eventDate >= today;
}

export default async function V2Home() {
  let upcomingEvents: SOPEvent[] = [];
  let pastEvents: SOPEvent[] = [];
  let backendError: string | null = null;

  try {
    const all = await listEvents("approved");
    upcomingEvents = all
      .filter((e) => isUpcoming(String(e.date)))
      .sort((a, b) => String(a.date).localeCompare(String(b.date)));
    pastEvents = all
      .filter((e) => !isUpcoming(String(e.date)))
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
      .slice(0, 5);
  } catch (err) {
    backendError = String(err);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-8 sm:p-10 text-white mb-8 shadow-sm">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-cyan-100 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Internal Wiki
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              BIG Hall Event Planning
            </h1>
            <p className="text-cyan-50 text-sm sm:text-base max-w-xl">
              Upcoming events, booking guide, and resources. Submit a new event
              for approval.
            </p>
          </div>
          <Link
            href="/v2/submit"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 shadow-md transition-colors text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Submit New Event
          </Link>
        </div>
      </div>

      {backendError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg mb-6">
          ⚠ Could not load events from database: {backendError}
        </div>
      )}

      {/* Upcoming events */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">
            Upcoming Events ({upcomingEvents.length})
          </p>
          <Link
            href="/v2/submit"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Submit new →
          </Link>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">
            <div className="text-3xl mb-2">📅</div>
            <p className="text-gray-700 font-medium mb-1">No upcoming events</p>
            <p className="text-gray-500 text-sm mb-4">
              Submit your first event to get started.
            </p>
            <Link
              href="/v2/submit"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
            >
              Submit Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {upcomingEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </section>

      {/* Past events */}
      {pastEvents.length > 0 && (
        <section className="mb-12">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-4">
            Recent Past Events
          </p>
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
            {pastEvents.map((e) => (
              <Link
                key={e.id}
                href={`/v2/events/${e.id}`}
                className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="text-xs text-gray-400 font-mono w-24 flex-shrink-0">
                  {e.date}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {e.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {e.organizer} · {e.pax} pax · {layoutLabel[String(e.layout)] || e.layout}
                  </p>
                </div>
                <span className="text-gray-300">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Wiki sections */}
      <section>
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-4">
          Wiki Sections
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm">{s.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function EventCard({ event }: { event: SOPEvent }) {
  const start = new Date(String(event.date));
  const end = event.endDate ? new Date(String(event.endDate)) : start;
  const isMultiDay = end.toDateString() !== start.toDateString();

  const day = start.getDate();
  const month = start.toLocaleString("default", { month: "short" });
  const dayName = start.toLocaleString("default", { weekday: "short" });

  return (
    <Link
      href={`/v2/events/${event.id}`}
      className="group bg-white border border-gray-200 rounded-xl p-4 flex gap-4 hover:border-blue-300 hover:shadow-md transition-all"
    >
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

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-sm mb-1 truncate group-hover:text-blue-700">
          {event.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {isMultiDay && (
            <>
              until {end.getDate()} {end.toLocaleString("default", { month: "short" })} ·{" "}
            </>
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
    </Link>
  );
}
