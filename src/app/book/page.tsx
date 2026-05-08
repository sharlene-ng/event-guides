"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import LayoutPicker from "@/components/LayoutPicker";
import TimeSelect from "@/components/TimeSelect";

const MAX_VEHICLES = 2;

type Vehicle = { plate: string; model: string; color: string };
type BookedRange = { start: string; end: string; name: string };

type Prefill = {
  name: string;
  pax: string | number;
  layout: string;
  layoutNotes: string;
  organizer: string;
  ownerPhone: string;
  ownerEmail: string;
  startTime: string;
  endTime: string;
  speakerName: string;
  speakerContact: string;
  notes: string;
  parking: boolean;
  vehicles: Vehicle[];
  sourceName: string;
};

function splitContact(s: string): { phone: string; email: string } {
  if (!s) return { phone: "", email: "" };
  const parts = s.split("|").map((p) => p.trim());
  let phone = "";
  let email = "";
  for (const p of parts) {
    if (/@/.test(p)) email = p;
    else if (p) phone = p;
  }
  return { phone, email };
}

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

// Resize and re-encode large images so they fit Vercel's request body limit
// (~4.5 MB after base64 inflation, so target a smaller raw size)
async function compressImageIfNeeded(file: File): Promise<File> {
  const SIZE_THRESHOLD = 1.5 * 1024 * 1024; // 1.5 MB raw — comfortably under limit after base64
  if (file.size <= SIZE_THRESHOLD) return file;
  if (!file.type.startsWith("image/")) return file;

  const dataUrl: string = await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(new Error("read failed"));
    r.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new window.Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error("decode failed"));
    i.src = dataUrl;
  });

  // Resize so the longest edge is at most 1920 px
  const MAX_DIM = 1920;
  let { width, height } = img;
  if (Math.max(width, height) > MAX_DIM) {
    const ratio = MAX_DIM / Math.max(width, height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0, width, height);

  // JPEG at 0.82 quality strikes a good balance for posters
  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/jpeg", 0.82),
  );
  if (!blob) return file;

  const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], newName, { type: "image/jpeg" });
}

function parseLocalDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function toDateString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}


export default function PublicBookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <p className="text-sm text-gray-500">Loading…</p>
        </div>
      }
    >
      <BookingPageInner />
    </Suspense>
  );
}

function BookingPageInner() {
  const searchParams = useSearchParams();
  const duplicateId = searchParams.get("duplicate");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ id: string; name: string } | null>(
    null,
  );

  // Poster state
  const [poster, setPoster] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Date range selection (DayPicker)
  const [range, setRange] = useState<DateRange | undefined>();

  // Booked dates from API
  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);

  // Parking state
  const [parkingRequested, setParkingRequested] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { plate: "", model: "", color: "" },
  ]);

  // Duplicate-mode prefill
  const [prefill, setPrefill] = useState<Prefill | null>(null);
  const [loadingPrefill, setLoadingPrefill] = useState(!!duplicateId);

  useEffect(() => {
    fetch("/api/booked-dates")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok && Array.isArray(d.ranges)) setBookedRanges(d.ranges);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!duplicateId) return;
    fetch(`/api/events/${duplicateId}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.ok || !d.event) {
          setLoadingPrefill(false);
          return;
        }
        const ev = d.event;
        const req = ev.requirements || {};
        const { phone, email } = splitContact(ev.organizerContact || "");
        const sourceVehicles: Vehicle[] = Array.isArray(req.vehicles)
          ? req.vehicles
              .map((v: Vehicle) => ({
                plate: String(v?.plate || ""),
                model: String(v?.model || ""),
                color: String(v?.color || ""),
              }))
              .filter((v: Vehicle) => v.plate || v.model || v.color)
          : [];
        const prefillData: Prefill = {
          name: ev.name || "",
          pax: ev.pax || "",
          layout: ev.layout || "",
          layoutNotes: req.layoutNotes || "",
          organizer: ev.organizer || "",
          ownerPhone: phone,
          ownerEmail: email,
          startTime: ev.startTime || "",
          endTime: ev.endTime || "",
          speakerName: req.speakerName || "",
          speakerContact: req.speakerContact || "",
          notes: req.notes || "",
          parking: !!req.parking,
          vehicles: sourceVehicles,
          sourceName: ev.name || "this event",
        };
        setPrefill(prefillData);
        setParkingRequested(prefillData.parking);
        if (sourceVehicles.length > 0) setVehicles(sourceVehicles);
        setLoadingPrefill(false);
      })
      .catch(() => setLoadingPrefill(false));
  }, [duplicateId]);

  // Build disabled date ranges for the DayPicker
  const disabledRanges = bookedRanges.map((r) => ({
    from: parseLocalDate(r.start),
    to: parseLocalDate(r.end),
  }));
  // Also disable past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  async function processFile(file: File) {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Poster must be an image file.");
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
    setVehicles((v) =>
      v.length >= MAX_VEHICLES ? v : [...v, { plate: "", model: "", color: "" }],
    );
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

    if (!range?.from) {
      setError("Please pick a date for the event.");
      return;
    }
    const start = toDateString(range.from);
    const end = range.to ? toDateString(range.to) : start;

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

    if (poster) {
      try {
        const optimized = await compressImageIfNeeded(poster);
        payload.poster = await fileToBase64(optimized);
      } catch {
        setError("Could not read poster file. Try a different image.");
        setSubmitting(false);
        return;
      }
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

  if (loadingPrefill) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <p className="text-sm text-gray-500">Loading event to duplicate…</p>
      </div>
    );
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
            BIG Hall · Petaling Jaya
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
        {prefill && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm">
            <p className="font-semibold text-amber-900">
              Duplicating from: {prefill.sourceName}
            </p>
            <p className="text-amber-800 mt-0.5">
              All details have been copied. Pick a new <strong>date</strong>{" "}
              and update anything else that needs to change, then submit.
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event details */}
          <Card label="Event Details">
            <Field
              label="Event Name *"
              name="name"
              required
              placeholder="e.g. Annual Members Gala"
              defaultValue={prefill?.name || ""}
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
                defaultValue={prefill?.pax || ""}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white"
              />
              <p className="text-xs text-gray-400 mt-1">
                BIG Hall capacity is 100 people.
              </p>
            </div>
          </Card>

          {/* Date & time */}
          <Card label="Date & Time">
            <p className="text-sm text-gray-500 -mt-2">
              Click a single day, or click two days for a range. Greyed-out
              days are already booked.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-4 flex justify-center">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={[{ before: today }, ...disabledRanges]}
                showOutsideDays
                weekStartsOn={1}
                modifiersClassNames={{
                  selected: "rdp-selected",
                  range_start: "rdp-range-start",
                  range_end: "rdp-range-end",
                  range_middle: "rdp-range-middle",
                  today: "rdp-today",
                  disabled: "rdp-disabled",
                }}
              />
            </div>

            {range?.from && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-sm text-blue-800">
                <strong>Selected: </strong>
                {range.to && range.to.toDateString() !== range.from.toDateString()
                  ? `${range.from.toLocaleDateString("en-MY", { month: "short", day: "numeric", year: "numeric" })} → ${range.to.toLocaleDateString("en-MY", { month: "short", day: "numeric", year: "numeric" })}`
                  : range.from.toLocaleDateString("en-MY", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TimeSelect label="Start Time" name="startTime" defaultValue={prefill?.startTime} />
              <TimeSelect label="End Time" name="endTime" defaultValue={prefill?.endTime} />
            </div>
          </Card>

          {/* Layout */}
          <Card label="Hall Layout">
            <p className="text-sm text-gray-500 -mt-2 mb-1">
              Pick the seating arrangement that fits your event.
            </p>
            <LayoutPicker name="layout" defaultValue={prefill?.layout} />
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                Layout Notes (Optional)
              </label>
              <input
                name="layoutNotes"
                placeholder="e.g. 8 people per table, VIP table at front"
                defaultValue={prefill?.layoutNotes || ""}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white"
              />
              <p className="text-xs text-gray-400 mt-1">
                Useful for grouping — how many per table, special seating, etc.
              </p>
            </div>
          </Card>

          {/* Owner */}
          <Card label="Project Owner (Optional)">
            <Field
              label="Your Name"
              name="eventOwner"
              placeholder="Person responsible for this event"
              defaultValue={prefill?.organizer || ""}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Phone" name="ownerPhone" type="tel" placeholder="e.g. +60 12-345 6789" defaultValue={prefill?.ownerPhone || ""} />
              <Field label="Email" name="ownerEmail" type="email" placeholder="you@example.com" defaultValue={prefill?.ownerEmail || ""} />
            </div>
          </Card>

          {/* Speaker */}
          <Card label="Speaker (Optional)">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Speaker Name" name="speakerName" placeholder="e.g. Dr Lim" defaultValue={prefill?.speakerName || ""} />
              <Field label="Speaker Contact" name="speakerContact" placeholder="Phone or email" defaultValue={prefill?.speakerContact || ""} />
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
                {vehicles.length < MAX_VEHICLES ? (
                  <button
                    type="button"
                    onClick={addVehicle}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg py-2.5 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    + Add another vehicle
                  </button>
                ) : (
                  <p className="text-xs text-gray-400 text-center">
                    Maximum {MAX_VEHICLES} vehicles
                  </p>
                )}
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
              defaultValue={prefill?.notes || ""}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white"
              placeholder="Anything we should know — special requests, agenda highlights, etc."
            />
          </Card>

          {/* Event poster */}
          <Card label="Event Poster (Optional)">
            <p className="text-sm text-gray-500 -mt-2">
              Will be displayed at the entrance. 16:9 ratio recommended.
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
                  16:9 ratio recommended
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
