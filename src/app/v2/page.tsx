import Link from "next/link";

const sections = [
  {
    href: "/v2/pricing",
    title: "Pricing",
    desc: "Internal & external rates, add-ons, inclusions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    href: "/v2/hall-info",
    title: "Hall Info",
    desc: "Capacity, equipment, layout & specs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 9h1M9 12h1M9 15h1M14 9h1M14 12h1M14 15h1" />
      </svg>
    ),
    accent: "bg-blue-50 text-blue-600",
  },
  {
    href: "/v2/hall-rules",
    title: "Hall Rules",
    desc: "Things to remember when using the hall",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
    accent: "bg-amber-50 text-amber-600",
  },
  {
    href: "/v2/sop",
    title: "Booking Guide",
    desc: "Step-by-step from approval to event day",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    accent: "bg-indigo-50 text-indigo-600",
  },
  {
    href: "/v2/checklist",
    title: "Event Checklist",
    desc: "Pre-event prep & event day — tick as you go",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    accent: "bg-violet-50 text-violet-600",
  },
  {
    href: "/v2/contacts",
    title: "Contacts",
    desc: "Approver, building management, PICs, vendors",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    accent: "bg-rose-50 text-rose-600",
  },
];

const phases = [
  {
    num: "1",
    label: "Approval & Calendar",
    when: "Start here",
    items: [
      "Get approval from Sharlene (identifies project type)",
      "Log in Google Calendar: FD Calendar + AIA GE",
      "Invite yourself + all PICs",
    ],
  },
  {
    num: "2",
    label: "Email Building Management",
    when: "≥ 1 week before",
    items: [
      "Email mercumkpmoffice@gmail.com",
      "Include guest list, parking, lift, aircond requests",
    ],
  },
  {
    num: "3",
    label: "Other Prep",
    when: "Days before",
    items: [
      "Print guest list and pass to security",
      "Confirm parking, aircond, Bomba lift bookings",
    ],
  },
  {
    num: "4",
    label: "Event Day",
    when: "On the day",
    items: [
      "Setup & display, comms, PICs",
      "Refreshments, credit card machines",
    ],
  },
];

export default function V2Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-8 sm:p-12 text-white mb-10 shadow-sm">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative">
          <p className="text-cyan-100 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Internal Wiki
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            BIG Hall Event Planning
          </h1>
          <p className="text-cyan-50 text-base sm:text-lg max-w-2xl mb-6">
            Everything you need to host events in the BIG Hall — pricing,
            booking flow, checklists, and contacts. Start with approval, then
            work through each phase.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-xs font-medium">
              📍 Kuala Lumpur
            </span>
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-xs font-medium">
              👥 100 participants
            </span>
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-xs font-medium">
              💰 from RM 1,500/day
            </span>
          </div>
        </div>
      </div>

      {/* Section: Quick links */}
      <div className="mb-12">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-4">
          Wiki Sections
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${s.accent}`}>
                  <div className="w-5 h-5">{s.icon}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-semibold text-gray-900">{s.title}</h2>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Section: Event flow */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1">
              Event Flow — 4 Phases
            </p>
            <h2 className="text-xl font-bold text-gray-900">
              From booking to wrap-up
            </h2>
          </div>
          <Link
            href="/v2/sop"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Full guide →
          </Link>
        </div>

        <div className="space-y-0">
          {phases.map((p, i) => (
            <div key={p.num} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  {p.num}
                </div>
                {i < phases.length - 1 && (
                  <div className="w-px flex-1 bg-gray-200 my-2" />
                )}
              </div>
              <div className={i < phases.length - 1 ? "pb-6 flex-1" : "flex-1"}>
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900">{p.label}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {p.when}
                  </span>
                </div>
                <ul className="space-y-1">
                  {p.items.map((item) => (
                    <li key={item} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-gray-300 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
