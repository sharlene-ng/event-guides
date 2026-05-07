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

      {/* Office How-To */}
      <SectionHeader
        eyebrow="Office"
        title="How-To"
        subtitle="Quick references for the things you'll occasionally need."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {/* TV Display at Office Entrance — spans both columns */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 md:col-span-2">
          <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
            <span className="text-base">📺</span>
            TV Display at Office Entrance
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            The entrance TV greets guests and shows countdowns, key messages,
            or any content from a browser link.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <p className="text-[10px] font-bold tracking-wide uppercase text-blue-700 mb-2">
                How to set up
              </p>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2.5">
                  <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">
                    1
                  </span>
                  <span>
                    Turn on the TV and open the{" "}
                    <span className="font-semibold">TV Web Browser</span> app.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">
                    2
                  </span>
                  <span>Scan the QR code displayed on screen.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">
                    3
                  </span>
                  <span>
                    Paste your browser link into the field — it will be cast
                    onto the TV.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">
                    4
                  </span>
                  <span>
                    Scroll the page to show different sections as holding
                    slides (e.g. countdown, key message, agenda).
                  </span>
                </li>
              </ol>
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-wide uppercase text-blue-700 mb-2">
                Welcoming guests
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                If a guest is arriving and you&apos;d like to display a welcome
                screen, open the browser → go to{" "}
                <span className="font-semibold">Starred</span> → select the
                welcome page.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-[10px] font-bold tracking-wide uppercase text-blue-700 mb-2">
              Quick links
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="https://big-tv-two.vercel.app/display.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg p-3 transition-colors"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-0.5">
                  Display · open on TV
                </p>
                <p className="text-sm font-mono text-blue-700 truncate">
                  big-tv-two.vercel.app/display.html
                </p>
              </a>
              <a
                href="https://big-tv-two.vercel.app/admin.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg p-3 transition-colors"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-0.5">
                  Admin panel · phone / laptop
                </p>
                <p className="text-sm font-mono text-blue-700 truncate">
                  big-tv-two.vercel.app/admin.html
                </p>
              </a>
            </div>
            <p className="text-xs text-gray-500 italic mt-2">
              💡 The display auto-updates — control everything from the admin
              panel on your phone or laptop.
            </p>
          </div>
        </div>

        {/* Credit Card Machines */}
        <a
          href="https://app.clickup.com/3700403/v/dc/3gxnk-54576/3gxnk-15676"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 group-hover:text-blue-700">
              <span className="text-base">💳</span>
              Credit Card Machines
            </h3>
            <svg
              className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 flex-shrink-0 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            For last-minute setup. Open the ClickUp guide for the full
            walk-through.
          </p>
        </a>

        {/* Printer */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-base">🖨️</span>
            Use the Printer
          </h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2.5">
              <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">
                1
              </span>
              <span>Go to the iMac next to Kherwei&apos;s seat.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">
                2
              </span>
              <span className="flex items-center gap-1.5 flex-wrap">
                <span>Log in. Password:</span>
                <span className="text-xs italic text-gray-400">
                  — to fill in —
                </span>
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">
                3
              </span>
              <span>
                Open WhatsApp Web with your own number, send the file/link
                from your phone, then download or open it on the iMac.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">
                4
              </span>
              <span>Print.</span>
            </li>
          </ol>
        </div>
      </div>

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
