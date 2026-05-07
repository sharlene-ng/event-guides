import Link from "next/link";
import CopyableValue from "@/components/CopyableValue";

type Phase = {
  num: string;
  title: string;
  when: string;
  accent: "blue" | "indigo" | "violet" | "rose";
  bullets: string[];
};

const phases: Phase[] = [
  {
    num: "1",
    title: "Approval & Calendar",
    when: "Start here",
    accent: "blue",
    bullets: [
      "Get approval from Sharlene",
      "Log event in Google Calendar (FD + AIA GE)",
      "Invite all PICs via email",
    ],
  },
  {
    num: "2",
    title: "Email Building Management",
    when: "≥ 1 week before",
    accent: "indigo",
    bullets: [
      "Email mercumkpmoffice@gmail.com",
      "Include name, date/time, pax, guest list (PDF)",
      "Request parking / Bomba lift / aircond if needed",
    ],
  },
  {
    num: "3",
    title: "Other Prep",
    when: "Days before",
    accent: "violet",
    bullets: [
      "Print guest list & hand to security",
      "Confirm parking, aircond, Bomba lift bookings",
    ],
  },
  {
    num: "4",
    title: "Event Day",
    when: "On the day",
    accent: "rose",
    bullets: [
      "Setup: lanyards, name tags, bunting, hall layout, lobby TV",
      "PICs in position (registration, AV, cleaner if needed)",
      "Refreshments, catering, comms",
      "Standby card machines + special arrangements",
    ],
  },
];

const accentDot: Record<Phase["accent"], string> = {
  blue: "bg-blue-500 ring-blue-100",
  indigo: "bg-indigo-500 ring-indigo-100",
  violet: "bg-violet-500 ring-violet-100",
  rose: "bg-rose-500 ring-rose-100",
};


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

      {/* Phases — vertical timeline */}
      <SectionHeader
        eyebrow="Workflow"
        title="Event Phases"
        subtitle="Follow each step in order — from booking confirmation to event day."
      />
      <ol className="relative border-l-2 border-gray-200 ml-4 mb-12 space-y-6">
        {phases.map((phase) => (
          <li key={phase.num} className="ml-6 relative">
            <span
              className={`absolute -left-[34px] flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold ring-4 ${accentDot[phase.accent]}`}
            >
              {phase.num}
            </span>
            <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
              <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
                <h2 className="font-bold text-gray-900 text-base">
                  {phase.title}
                </h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  {phase.when}
                </p>
              </div>
              <ul className="space-y-1.5">
                {phase.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-gray-600 leading-snug"
                  >
                    <span className="text-gray-300 flex-shrink-0 mt-0.5">
                      ›
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
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

