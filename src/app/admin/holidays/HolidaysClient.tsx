"use client";

import Link from "next/link";
import { useState } from "react";
import type { Holiday } from "@/lib/sheets";

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

export default function HolidaysClient({ initial }: { initial: Holiday[] }) {
  const [holidays, setHolidays] = useState<Holiday[]>(
    [...initial].sort((a, b) => a.date.localeCompare(b.date)),
  );
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!date || !name.trim()) {
      setError("Both date and name are required.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/holidays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, name: name.trim() }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Could not save");
      } else {
        setHolidays((prev) =>
          [...prev, data.holiday].sort((a, b) => a.date.localeCompare(b.date)),
        );
        setDate("");
        setName("");
      }
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string, label: string) {
    if (!confirm(`Remove "${label}"?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/holidays?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.ok) {
        setHolidays((prev) => prev.filter((h) => h.id !== id));
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Public Holidays
        </h1>
        <p className="text-gray-500 text-sm">
          Holidays show as red-tinted cells on the home calendar.
        </p>
      </div>

      {/* Add form */}
      <form
        onSubmit={add}
        className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 mb-8"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
          Add holiday
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr_auto] gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hari Raya Aidilfitri"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {busy ? "Saving…" : "Add"}
          </button>
        </div>
        {error && <p className="text-rose-600 text-xs mt-2">{error}</p>}
      </form>

      {/* List */}
      <div className="space-y-2">
        {holidays.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-400 text-sm">
            No holidays yet — add one above.
          </div>
        ) : (
          holidays.map((h) => (
            <div
              key={h.id}
              className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-lg px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {h.name}
                </p>
                <p className="text-xs text-gray-500">{formatDate(h.date)}</p>
              </div>
              <button
                onClick={() => remove(h.id, h.name)}
                disabled={busy}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 disabled:opacity-50"
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
