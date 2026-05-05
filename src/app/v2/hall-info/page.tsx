import Link from "next/link";

export default function V2HallInfoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🏛️ Hall Info
        </h1>
        <p className="text-gray-600">
          Big Hall — Kuala Lumpur · 100 participants capacity
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
        <p className="text-yellow-900 text-sm">
          <strong>📝 Coming soon —</strong> Send through your hall photos,
          floor plan, dimensions, and capacity per layout (theatre / banquet /
          classroom etc.) and I&apos;ll fill this page in.
        </p>
      </div>

      {/* Quick facts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Capacity", value: "100", unit: "pax" },
          { label: "Location", value: "KL", unit: "Kuala Lumpur" },
          { label: "Internal", value: "RM 1,500", unit: "/ day" },
          { label: "External", value: "RM 3,000", unit: "/ 9 hrs" },
        ].map((f) => (
          <div
            key={f.label}
            className="bg-white border border-gray-200 rounded-xl p-4"
          >
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {f.label}
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{f.value}</p>
            <p className="text-xs text-gray-500">{f.unit}</p>
          </div>
        ))}
      </div>

      {/* Inclusions summary (from rate card) */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>📦</span> What&apos;s Included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {[
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
          ].map((g) => (
            <div key={g.title}>
              <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center gap-2">
                <span className="text-amber-500">◆</span>
                {g.title}
              </h3>
              <ul className="space-y-1">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <span className="text-green-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Link
            href="/v2/pricing"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            See full rate card →
          </Link>
        </div>
      </div>

      {/* Placeholders */}
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-700 text-lg mb-3">
          Awaiting Content
        </h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>📐 Floor area, ceiling height, stage dimensions</li>
          <li>🪑 Capacity per layout (theatre, banquet, classroom, cocktail)</li>
          <li>📸 Hall photos and floor plan</li>
          <li>🚪 Access points and loading dock info</li>
          <li>🅿️ Parking details</li>
        </ul>
      </div>
    </div>
  );
}
