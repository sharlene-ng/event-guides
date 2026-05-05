"use client";

import { useState } from "react";
import LayoutPicker from "@/components/LayoutPicker";

export default function PublicBookingPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ id: string; name: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const startDate = fd.get("startDate") as string;
    const endDateRaw = fd.get("endDate") as string;
    const endDate = endDateRaw || startDate;

    if (endDate < startDate) {
      setError("End date can't be before start date.");
      setSubmitting(false);
      return;
    }

    const payload = {
      name: fd.get("name") as string,
      date: startDate, // start date stored in `date` for backwards compat
      endDate,
      startTime: fd.get("startTime") as string,
      endTime: fd.get("endTime") as string,
      pax: Number(fd.get("pax") || 0),
      layout: fd.get("layout") as string,
      organizer: fd.get("eventOwner") as string,
      organizerContact: fd.get("ownerContact") as string,
      // Project type, PIC, requirements left blank — admin sets after approval
      projectType: "",
      pic: "",
      requirements: { notes: fd.get("notes") as string },
    };

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
      {/* Header */}
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

      {/* Form */}
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
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1">
                BIG Hall capacity is 100 people.
              </p>
            </div>
          </Card>

          {/* Date & time */}
          <Card label="Date & Time">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Start Date *" name="startDate" type="date" required />
              <Field
                label="End Date"
                name="endDate"
                type="date"
                placeholder="Same as start if single day"
              />
            </div>
            <p className="text-xs text-gray-400 -mt-2">
              Leave end date empty for single-day events.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Start Time" name="startTime" type="time" />
              <Field label="End Time" name="endTime" type="time" />
            </div>
          </Card>

          {/* Layout */}
          <Card label="Hall Layout">
            <p className="text-sm text-gray-500 -mt-2 mb-1">
              Pick the seating arrangement that fits your event.
            </p>
            <LayoutPicker name="layout" />
          </Card>

          {/* Owner */}
          <Card label="Event Owner">
            <Field
              label="Your Name *"
              name="eventOwner"
              required
              placeholder="Person responsible for this event"
            />
            <Field
              label="Contact (Phone / Email) *"
              name="ownerContact"
              required
              placeholder="So we can reach you about the booking"
            />
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

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
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
