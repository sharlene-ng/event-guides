"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SOPEvent } from "@/lib/sheets";

const statusBadge: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-rose-100 text-rose-800 border-rose-200",
  cancelled: "bg-gray-200 text-gray-700 border-gray-300",
};

const layoutLabel: Record<string, string> = {
  theater: "Theater",
  classroom: "Classroom",
  banquet: "Fishbone",
};

type StatusFilter = "pending" | "approved" | "rejected" | "cancelled" | "all";

export default function AdminPanel({ initialEvents }: { initialEvents: SOPEvent[] }) {
  const router = useRouter();
  const [events, setEvents] = useState<SOPEvent[]>(initialEvents);
  const [filter, setFilter] = useState<StatusFilter>("pending");
  const [busy, setBusy] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = filter === "all" ? events : events.filter((e) => e.status === filter);

  const counts = {
    pending: events.filter((e) => e.status === "pending").length,
    approved: events.filter((e) => e.status === "approved").length,
    rejected: events.filter((e) => e.status === "rejected").length,
    cancelled: events.filter((e) => e.status === "cancelled").length,
  };

  async function changeStatus(
    id: string,
    status: "approved" | "rejected" | "pending" | "cancelled",
  ) {
    setBusy(id);
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.ok) {
        setEvents((prev) =>
          prev.map((e) => (e.id === id ? { ...e, ...data.event } : e)),
        );
      }
    } finally {
      setBusy(null);
    }
  }

  async function saveMeta(id: string, fields: Record<string, unknown>) {
    setBusy(id);
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, fields }),
      });
      const data = await res.json();
      if (data.ok) {
        setEvents((prev) =>
          prev.map((e) => (e.id === id ? { ...e, ...data.event } : e)),
        );
        setEditingId(null);
      }
    } finally {
      setBusy(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
            🔐 Admin
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Approvals</h1>
          <p className="text-gray-500">
            Review submissions, fill in admin-only fields, approve or reject.
          </p>
        </div>
        <button
          onClick={logout}
          className="text-xs text-gray-400 hover:text-gray-700"
        >
          Sign out
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 flex items-center gap-4">
        {(["pending", "approved", "cancelled", "rejected", "all"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`relative flex items-center gap-2 px-1 py-3 text-sm font-medium capitalize transition-colors ${
              filter === tab
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            {tab !== "all" && (
              <span
                className={`text-xs rounded-full px-2 py-0.5 font-semibold ${
                  filter === tab
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[tab]}
              </span>
            )}
            {filter === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center text-gray-400 text-sm">
          No {filter !== "all" ? filter : ""} events.
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((e) => (
          <div
            key={e.id}
            className="bg-white border border-gray-200 rounded-xl p-5"
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="font-bold text-gray-900 truncate">
                    {e.name}
                  </h2>
                  <span
                    className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded border ${statusBadge[e.status]}`}
                  >
                    {e.status}
                  </span>
                  {e.projectType && (
                    <span className="text-[10px] uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded">
                      {e.projectType}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {e.date}
                  {e.endDate && e.endDate !== e.date && ` → ${e.endDate}`}
                  {e.startTime && ` · ${e.startTime}`}
                  {e.endTime && `–${e.endTime}`} · {e.pax} pax ·{" "}
                  {layoutLabel[String(e.layout)] || e.layout}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {e.status === "pending" && (
                  <>
                    <button
                      onClick={() => changeStatus(e.id, "approved")}
                      disabled={busy === e.id}
                      className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-emerald-700 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => changeStatus(e.id, "rejected")}
                      disabled={busy === e.id}
                      className="bg-rose-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-rose-700 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </>
                )}
                {e.status === "approved" && (
                  <button
                    onClick={() => {
                      if (confirm(`Cancel "${e.name}"?`))
                        changeStatus(e.id, "cancelled");
                    }}
                    disabled={busy === e.id}
                    className="text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel event
                  </button>
                )}
                {(e.status === "rejected" || e.status === "cancelled") && (
                  <button
                    onClick={() => changeStatus(e.id, "pending")}
                    disabled={busy === e.id}
                    className="text-xs text-gray-400 hover:text-gray-700 disabled:opacity-50"
                  >
                    ↺ Reset to pending
                  </button>
                )}
              </div>
            </div>

            {/* Owner details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
              <Detail label="Project Owner" value={e.organizer} />
              <Detail label="Owner Contact" value={e.organizerContact || "—"} />
              <Detail label="Event PIC" value={e.pic || "—"} />
            </div>

            {/* Notes */}
            {e.requirements?.notes && (
              <p className="text-xs text-gray-500 italic border-l-2 border-gray-200 pl-3 mb-3">
                ↳ {e.requirements.notes}
              </p>
            )}

            {/* Edit panel */}
            {editingId === e.id ? (
              <EditForm
                event={e}
                onSave={(fields) => saveMeta(e.id, fields)}
                onCancel={() => setEditingId(null)}
                busy={busy === e.id}
              />
            ) : (
              <div className="flex items-center gap-3 pt-3 mt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {e.requirements?.catering && <Pill>🍱 Catering</Pill>}
                  {e.requirements?.parking && <Pill>🅿️ Parking</Pill>}
                  {e.requirements?.lift && <Pill>🛗 Bomba lift</Pill>}
                  {e.requirements?.aircond && <Pill>❄️ Aircond</Pill>}
                  {!e.projectType && (
                    <Pill highlight>⚠ Set project type</Pill>
                  )}
                  {!e.pic && e.status === "approved" && (
                    <Pill highlight>⚠ Assign PIC</Pill>
                  )}
                </div>
                <button
                  onClick={() => setEditingId(e.id)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  ✎ Edit admin fields
                </button>
              </div>
            )}

            {e.approvedAt && (
              <p className="text-[11px] text-gray-400 mt-3">
                Approved by {e.approvedBy || "Sharlene"} on{" "}
                {new Date(e.approvedAt).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EditForm({
  event,
  onSave,
  onCancel,
  busy,
}: {
  event: SOPEvent;
  onSave: (fields: Record<string, unknown>) => void;
  onCancel: () => void;
  busy: boolean;
}) {
  const [projectType, setProjectType] = useState(String(event.projectType || ""));
  const [pic, setPic] = useState(event.pic || "");
  const [reqs, setReqs] = useState({
    catering: !!event.requirements?.catering,
    parking: !!event.requirements?.parking,
    lift: !!event.requirements?.lift,
    aircond: !!event.requirements?.aircond,
    notes: event.requirements?.notes || "",
  });

  function handleSave() {
    onSave({
      projectType,
      pic,
      requirements: reqs,
    });
  }

  return (
    <div className="bg-blue-50/30 border border-blue-100 rounded-lg p-4 space-y-4 mt-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
        Admin-only fields
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Project Type
          </label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">— select —</option>
            <option value="company">Company</option>
            <option value="internal">Internal</option>
            <option value="external">External (chargeable)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Event PIC
          </label>
          <input
            value={pic}
            onChange={(e) => setPic(e.target.value)}
            placeholder="Person assigned from FD team"
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Requirements
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Toggle label="🍱 Catering" checked={reqs.catering} onChange={(v) => setReqs({ ...reqs, catering: v })} />
          <Toggle label="🅿️ Parking" checked={reqs.parking} onChange={(v) => setReqs({ ...reqs, parking: v })} />
          <Toggle label="🛗 Bomba lift" checked={reqs.lift} onChange={(v) => setReqs({ ...reqs, lift: v })} />
          <Toggle label="❄️ Aircond" checked={reqs.aircond} onChange={(v) => setReqs({ ...reqs, aircond: v })} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          value={reqs.notes}
          onChange={(e) => setReqs({ ...reqs, notes: e.target.value })}
          rows={2}
          className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          disabled={busy}
          className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-3 py-1.5"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={busy}
          className="bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {busy ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-0.5">
        {label}
      </p>
      <p className="text-sm text-gray-700">{value}</p>
    </div>
  );
}

function Pill({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${
        highlight
          ? "bg-amber-100 text-amber-800 border border-amber-200"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      {children}
    </span>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 px-2.5 py-2 border border-gray-200 rounded-md cursor-pointer hover:bg-white bg-white/50 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-gray-700 truncate">{label}</span>
    </label>
  );
}
