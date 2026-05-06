"use client";

import { useEffect, useState } from "react";
import LayoutPicker from "@/components/LayoutPicker";
import TimeSelect from "@/components/TimeSelect";

const MAX_POSTER_SIZE = 5 * 1024 * 1024; // 5 MB

type Vehicle = { plate: string; model: string; color: string };
type BookedRange = { start: string; end: string; name: string };

function fileToBase64(
  file: File,
): Promise<{ base64: string; mimeType: string; filename: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve({ base64, mimeType: file.type, filename: file.name });
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function dateInRanges(date: string, ranges: BookedRange[]): BookedRange | null {
  if (!date) return null;
  for (const r of ranges) {
    if (date >= r.start && date <= r.end) return r;
  }
  return null;
}

export default function PublicBookingPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ id: string; name: string } | null>(
    null,
  );

  // Poster state
  const [poster, setPoster] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Date selection state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Booked dates from API
  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);

  // Parking state
  const [parkingRequested, setParkingRequested] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { plate: "", model: "", color: "" },
  ]);

  useEffect(() => {
    fetch("/api/booked-dates")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok && Array.isArray(d.ranges)) setBookedRanges(d.ranges);
      })
      .catch(() => {});
  }, []);

  const startConflict = dateInRanges(startDate, bookedRanges);
  const endConflict = dateInRanges(endDate, bookedRanges);

  function processFile(file: File) {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Poster must be an image file.");
      return;
    }
    if (file.size > MAX_POSTER_SIZE) {
      setError("Poster too large — max 5 MB.");
      return;
    }
    setPoster(file);
    const reader = new FileReader();
    reader.onload = () => setPosterPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handlePosterChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    processFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  function clearPoster() {
    setPoster(null);
    setPosterPreview(null);
  }

  function addVehicle() {
    setVehicles((v) => [...v, { plate: "", model: "", color: "" }]);
  }

  function removeVehicle(idx: number) {
    setVehicles((v) => v.filter((_, i) => i !== idx));
  }

  function updateVehicle(idx: number, field: keyof Vehicle, value: string) {
    setVehicles((v) =>
      v.map((veh, i) => (i === idx ? { ...veh, [field]: value } : veh)),
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const fd = new FormData(e.currentTarget);
    const start = (fd.get("startDate") as string) || startDate;
    const endRaw = (fd.get("endDate") as string) || endDate;
    const end = endRaw || start;

    if (end < start) {
      setError("End date can't be before start date.");
      return;
    }

    if (startConflict || endConflict) {
      setError(
        `That date is already booked (${(startConflict || endConflict)?.name}). Please pick a different date.`,
      );
      return;
    }

    if (!poster) {
      setError("Please upload an event poster before submitting.");
      return;
    }

    setSubmitting(true);

    const phone = (fd.get("ownerPhone") as string).trim();
    const email = (fd.get("ownerEmail") as string).trim();

    const cleanedVehicles = parkingRequested
      ? vehicles.filter((v) => v.plate || v.model || v.color)
      : [];

    const payload: Record<string, unknown> = {
      name: fd.get("name") as string,
      date: start,
      endDate: end,
      startTime: fd.get("startTime") as string,
      endTime: fd.get("endTime") as string,
      pax: Number(fd.get("pax") || 0),
      layout: fd.get("layout") as string,
      organizer: fd.get("eventOwner") as string,
      organizerContact: [phone, email].filter(Boolean).join(" | "),
      projectType: "",
      pic: "",
      requirements: {
        notes: fd.get("notes") as string,
        speakerName: fd.get("speakerName") as string,
        speakerContact: fd.get("speakerContact") as string,
        layoutNotes: fd.get("layoutNotes") as string,
        parking: parkingRequested,
        parkingVehicles: cleanedVehicles.length,
        vehicles: cleanedVehicles,
      },
    };

    try {
      payload.poster = await fileToBase64(poster);
    } catch {
      setError("Could not read poster file. Try a different image.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Submission failed");
      } else {
        setSuccess({ id: data.event.id, name: data.event.name });
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Request submitted
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Thank you. <span className="font-medium text-gray-700">&quot;{success.name}&quot;</span>{" "}
              has been sent for approval. We&apos;ll be in touch shortly.
            </p>
            <p className="text-xs text-gray-400 font-mono mb-6">
              Reference: {success.id}
            </p>
            <button
              onClick={() => setSuccess(null)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Submit another request
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-6">
            BIG Hall · Kuala Lumpur
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h3l3-9 6 18 3-9h3" /></svg>
            </div>
            <span className="font-bold text-sm">BIG Hall</span>
          </div>
          <p className="text-cyan-100 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Event Booking
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Request a Booking
          </h1>
          <p className="text-cyan-50 text-sm sm:text-base max-w-xl">
            Fill in your event details below. We&apos;ll review your request and
            confirm with you within a few working days.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event details */}
          <Card label="Event Details">
            <Field
              label="Event Name *"
              name="name"
              required
              placeholder="e.g. Annual Members Gala"
            />
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                Number of Attendees (Pax) *
              </label>
              <input
                name="pax"
                type="number"
                min={1}
                max={100}
                required
                placeholder="Up to 100"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white"
              />
              <p className="text-xs text-gray-400 mt-1">
                BIG Hall capacity is 100 people.
              </p>
            </div>
          </Card>

          {/* Date & time */}
          <Card label="Date & Time">
            {bookedRanges.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-amber-900 mb-1.5 uppercase tracking-wide">
                  Already booked
                </p>
                <ul className="text-xs text-amber-800 space-y-0.5">
                  {bookedRanges.map((r, i) => (
                    <li key={i}>
                      {r.start === r.end ? r.start : `${r.start} → ${r.end}`}{" "}
                      <span className="text-amber-600">— {r.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white transition-colors ${startConflict ? "border-rose-300 bg-rose-50" : "border-gray-200"}`}
                />
                {startConflict && (
                  <p className="text-xs text-rose-600 mt-1">
                    ⚠ Booked: {startConflict.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={`w-full px-3.5 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white transition-colors ${endConflict ? "border-rose-300 bg-rose-50" : "border-gray-200"}`}
                />
                {endConflict && (
                  <p className="text-xs text-rose-600 mt-1">
                    ⚠ Booked: {endConflict.name}
                  </p>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-400 -mt-2">
              Leave end date empty for single-day events.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TimeSelect label="Start Time" name="startTime" />
              <TimeSelect label="End Time" name="endTime" />
            </div>
          </Card>

          {/* Layout */}
          <Card label="Hall Layout">
            <p className="text-sm text-gray-500 -mt-2 mb-1">
              Pick the seating arrangement that fits your event.
            </p>
            <LayoutPicker name="layout" />
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                Layout Notes (Optional)
              </label>
              <input
                name="layoutNotes"
                placeholder="e.g. 8 people per table, VIP table at front"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white"
              />
              <p className="text-xs text-gray-400 mt-1">
                Useful for grouping — how many per table, special seating, etc.
              </p>
            </div>
          </Card>

          {/* Owner */}
          <Card label="Event Owner">
            <Field
              label="Your Name *"
              name="eventOwner"
              required
              placeholder="Person responsible for this event"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Phone *" name="ownerPhone" type="tel" required placeholder="e.g. +60 12-345 6789" />
              <Field label="Email *" name="ownerEmail" type="email" required placeholder="you@example.com" />
            </div>
          </Card>

          {/* Speaker */}
          <Card label="Speaker (Optional)">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Speaker Name" name="speakerName" placeholder="e.g. Dr Lim" />
              <Field label="Speaker Contact" name="speakerContact" placeholder="Phone or email" />
            </div>
          </Card>

          {/* Parking */}
          <Card label="Parking (Optional)">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={parkingRequested}
                onChange={(e) => setParkingRequested(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-800">
                🅿️ Reserve parking spaces
              </span>
            </label>
            {parkingRequested && (
              <div className="space-y-3">
                {vehicles.map((v, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-gray-600">
                        Vehicle {i + 1}
                      </p>
                      {vehicles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVehicle(i)}
                          className="text-xs text-rose-500 hover:text-rose-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        placeholder="Car plate (e.g. ABC1234)"
                        value={v.plate}
                        onChange={(e) => updateVehicle(i, "plate", e.target.value.toUpperCase())}
                        className="px-3 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                      />
                      <input
                        placeholder="Model (e.g. Honda Civic)"
                        value={v.model}
                        onChange={(e) => updateVehicle(i, "model", e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        placeholder="Color (e.g. Black)"
                        value={v.color}
                        onChange={(e) => updateVehicle(i, "color", e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVehicle}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg py-2.5 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  + Add another vehicle
                </button>
              </div>
            )}
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
              ⚠ Subject to availability — building management will confirm.
            </p>
          </Card>

          {/* Notes */}
          <Card label="Notes (Optional)">
            <textarea
              name="notes"
              rows={3}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white"
              placeholder="Anything we should know — special requests, agenda highlights, etc."
            />
          </Card>

          {/* Event poster */}
          <Card label="Event Poster *">
            <p className="text-sm text-gray-500 -mt-2">
              <span className="font-medium text-gray-700">Required</span> ·
              Recommended <strong>16:9 ratio</strong> (will be displayed at the
              entrance) · JPG/PNG, max 5 MB
            </p>
            {posterPreview ? (
              <div className="relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={posterPreview}
                  alt="Poster preview"
                  className="max-h-64 rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={clearPoster}
                  className="absolute -top-2 -right-2 w-7 h-7 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:bg-rose-50 hover:text-rose-600"
                  title="Remove poster"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                {poster && (
                  <p className="text-xs text-gray-500 mt-2 truncate">
                    {poster.name} · {(poster.size / 1024).toFixed(0)} KB
                  </p>
                )}
              </div>
            ) : (
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  dragOver
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"
                }`}
              >
                <svg
                  className={`w-8 h-8 mb-2 ${dragOver ? "text-blue-500" : "text-gray-400"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p className="text-sm font-medium text-gray-700">
                  {dragOver ? "Drop image here" : "Drag & drop or click to choose"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  16:9 recommended · JPG, PNG up to 5 MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePosterChange}
                  className="hidden"
                />
              </label>
            )}
          </Card>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors disabled:opacity-50 shadow-sm"
          >
            {submitting ? "Submitting…" : "Submit Booking Request"}
          </button>

          <p className="text-xs text-gray-400 text-center">
            We&apos;ll review your request and reach out via your contact details.
          </p>
        </form>
      </div>
    </div>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-4">
        {label}
      </p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string },
) {
  const { label, ...rest } = props;
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
        {label}
      </label>
      <input
        {...rest}
        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white transition-colors"
      />
    </div>
  );
}
