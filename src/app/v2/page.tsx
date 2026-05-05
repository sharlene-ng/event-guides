import Link from "next/link";

const quickLinks = [
  {
    href: "/v2/sop",
    icon: "📋",
    title: "Full SOP",
    desc: "Approval → Calendar → Email Office → Prep → Event Day",
    color: "blue",
  },
  {
    href: "/v2/checklist",
    icon: "✅",
    title: "Event Day Checklist",
    desc: "Setup, comms, PICs, refreshments — tick as you go",
    color: "green",
  },
  {
    href: "/v2/hall-rules",
    icon: "🏛️",
    title: "Hall Rules",
    desc: "Things to remember when using the hall",
    color: "purple",
  },
  {
    href: "/v2/contacts",
    icon: "📞",
    title: "Contacts",
    desc: "Sharlene, building management, PICs, vendors",
    color: "orange",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  green: "bg-green-50 border-green-200 hover:bg-green-100",
  purple: "bg-purple-50 border-purple-200 hover:bg-purple-100",
  orange: "bg-orange-50 border-orange-200 hover:bg-orange-100",
};

const iconBgMap: Record<string, string> = {
  blue: "bg-blue-100",
  green: "bg-green-100",
  purple: "bg-purple-100",
  orange: "bg-orange-100",
};

export default function V2Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">📅</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          FD Event Planning
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A practical guide for planning events at the FD office. Start with
          approval, work through email & prep, finish strong on event day.
        </p>
      </div>

      {/* Start here banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-10 flex items-start gap-3">
        <span className="text-blue-600 text-xl mt-0.5">👉</span>
        <div>
          <p className="font-semibold text-blue-900">Start here</p>
          <p className="text-blue-700 text-sm mt-1">
            Get approval from <strong>Sharlene</strong> first — she identifies
            whether the event is a <strong>company</strong>,{" "}
            <strong>internal</strong>, or <strong>external (chargeable)</strong>{" "}
            project. Don&apos;t skip this step.
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block border rounded-xl p-6 transition-colors ${colorMap[link.color]}`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 ${iconBgMap[link.color]}`}
              >
                {link.icon}
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">{link.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{link.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Timeline overview */}
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Flow</h2>
        <div className="space-y-0">
          {[
            {
              phase: "1",
              title: "Approval & Calendar",
              time: "Start here",
              items: [
                "Get approval from Sharlene (identifies project type)",
                "Log in Google Calendar: FD Calendar + AIA GE",
                "Invite yourself + all PICs",
              ],
            },
            {
              phase: "2",
              title: "Email Building Management",
              time: "≥ 1 week before",
              items: [
                "Email mercumkpmoffice@gmail.com",
                "Include guest list PDF, parking, lift, aircond requests",
                "Use the Google Sheet guest list template",
              ],
            },
            {
              phase: "3",
              title: "Other Prep",
              time: "Days before",
              items: [
                "Print guest list and pass to security",
                "Confirm parking, aircond, Bomba lift bookings",
                "Brief PICs on roles",
              ],
            },
            {
              phase: "4",
              title: "Event Day",
              time: "On the day",
              items: [
                "Setup & display (lanyards, bunting, lobby TV)",
                "Comms (group chat reminder)",
                "Refreshments, PICs in position",
              ],
            },
          ].map((step, i, arr) => (
            <div key={step.phase} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {step.phase}
                </div>
                {i < arr.length - 1 && (
                  <div className="w-0.5 h-full bg-blue-200 my-1" />
                )}
              </div>
              <div className="pb-8">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="font-bold text-gray-900">{step.title}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {step.time}
                  </span>
                </div>
                <ul className="space-y-1">
                  {step.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-blue-400 mt-0.5">•</span>
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
