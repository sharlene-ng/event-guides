"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SOPEvent } from "@/lib/sheets";

const statusBadge: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-rose-100 text-rose-800 border-rose-200",
};

export default function AdminPanel({ initialEvents }: { initialEvents: SOPEvent[] }) {
  const router = useRouter();
  const [events, setEvents] = useState<SOPEvent[]>(initialEvents);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = filter === "all" ? events : events.filter((e) => e.status === filter);

  const counts = {
    pending: events.filter((e) => e.status === "pending").length,
    approved: events.filter((e) => e.status === "approved").length,
    rejected: events.filter((e) => e.status === "rejected").length,
  };

  async function changeStatus(id: string, status: "approved" | "rejected" | "pending") {
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
            Review event submissions and approve or reject.
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
        {(["pending", "approved", "rejected", "all"] as const).map((tab) => (
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
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-bold text-gray-900 truncate">
                    {e.name}
                  </h2>
                  <span
                    className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded border ${statusBadge[e.status]}`}
                  >
                    {e.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {e.date} {e.startTime && `· ${e.startTime}`}
                  {e.endTime && `–${e.endTime}`} · {e.pax} pax · {e.layout}
                </p>
              </div>
              {e.status === "pending" && (
                <div className="flex gap-2 flex-shrink-0">
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
                </div>
              )}
              {e.status !== "pending" && (
                <button
                  onClick={() => changeStatus(e.id, "pending")}
                  disabled={busy === e.id}
                  className="text-xs text-gray-400 hover:text-gray-700 disabled:opacity-50"
                >
                  ↺ Move back to pending
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              <Detail label="Organizer" value={e.organizer} />
              <Detail label="Contact" value={e.organizerContact || "—"} />
              <Detail label="Project Type" value={e.projectType} />
              <Detail label="PIC" value={e.pic || "—"} />
            </div>

            {e.requirements && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {e.requirements.catering && <Pill>🍱 Catering</Pill>}
                {e.requirements.parking && <Pill>🅿️ Parking</Pill>}
                {e.requirements.lift && <Pill>🛗 Bomba lift</Pill>}
                {e.requirements.aircond && <Pill>❄️ Aircond</Pill>}
              </div>
            )}

            {e.requirements?.notes && (
              <p className="text-xs text-gray-500 italic border-l-2 border-gray-200 pl-3">
                ↳ {e.requirements.notes}
              </p>
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
      {children}
    </span>
  );
}
