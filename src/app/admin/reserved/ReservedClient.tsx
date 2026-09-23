"use client";

import Link from "next/link";
import { useState } from "react";
import type { Reserved } from "@/lib/sheets";

function parseLocalDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function formatDate(s: string): string {
  if (!s) return "";
  return parseLocalDate(s).toLocaleDateString("en-MY", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ReservedClient({ initial }: { initial: Reserved[] }) {
  const [items, setItems] = useState<Reserved[]>(
    [...initial].sort((a, b) => a.startDate.localeCompare(b.startDate)),
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!startDate || !endDate) {
      setError("Both start and end dates are required.");
      return;
    }
    if (endDate < startDate) {
      setError("End date must be on or after start date.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/reserved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate, note }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Could not save");
      } else {
        setItems((prev) =>
          [...prev, data.reserved].sort((a, b) => a.startDate.localeCompare(b.startDate)),
        );
        setStartDate("");
        setEndDate("");
        setNote("");
      }
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove this reserved period?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/reserved?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.ok) {
        setItems((prev) => prev.filter((h) => h.id !== id));
      } else {
        setError(data.error || "Could not delete");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        ← Admin
      </Link>

      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
          🔐 Admin
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reserved Dates</h1>
        <p className="text-gray-500 text-sm">
          Reserved date ranges show as light purple cells on the home calendar.
        </p>
      </div>

      {/* Add form */}
      <form
        onSubmit={add}
        className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
          Add reserved period
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-3 mb-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Note <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Held for VIP / Maintenance"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {busy ? "Saving…" : "Add"}
          </button>
        </div>
        {error && <p className="text-rose-600 text-xs mt-2">{error}</p>}
      </form>

      {/* List */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-400 text-sm">
            No reserved dates yet — add one above.
          </div>
        ) : (
          items.map((h) => (
            <div
              key={h.id}
              className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-lg px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm text-gray-700">
                  {formatDate(h.startDate)} → {formatDate(h.endDate)}
                </p>
                {h.note && (
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{h.note}</p>
                )}
              </div>
              <button
                onClick={() => remove(h.id)}
                disabled={busy}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 disabled:opacity-50 flex-shrink-0"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
