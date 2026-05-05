import Link from "next/link";

const quickLinks = [
  {
    href: "/sop",
    icon: "📋",
    title: "Full SOP",
    desc: "Step-by-step standard operating procedures from booking to post-event",
    color: "blue",
  },
  {
    href: "/checklist",
    icon: "✅",
    title: "Checklists",
    desc: "Pre-event, day-of, and post-event checklists for organizers",
    color: "green",
  },
  {
    href: "/hall-info",
    icon: "🏛️",
    title: "Hall Info & Rules",
    desc: "Capacity, layout, equipment, policies, and hall guidelines",
    color: "purple",
  },
  {
    href: "/contacts",
    icon: "📞",
    title: "Key Contacts",
    desc: "Emergency contacts, vendors, and support team directory",
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

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🏛️</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          BIG Hall Event Guide
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Standard Operating Procedures for hosting events in the BIG Hall.
          Follow this guide from the moment a booking is confirmed to post-event
          wrap-up.
        </p>
      </div>

      {/* Alert banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-10 flex items-start gap-3">
        <span className="text-yellow-600 text-xl mt-0.5">⚠️</span>
        <div>
          <p className="font-semibold text-yellow-800">Before anything else</p>
          <p className="text-yellow-700 text-sm mt-1">
            All event requests must be confirmed in writing (email or signed
            form) before any preparations begin. Do not proceed without official
            confirmation.
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

      {/* SOP Timeline overview */}
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Event Lifecycle Overview
        </h2>
        <div className="space-y-0">
          {[
            {
              phase: "1",
              title: "Booking Confirmation",
              time: "As soon as confirmed",
              items: [
                "Receive written confirmation from organizer",
                "Log event in the hall booking system",
                "Send confirmation receipt to organizer",
              ],
            },
            {
              phase: "2",
              title: "Pre-Event Preparation",
              time: "1–2 weeks before",
              items: [
                "Conduct venue walkthrough with organizer",
                "Confirm guest count, layout, and equipment needs",
                "Arrange catering, AV, and vendor access",
              ],
            },
            {
              phase: "3",
              title: "Day Before Event",
              time: "24 hours before",
              items: [
                "Set up tables, chairs, and stage as per layout",
                "Test all AV equipment and microphones",
                "Confirm security and staff roster",
              ],
            },
            {
              phase: "4",
              title: "Event Day",
              time: "Day of event",
              items: [
                "Open hall and welcome organizer team",
                "Monitor event flow and handle issues",
                "Ensure safety and capacity compliance",
              ],
            },
            {
              phase: "5",
              title: "Post-Event",
              time: "Same day / next day",
              items: [
                "Clear and clean hall",
                "Conduct damage inspection with organizer",
                "Send post-event report and invoice if applicable",
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
