"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SOPEvent } from "@/lib/sheets";
import { EVENT_COLORS, DEFAULT_COLOR } from "@/lib/colors";

export default function AdminControls({ event }: { event: SOPEvent }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [remarksDraft, setRemarksDraft] = useState(
    event.requirements?.adminRemarks || "",
  );

  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(String(event.date));
  const [endDate, setEndDate] = useState(String(event.endDate || event.date));
  const [startTime, setStartTime] = useState(event.startTime || "");
  const [endTime, setEndTime] = useState(event.endTime || "");
  const [pax, setPax] = useState(String(event.pax));
  const [layout, setLayout] = useState(String(event.layout));
  const [organizer, setOrganizer] = useState(event.organizer);
  const [organizerContact, setOrganizerContact] = useState(event.organizerContact);
  const [projectType, setProjectType] = useState(String(event.projectType));
  const [pic, setPic] = useState(event.pic);
  const [color, setColor] = useState(event.requirements?.color || DEFAULT_COLOR);

  async function handleSave() {
    setBusy(true);
    try {
      const fields: Record<string, unknown> = {
        name,
        date,
        endDate,
        startTime,
        endTime,
        pax: Number(pax) || pax,
        layout,
        organizer,
        organizerContact,
        projectType,
        pic,
        requirements: {
          ...event.requirements,
          adminRemarks: remarksDraft,
          color,
        },
      };
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
      setBusy(false);
    }
  }

  async function handleSaveRemarksOnly() {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: event.id,
          fields: {
            requirements: {
              ...event.requirements,
              adminRemarks: remarksDraft,
            },
          },
        }),
      });
      const data = await res.json();
      if (data.ok) router.refresh();
      else alert(data.error || "Could not save");
    } finally {
      setBusy(false);
    }
  }

  async function quickSaveColor(newColor: string) {
    setColor(newColor);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: event.id,
          fields: {
            requirements: {
              ...event.requirements,
              color: newColor,
            },
          },
        }),
      });
      const data = await res.json();
      if (data.ok) router.refresh();
      else alert(data.error || "Could not save");
    } finally {
      setBusy(false);
    }
  }

  if (!editing) {
    return (
      <section className="mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              🔐 Admin
            </p>
            <button
              onClick={() => setEditing(true)}
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 bg-white border border-amber-300 px-3 py-1 rounded-md hover:bg-amber-50"
            >
              ✎ Edit event info
            </button>
          </div>

          {/* Quick color picker */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wide text-amber-800 mb-2">
              Calendar Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {EVENT_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  disabled={busy}
                  onClick={() => quickSaveColor(c.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${c.swatch} ${
                    color === c.value
                      ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                      : "hover:scale-105"
                  } disabled:opacity-50`}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Inline remarks editor */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wide text-amber-800 mb-1.5">
              Admin Remarks / Comments
            </label>
            <textarea
              value={remarksDraft}
              onChange={(e) => setRemarksDraft(e.target.value)}
              rows={3}
              placeholder="Internal notes about this event…"
              className="w-full px-3 py-2 border border-amber-200 rounded-md text-sm bg-white focus:ring-2 focus:ring-amber-400 outline-none"
            />
            {remarksDraft !== (event.requirements?.adminRemarks || "") && (
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() =>
                    setRemarksDraft(event.requirements?.adminRemarks || "")
                  }
                  disabled={busy}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRemarksOnly}
                  disabled={busy}
                  className="text-xs bg-amber-600 text-white font-semibold px-3 py-1 rounded-md hover:bg-amber-700 disabled:opacity-50"
                >
                  {busy ? "Saving…" : "Save remarks"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
            ✎ Editing event
          </p>
          <button
            onClick={() => setEditing(false)}
            disabled={busy}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>

        <FormField label="Event Name" value={name} onChange={setName} />

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Start Date" type="date" value={date} onChange={setDate} />
          <FormField label="End Date" type="date" value={endDate} onChange={setEndDate} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Start Time" type="time" value={startTime} onChange={setStartTime} />
          <FormField label="End Time" type="time" value={endTime} onChange={setEndTime} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Pax" type="number" value={pax} onChange={setPax} />
          <SelectField
            label="Layout"
            value={layout}
            onChange={setLayout}
            options={[
              { value: "theater", label: "Theater" },
              { value: "classroom", label: "Classroom" },
              { value: "banquet", label: "Fishbone" },
            ]}
          />
        </div>
        <FormField label="Project Owner" value={organizer} onChange={setOrganizer} />
        <FormField
          label="Owner Contact"
          value={organizerContact}
          onChange={setOrganizerContact}
        />
        <div className="grid grid-cols-2 gap-3">
          <SelectField
            label="Project Type"
            value={projectType}
            onChange={setProjectType}
            options={[
              { value: "", label: "—" },
              { value: "company", label: "Company" },
              { value: "internal", label: "Internal" },
              { value: "external", label: "External (chargeable)" },
            ]}
          />
          <FormField label="Event PIC" value={pic} onChange={setPic} />
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wide text-amber-800 mb-2">
            Calendar Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {EVENT_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setColor(c.value)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${c.swatch} ${
                  color === c.value
                    ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                    : "hover:scale-105"
                }`}
                title={c.label}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wide text-amber-800 mb-1.5">
            Admin Remarks / Comments
          </label>
          <textarea
            value={remarksDraft}
            onChange={(e) => setRemarksDraft(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-amber-200 rounded-md text-sm bg-white focus:ring-2 focus:ring-amber-400 outline-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={() => setEditing(false)}
            disabled={busy}
            className="text-xs text-gray-500 hover:text-gray-700 px-3 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={busy}
            className="bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-amber-700 disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold uppercase tracking-wide text-amber-800 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-amber-200 rounded-md text-sm bg-white focus:ring-2 focus:ring-amber-400 outline-none"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold uppercase tracking-wide text-amber-800 mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-amber-200 rounded-md text-sm bg-white focus:ring-2 focus:ring-amber-400 outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
