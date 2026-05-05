import Link from "next/link";

type Step = { label: string; detail: string; required?: boolean };
type Phase = {
  num: string;
  title: string;
  when: string;
  accent: string;
  steps: Step[];
  intro?: { label: string; value: string; href: string };
  template?: { url: string; label: string };
  cta?: { href: string; label: string };
};

const phases: Phase[] = [
  {
    num: "1",
    title: "Approval & Calendar",
    when: "Start here",
    accent: "blue",
    steps: [
      {
        label: "Get approval from Sharlene",
        detail:
          "Sharlene identifies whether it's a company, internal, or external (chargeable) project.",
        required: true,
      },
      {
        label: "Log in Google Calendar",
        detail: "Add the event to both FD Calendar and AIA GE.",
      },
      {
        label: "Invite yourself + all PICs",
        detail:
          "Create the calendar event and invite every Person-In-Charge so everyone has it scheduled.",
      },
    ],
  },
  {
    num: "2",
    title: "Email Building Management",
    when: "≥ 1 week before",
    accent: "indigo",
    intro: {
      label: "Send to",
      value: "mercumkpmoffice@gmail.com",
      href: "mailto:mercumkpmoffice@gmail.com",
    },
    steps: [
      { label: "Event name", detail: "Clear, full name." },
      {
        label: "Event date & time",
        detail: "Including setup and teardown windows if applicable.",
      },
      { label: "Estimated pax", detail: "Best estimate of attendee count." },
      {
        label: "Guest list (PDF)",
        detail:
          "Columns: Number, Name, Contact, NRIC (filled by visitor), Tickbox.",
        required: true,
      },
      {
        label: "Reserved parking (if needed)",
        detail: "Date, time, car plate. Subject to availability.",
      },
      {
        label: "Service lift (Bomba)",
        detail: "Required for catering equipment, heavy boxes, or large setup.",
      },
      {
        label: "Aircond (optional)",
        detail: "If you need aircond outside normal hours.",
      },
    ],
    template: {
      url: "https://docs.google.com/spreadsheets/d/15HHNs5L_sAbXqrSrjggBdHFgLqnHuz_uv9SttKZ7avo/copy",
      label: "Guest list template",
    },
  },
  {
    num: "3",
    title: "Other Prep",
    when: "Days before",
    accent: "violet",
    steps: [
      {
        label: "Print guest list & pass to security",
        detail:
          "Hand over the printed list so security can verify visitors at entry.",
        required: true,
      },
      {
        label: "Confirm reserved parking",
        detail: "If applicable.",
      },
      { label: "Confirm aircond schedule", detail: "If applicable." },
      {
        label: "Confirm Bomba lift booking",
        detail: "Coordinate timing with caterers.",
      },
    ],
  },
  {
    num: "4",
    title: "Event Day",
    when: "On the day",
    accent: "rose",
    steps: [
      {
        label: "Setup & display",
        detail:
          "Lanyards, name tags, bunting, lobby TV, event hall layout — get it all up.",
      },
      {
        label: "Comms",
        detail: "Event reminder + announcement to FD Official Group Chat.",
      },
      {
        label: "PICs in position",
        detail:
          "Registration PIC, AV PIC, cleaner if needed.",
      },
      {
        label: "Refreshments & catering",
        detail: "Food, coffee/tea, snacks, and crew food.",
      },
      {
        label: "Other arrangements",
        detail:
          "Standby credit card machines (company & internal events) and any special arrangements.",
      },
    ],
    cta: { href: "/v2/checklist", label: "Open interactive checklist →" },
  },
];

const accentMap: Record<string, { bg: string; text: string; ring: string }> = {
  blue: { bg: "bg-blue-600", text: "text-blue-600", ring: "ring-blue-100" },
  indigo: { bg: "bg-indigo-600", text: "text-indigo-600", ring: "ring-indigo-100" },
  violet: { bg: "bg-violet-600", text: "text-violet-600", ring: "ring-violet-100" },
  rose: { bg: "bg-rose-600", text: "text-rose-600", ring: "ring-rose-100" },
};

export default function V2SOPPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
          📋 Internal SOP
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          BIG Hall Booking Guide
        </h1>
        <p className="text-gray-500 max-w-2xl">
          Four phases — from getting approval to wrapping up the event day.
          Follow each step in order.
        </p>
      </div>

      {/* Phases */}
      <div className="space-y-8">
        {phases.map((phase) => {
          const accent = accentMap[phase.accent];
          return (
            <section
              key={phase.num}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* Phase header */}
              <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${accent.bg}`}
                >
                  {phase.num}
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-gray-900">{phase.title}</h2>
                  <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">
                    {phase.when}
                  </p>
                </div>
              </div>

              {/* Optional intro (e.g. email recipient) */}
              {phase.intro && (
                <div className="px-6 pt-5">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-baseline gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {phase.intro.label}
                    </span>
                    <a
                      href={phase.intro.href}
                      className="text-sm font-medium text-blue-600 hover:underline truncate"
                    >
                      {phase.intro.value}
                    </a>
                  </div>
                </div>
              )}

              {/* Steps */}
              <div className="px-6 py-5 space-y-3">
                {phase.steps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 px-4 py-3 rounded-lg border ${
                      step.required
                        ? "bg-rose-50/50 border-rose-200"
                        : "bg-gray-50/50 border-gray-100"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white border ${
                        step.required ? "border-rose-300" : "border-gray-300"
                      } flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                        step.required ? "text-rose-600" : "text-gray-500"
                      }`}
                    >
                      {phase.num}.{i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <p className="font-medium text-gray-900 text-sm">
                          {step.label}
                        </p>
                        {step.required && (
                          <span className="text-[10px] font-bold tracking-wide uppercase bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Optional template link */}
              {phase.template && (
                <div className="px-6 pb-5">
                  <a
                    href={phase.template.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    📄 {phase.template.label} — make a copy
                  </a>
                </div>
              )}

              {/* Optional CTA */}
              {phase.cta && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
                  <Link
                    href={phase.cta.href}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {phase.cta.label}
                  </Link>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
