"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitEventPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      date: fd.get("date") as string,
      startTime: fd.get("startTime") as string,
      endTime: fd.get("endTime") as string,
      pax: Number(fd.get("pax") || 0),
      layout: fd.get("layout") as string,
      organizer: fd.get("organizer") as string,
      organizerContact: fd.get("organizerContact") as string,
      projectType: fd.get("projectType") as string,
      pic: fd.get("pic") as string,
      requirements: {
        catering: fd.get("catering") === "on",
        parking: fd.get("parking") === "on",
        lift: fd.get("lift") === "on",
        aircond: fd.get("aircond") === "on",
        notes: fd.get("notes") as string,
      },
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
        setSuccess(data.event.id);
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Event submitted</h1>
        <p className="text-gray-500 mb-6">
          Your event request has been sent for approval. Sharlene will review
          and approve it. Once approved, it will appear on the home page.
        </p>
        <div className="text-xs text-gray-400 mb-8">
          Reference: <span className="font-mono">{success}</span>
        </div>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => router.push("/v2")}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700"
          >
            Back to home
          </button>
          <button
            onClick={() => setSuccess(null)}
            className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50"
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
          📝 New Submission
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit an Event</h1>
        <p className="text-gray-500">
          Fill in your event details. Sharlene will review and approve. Once
          approved, the event appears on the home page with its own checklist.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card label="Event Details">
          <Field label="Event Name *" name="name" required placeholder="e.g. Annual Town Hall" />
          <Row>
            <Field label="Date *" name="date" type="date" required />
            <Field label="Estimated Pax *" name="pax" type="number" min={1} required />
          </Row>
          <Row>
            <Field label="Start Time" name="startTime" type="time" />
            <Field label="End Time" name="endTime" type="time" />
          </Row>

          <Select
            label="Hall Layout *"
            name="layout"
            required
            options={[
              { value: "", label: "Select layout…" },
              { value: "theater", label: "Theater seats" },
              { value: "classroom", label: "Classroom" },
              { value: "banquet", label: "Banquet" },
            ]}
          />

          <Select
            label="Project Type *"
            name="projectType"
            required
            options={[
              { value: "", label: "Select type…" },
              { value: "company", label: "Company" },
              { value: "internal", label: "Internal" },
              { value: "external", label: "External (chargeable)" },
            ]}
          />
        </Card>

        <Card label="Organizer">
          <Field label="Organizer Name *" name="organizer" required placeholder="Person organizing the event" />
          <Field label="Organizer Contact" name="organizerContact" placeholder="Phone or email" />
          <Field label="Person In Charge (PIC)" name="pic" placeholder="Internal PIC who will run the event day" />
        </Card>

        <Card label="Requirements">
          <div className="grid grid-cols-2 gap-3">
            <Toggle name="catering" label="🍱 Catering" />
            <Toggle name="parking" label="🅿️ Reserved parking" />
            <Toggle name="lift" label="🛗 Bomba (service) lift" />
            <Toggle name="aircond" label="❄️ Aircond" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
              Notes / Special Arrangements
            </label>
            <textarea
              name="notes"
              rows={3}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white"
              placeholder="Anything else the team should know"
            />
          </div>
        </Card>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit for approval"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-4">
        {label}
      </p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
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

function Select({
  label,
  options,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
        {label}
      </label>
      <select
        {...rest}
        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white"
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

function Toggle({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-center gap-2.5 px-3.5 py-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        name={name}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
