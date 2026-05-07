"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { SOPEvent } from "@/lib/sheets";

type Option = { value: string; label: string };

type Props = {
  event: SOPEvent;
  label: string;
  field: "pax" | "layout" | "organizer" | "pic" | "speakerName";
  displayValue: string;
  rawValue: string;
  type?: "text" | "number" | "select";
  options?: Option[];
  canEdit: boolean;
};

export default function EditableDetail({
  event,
  label,
  field,
  displayValue,
  rawValue,
  type = "text",
  options,
  canEdit,
}: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(rawValue);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  useEffect(() => {
    if (editing) {
      setDraft(rawValue);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [editing, rawValue]);

  async function save() {
    if (draft === rawValue) {
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      const fields: Record<string, unknown> = {};
      if (field === "speakerName") {
        fields.requirements = {
          ...event.requirements,
          speakerName: draft,
        };
      } else if (field === "pax") {
        fields.pax = Number(draft) || 0;
      } else {
        fields[field] = draft;
      }
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: event.id, fields }),
      });
      const data = await res.json();
      if (data.ok) {
        setEditing(false);
        router.refresh();
      } else {
        alert(data.error || "Could not save");
      }
    } finally {
      setSaving(false);
    }
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && type !== "select") {
      e.preventDefault();
      save();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setEditing(false);
    }
  }

  if (!canEdit) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <p className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-900 truncate">
          {displayValue}
        </p>
      </div>
    );
  }

  if (editing) {
    const dirty = draft !== rawValue;
    return (
      <div className="bg-white border-2 border-blue-300 rounded-xl p-3 ring-2 ring-blue-100">
        <p className="text-[10px] uppercase tracking-wide text-blue-700 font-semibold mb-1">
          {label}
        </p>
        {type === "select" && options ? (
          <select
            ref={(el) => {
              inputRef.current = el;
            }}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKey}
            disabled={saving}
            className="w-full text-sm font-medium text-gray-900 bg-transparent outline-none mb-2"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            ref={(el) => {
              inputRef.current = el;
            }}
            type={type === "number" ? "number" : "text"}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKey}
            disabled={saving}
            className="w-full text-sm font-medium text-gray-900 bg-transparent outline-none mb-2"
          />
        )}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="flex-1 text-[11px] font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white px-2 py-1 rounded transition-colors"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            disabled={saving}
            className="text-[11px] font-medium text-gray-500 hover:text-gray-700 px-2 py-1"
          >
            Cancel
          </button>
        </div>
        <p className="text-[9px] text-gray-400 mt-1">
          ↵ to save · Esc to cancel
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm rounded-xl p-3 text-left transition-all group relative"
      title="Click to edit"
    >
      <p className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1 flex items-center gap-1">
        {label}
        <svg
          className="w-3 h-3 text-gray-300 group-hover:text-blue-500 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </p>
      <p className="text-sm font-medium text-gray-900 truncate">
        {displayValue}
      </p>
    </button>
  );
}
