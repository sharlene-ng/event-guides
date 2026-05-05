import Link from "next/link";

const inclusions = [
  {
    title: "Venue & Facilities",
    items: [
      "Registration area (Entrance)",
      "Dining area",
      "Restrooms (Outside hall)",
      "Tables and chairs",
    ],
  },
  {
    title: "Display & Visuals",
    items: [
      "2× LED screens",
      'TV display (55" & 65" units)',
      '32" TV prompter',
      "Spotlight lighting",
    ],
  },
  {
    title: "Audio & PA System",
    items: [
      "Wireless handheld mics × 2",
      "Wireless headset mics × 2",
      "PA system with speakers",
      "LIVE camera",
    ],
  },
  {
    title: "Tech & Connectivity",
    items: [
      "Wi-Fi",
      "HDMI & VGA cables",
      "Extension cords & power strips",
      "Clicker / presenter remote",
    ],
  },
];

export default function V2HallInfoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-8 sm:p-10 text-white mb-8">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="relative">
          <p className="text-blue-100 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Hall Info
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Big Hall</h1>
          <p className="text-blue-100">
            Kuala Lumpur · Up to 100 participants · Multi-purpose event venue
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { label: "Capacity", value: "100", suffix: "pax" },
          { label: "Location", value: "KL", suffix: "Kuala Lumpur" },
          { label: "Internal", value: "RM 1,500", suffix: "/ day" },
          { label: "External", value: "RM 3,000", suffix: "/ 9 hrs" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white border border-gray-200 rounded-xl p-4"
          >
            <p className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">
              {s.label}
            </p>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.suffix}</p>
          </div>
        ))}
      </div>

      {/* What's included */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">
            What&apos;s Included
          </p>
          <Link href="/v2/pricing" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            See full rate card →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inclusions.map((g) => (
            <div
              key={g.title}
              className="bg-white border border-gray-200 rounded-xl p-5"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                {g.title}
              </h3>
              <ul className="space-y-1.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Awaiting content */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-800 mb-2">
          📝 Coming Soon
        </p>
        <p className="text-amber-900 text-sm mb-3">
          Send through the following and I&apos;ll fill this page in:
        </p>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• Floor area, ceiling height, stage dimensions</li>
          <li>• Capacity per layout (theatre / banquet / classroom / cocktail)</li>
          <li>• Hall photos and floor plan</li>
          <li>• Access points and parking details</li>
        </ul>
      </div>
    </div>
  );
}
