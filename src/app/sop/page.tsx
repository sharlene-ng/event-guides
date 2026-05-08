import Link from "next/link";
import CopyableValue from "@/components/CopyableValue";

type Rule = { lead: string; body: string };

const overviewRules: Rule[] = [
  {
    lead: "Check availability first",
    body: "review the BIG Hall calendar before committing to a date.",
  },
  {
    lead: "Submit a booking request",
    body: "the date isn't yours until Sharlene approves it.",
  },
  {
    lead: "Confirmation status matters",
    body: "a booking is only confirmed once it appears in this booking system calendar.",
  },
  {
    lead: "Google Calendar ≠ booking",
    body: "logging the event in Google Calendar (FD / AIA GE) does NOT reserve the hall. It must go through the booking system.",
  },
];


export default function V2SOPPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 sm:p-10 text-white mb-8 shadow-sm">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative">
          <p className="text-blue-200 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Team Reference
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Event Playbook</h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
            Plan, run, and recover from any BIG Hall event.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/checklist"
              className="inline-flex items-center gap-1.5 bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 text-sm shadow-sm"
            >
              ✅ Open Checklist
            </Link>
            <Link
              href="/contacts"
              className="inline-flex items-center gap-1.5 bg-white/10 text-white font-medium px-4 py-2 rounded-lg hover:bg-white/20 text-sm border border-white/20"
            >
              📞 Key Contacts
            </Link>
          </div>
        </div>
      </div>

      {/* Hall Wi-Fi quick info (templates & forms now live on /resources) */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl">📶</span>
          <p className="text-sm font-bold text-gray-900">Hall Wi-Fi</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 flex-1">
          <div>
            <span className="text-gray-400 text-xs mr-1">Network</span>
            <CopyableValue
              value="AIM.BIG_Guest"
              type="text"
              className="text-sm text-gray-900 font-medium"
            />
          </div>
          <div>
            <span className="text-gray-400 text-xs mr-1">Password</span>
            <CopyableValue
              value="ai888888"
              type="text"
              className="text-sm text-gray-900 font-medium font-mono"
            />
          </div>
        </div>
        <Link
          href="/resources"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 sm:ml-auto"
        >
          All resources →
        </Link>
      </div>

      {/* Overview — high-level booking rules */}
      <SectionHeader
        eyebrow="Booking Rules"
        title="Overview"
        subtitle="The basics every team member should know before booking the hall."
      />
      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-3">
        The Rules
      </p>
      <ol className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100 mb-12">
        {overviewRules.map((rule, i) => (
          <li key={i} className="flex items-start gap-4 px-5 py-4">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center">
              {i + 1}
            </span>
            <p className="text-sm text-gray-700 leading-relaxed pt-0.5">
              <span className="font-semibold text-gray-900">{rule.lead}</span>
              <span className="text-gray-500"> — </span>
              {rule.body}
            </p>
          </li>
        ))}
      </ol>


      {/* Contingency Plan */}
      <SectionHeader
        eyebrow="Emergency"
        title="When Things Go Wrong"
        subtitle="If something breaks during the event — refer to these steps in order."
        accent="rose"
      />
      <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Power Trips */}
          <div className="bg-white border border-rose-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-base">⚡</span>
              If Power Trips
            </h3>
            <ol className="space-y-2.5 text-sm text-gray-700">
              <Step n={1}>
                Check the DB Box next to the stage (there are two — check both).
                Another DB Box is in the Big Room.
              </Step>
              <Step n={2}>
                Push up all the switches. If it still trips, call the
                Management Office (Akmal).
              </Step>
              <Step n={3}>If still unresolved, call our vendor (Abee).</Step>
            </ol>
          </div>

          {/* Internet Down */}
          <div className="bg-white border border-rose-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-base">📡</span>
              If Internet Goes Down
            </h3>
            <p className="text-[10px] font-bold tracking-wide uppercase text-rose-700 mb-1.5">
              Immediate workaround
            </p>
            <p className="text-sm text-gray-700 mb-3 pl-3 border-l-2 border-rose-200">
              Ask attendees to connect to their own hotspot.
            </p>
            <p className="text-[10px] font-bold tracking-wide uppercase text-rose-700 mb-1.5">
              Troubleshooting
            </p>
            <ol className="space-y-2.5 text-sm text-gray-700">
              <Step n={1}>Restart the internet / router.</Step>
              <Step n={2}>
                If still down, call Nick to check. If the issue is
                infrastructure-related, contact Khai.
              </Step>
            </ol>
          </div>
        </div>
        <Link
          href="/contacts"
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900"
        >
          See full contact list →
        </Link>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  accent = "blue",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: "blue" | "rose";
}) {
  const eyebrowCls = accent === "rose" ? "text-rose-600" : "text-blue-600";
  return (
    <div className="mb-5">
      <p
        className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5 ${eyebrowCls}`}
      >
        {eyebrow}
      </p>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="bg-rose-100 text-rose-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

