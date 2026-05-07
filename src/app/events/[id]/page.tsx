import { notFound } from "next/navigation";
import Link from "next/link";
import { getEvent } from "@/lib/sheets";
import { isAdminAuthed } from "@/lib/admin";
import { headerGradients, DEFAULT_COLOR, type EventColor } from "@/lib/colors";
import EventChecklist from "./EventChecklist";
import AdminControls from "./AdminControls";
import EditableDetail from "./EditableDetail";

export const dynamic = "force-dynamic";

const layoutLabel: Record<string, string> = {
  theater: "Theater seats",
  classroom: "Classroom",
  banquet: "Fishbone style",
};

const projectTypeLabel: Record<string, string> = {
  company: "Company",
  internal: "Internal",
  external: "External (chargeable)",
};

const statusBadge: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  reserved: "bg-sky-100 text-sky-800 border-sky-200 border-dashed",
  rejected: "bg-rose-100 text-rose-800 border-rose-200",
  cancelled: "bg-gray-200 text-gray-800 border-gray-300",
};

// "approved" stored internally; displayed as "Confirmed"
const statusLabel: Record<string, string> = {
  pending: "Pending",
  approved: "Confirmed",
  reserved: "Reserved (TBC)",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) notFound();

  const isAdmin = await isAdminAuthed();

  const eventColor = (event.requirements?.color as EventColor) || DEFAULT_COLOR;
  const headerGrad = headerGradients[eventColor] ?? headerGradients[DEFAULT_COLOR];

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
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        ← All events
      </Link>

      {/* Header card */}
      <div className={`bg-gradient-to-br ${headerGrad} text-white rounded-2xl p-6 sm:p-8 mb-6 shadow-sm`}>
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded border bg-white/20 border-white/30 text-white`}
          >
            {statusLabel[event.status] || event.status}
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

      {/* Status bar (only if not confirmed) */}
      {event.status !== "approved" && (
        <div
          className={`border rounded-lg px-4 py-3 mb-6 text-sm ${statusBadge[event.status]}`}
        >
          {event.status === "pending"
            ? "⏳ This event is awaiting confirmation from Sharlene."
            : event.status === "reserved"
              ? "◌ This is a tentative reservation (TBC) — date is held but not yet confirmed."
              : event.status === "rejected"
                ? "✕ This event was rejected and won't appear on the home page."
                : event.status === "cancelled"
                  ? "✕ This event has been cancelled."
                  : ""}
        </div>
      )}

      {/* Admin controls (only when admin authed) */}
      {isAdmin && <AdminControls event={event} />}

      {/* Admin remarks (visible to everyone if set) */}
      {event.requirements?.adminRemarks && (
        <section className="mb-8">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
            Admin Remarks
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-900 whitespace-pre-wrap">
              {event.requirements.adminRemarks}
            </p>
          </div>
        </section>
      )}

      {/* Poster */}
      {event.posterUrl && (
        <section className="mb-8">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
            Event Poster
          </p>
          <a
            href={event.posterViewUrl || event.posterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors"
            title="Open in Google Drive"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.posterUrl}
              alt={`${event.name} poster`}
              className="w-full max-h-[600px] object-contain bg-gray-50"
              referrerPolicy="no-referrer"
            />
          </a>
        </section>
      )}

      {/* Quick details — admins can click to edit inline */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        <EditableDetail
          event={event}
          label="Pax"
          field="pax"
          type="number"
          rawValue={String(event.pax)}
          displayValue={String(event.pax)}
          canEdit={isAdmin}
        />
        <EditableDetail
          event={event}
          label="Layout"
          field="layout"
          type="select"
          options={[
            { value: "theater", label: "Theater seats" },
            { value: "classroom", label: "Classroom" },
            { value: "banquet", label: "Fishbone style" },
          ]}
          rawValue={String(event.layout)}
          displayValue={
            layoutLabel[String(event.layout)] || String(event.layout)
          }
          canEdit={isAdmin}
        />
        <EditableDetail
          event={event}
          label="Speaker"
          field="speakerName"
          rawValue={event.requirements?.speakerName || ""}
          displayValue={event.requirements?.speakerName || "—"}
          canEdit={isAdmin}
        />
        <EditableDetail
          event={event}
          label="Project Owner"
          field="organizer"
          rawValue={event.organizer}
          displayValue={event.organizer}
          canEdit={isAdmin}
        />
        <EditableDetail
          event={event}
          label="Event PIC"
          field="pic"
          rawValue={event.pic || ""}
          displayValue={event.pic || "—"}
          canEdit={isAdmin}
        />
      </div>

      {/* Speaker (new structured fields) */}
      {(event.requirements?.speakerName || event.requirements?.speakerContact) && (
        <section className="mb-8">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
            Speaker
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            {event.requirements.speakerName && (
              <p className="text-sm font-semibold text-gray-900">
                {event.requirements.speakerName}
              </p>
            )}
            {event.requirements.speakerContact && (
              <p className="text-xs text-gray-500 mt-0.5">
                {event.requirements.speakerContact}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Legacy speakers textarea (older submissions) */}
      {event.requirements?.speakers && !event.requirements?.speakerName && (
        <section className="mb-8">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
            Speakers
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {event.requirements.speakers}
            </p>
          </div>
        </section>
      )}

      {/* Layout notes */}
      {event.requirements?.layoutNotes && (
        <section className="mb-8">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
            Layout Notes
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700">
            {event.requirements.layoutNotes}
          </div>
        </section>
      )}

      {/* Add-ons */}
      {event.requirements &&
        (event.requirements.catering ||
          event.requirements.parking ||
          event.requirements.lift ||
          event.requirements.aircond) && (
          <section className="mb-8">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
              Requested Add-ons
            </p>
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap gap-2">
              {event.requirements.catering && <Pill>🍱 Catering</Pill>}
              {event.requirements.parking && (
                <Pill>
                  🅿️ Parking
                  {event.requirements.parkingVehicles
                    ? ` × ${event.requirements.parkingVehicles}`
                    : ""}{" "}
                  <span className="text-amber-700 ml-1 text-[10px]">
                    (subject to availability)
                  </span>
                </Pill>
              )}
              {event.requirements.lift && <Pill>🛗 Bomba lift</Pill>}
              {event.requirements.aircond && <Pill>❄️ Aircond</Pill>}
            </div>
          </section>
        )}

      {/* Vehicles */}
      {event.requirements?.vehicles && event.requirements.vehicles.length > 0 && (
        <section className="mb-8">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
            Vehicle Details
          </p>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-2 px-4 text-[10px] uppercase tracking-wide text-gray-500 font-semibold">
                    Plate
                  </th>
                  <th className="text-left py-2 px-4 text-[10px] uppercase tracking-wide text-gray-500 font-semibold">
                    Model
                  </th>
                  <th className="text-left py-2 px-4 text-[10px] uppercase tracking-wide text-gray-500 font-semibold">
                    Color
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {event.requirements.vehicles.map((v, i) => (
                  <tr key={i}>
                    <td className="py-2 px-4 font-mono text-gray-900">
                      {v.plate || "—"}
                    </td>
                    <td className="py-2 px-4 text-gray-700">{v.model || "—"}</td>
                    <td className="py-2 px-4 text-gray-700">{v.color || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      {/* Checklist (only meaningful for confirmed / reserved events) */}
      {(event.status === "approved" || event.status === "reserved") && (
        <section>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
            Event Checklist
          </p>
          <EventChecklist
            eventId={event.id}
            initialState={event.checklistState || {}}
            canEdit={isAdmin}
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
