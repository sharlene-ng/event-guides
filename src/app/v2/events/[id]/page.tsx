import { notFound } from "next/navigation";
import Link from "next/link";
import { getEvent } from "@/lib/sheets";
import EventChecklist from "./EventChecklist";

export const dynamic = "force-dynamic";

const layoutLabel: Record<string, string> = {
  theater: "Theater seats",
  classroom: "Classroom",
  banquet: "Banquet",
};

const projectTypeLabel: Record<string, string> = {
  company: "Company",
  internal: "Internal",
  external: "External (chargeable)",
};

const statusBadge: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-rose-100 text-rose-800 border-rose-200",
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) notFound();

  const start = new Date(String(event.date));
  const end = event.endDate ? new Date(String(event.endDate)) : start;
  const isMultiDay = end.toDateString() !== start.toDateString();

  const dateStr = isMultiDay
    ? `${start.toLocaleDateString("en-MY", { weekday: "short", month: "long", day: "numeric" })} → ${end.toLocaleDateString("en-MY", { weekday: "short", month: "long", day: "numeric", year: "numeric" })}`
    : start.toLocaleDateString("en-MY", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link
        href="/v2"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        ← All events
      </Link>

      {/* Header card */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded border bg-white/20 border-white/30 text-white`}
          >
            {event.status}
          </span>
          <span className="text-cyan-100 text-xs">
            {projectTypeLabel[String(event.projectType)] || event.projectType}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
        <p className="text-cyan-50">
          {dateStr}
          {event.startTime &&
            ` · ${event.startTime}${event.endTime ? `–${event.endTime}` : ""}`}
        </p>
      </div>

      {/* Status bar (only if not approved) */}
      {event.status !== "approved" && (
        <div
          className={`border rounded-lg px-4 py-3 mb-6 text-sm ${statusBadge[event.status]}`}
        >
          {event.status === "pending"
            ? "⏳ This event is awaiting approval from Sharlene."
            : event.status === "rejected"
              ? "✕ This event was rejected and won't appear on the home page."
              : ""}
        </div>
      )}

      {/* Quick details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <Detail label="Pax" value={String(event.pax)} />
        <Detail
          label="Layout"
          value={layoutLabel[String(event.layout)] || String(event.layout)}
        />
        <Detail label="Event Owner" value={event.organizer} />
        <Detail label="Internal PIC" value={event.pic || "—"} />
      </div>

      {/* Requirements */}
      {event.requirements &&
        Object.values(event.requirements).some(
          (v) => typeof v === "boolean" && v,
        ) && (
          <section className="mb-8">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
              Requested Add-ons
            </p>
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap gap-2">
              {event.requirements.catering && <Pill>🍱 Catering</Pill>}
              {event.requirements.parking && <Pill>🅿️ Reserved parking</Pill>}
              {event.requirements.lift && <Pill>🛗 Bomba lift</Pill>}
              {event.requirements.aircond && <Pill>❄️ Aircond</Pill>}
            </div>
          </section>
        )}

      {/* Notes */}
      {event.requirements?.notes && (
        <section className="mb-8">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
            Notes
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {event.requirements.notes}
            </p>
          </div>
        </section>
      )}

      {/* Contact */}
      {event.organizerContact && (
        <section className="mb-8">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
            Owner Contact
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700">
            {event.organizerContact}
          </div>
        </section>
      )}

      {/* Checklist (only meaningful for approved events) */}
      {event.status === "approved" && (
        <section>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
            Event Checklist
          </p>
          <EventChecklist
            eventId={event.id}
            initialState={event.checklistState || {}}
          />
        </section>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3">
      <p className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-900 truncate">{value}</p>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
      {children}
    </span>
  );
}
