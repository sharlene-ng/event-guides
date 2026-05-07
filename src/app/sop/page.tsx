import Link from "next/link";

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

const accentMap: Record<Phase["accent"], { bg: string; ring: string }> = {
  blue: { bg: "bg-blue-600", ring: "ring-blue-100" },
  indigo: { bg: "bg-indigo-600", ring: "ring-indigo-100" },
  violet: { bg: "bg-violet-600", ring: "ring-violet-100" },
  rose: { bg: "bg-rose-600", ring: "ring-rose-100" },
};

type QuickLink = { icon: string; label: string; href: string; note?: string };

const quickLinks: QuickLink[] = [
  {
    icon: "✉️",
    label: "Email Building Management",
    href: "mailto:mercumkpmoffice@gmail.com",
    note: "mercumkpmoffice@gmail.com",
  },
  {
    icon: "📄",
    label: "Guest List Template",
    href: "https://docs.google.com/spreadsheets/d/15HHNs5L_sAbXqrSrjggBdHFgLqnHuz_uv9SttKZ7avo/copy",
    note: "Make a copy",
  },
  {
    icon: "🛗",
    label: "Bomba Lift Form",
    href: "https://drive.google.com/file/d/1Xto8QCFOFousJsSSUZXN-YXfDWrr84EM/view?usp=sharing",
    note: "Application form",
  },
];

export default function V2SOPPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
          📋 Quick Guide
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Booking Guide
        </h1>
        <p className="text-gray-500">
          Four phases at a glance. Use the{" "}
          <Link
            href="/checklist"
            className="text-blue-600 font-medium hover:underline"
          >
            interactive checklist
          </Link>{" "}
          to track each event step-by-step.
        </p>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {quickLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all flex items-center gap-3"
          >
            <span className="text-2xl">{link.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 truncate">
                {link.label}
              </p>
              {link.note && (
                <p className="text-xs text-gray-500 truncate">{link.note}</p>
              )}
            </div>
            <svg
              className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        ))}
      </div>

      {/* Phases — 2-column grid on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {phases.map((phase) => {
          const accent = accentMap[phase.accent];
          return (
            <section
              key={phase.num}
              className={`bg-white border border-gray-200 rounded-xl p-5 ring-4 ring-offset-0 ${accent.ring}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${accent.bg}`}
                >
                  {phase.num}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-gray-900 text-base">
                    {phase.title}
                  </h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    {phase.when}
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {phase.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-gray-700 leading-snug"
                  >
                    <span className="text-gray-300 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Big CTA */}
      <Link
        href="/checklist"
        className="block bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-100 mb-2">
          ✅ Ready to run your event?
        </p>
        <p className="text-xl sm:text-2xl font-bold mb-1">
          Open the Interactive Checklist
        </p>
        <p className="text-sm text-blue-100">
          Tick off each step as you go — progress is saved per phase.
        </p>
      </Link>
    </div>
  );
}
