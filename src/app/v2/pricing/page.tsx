export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        {/* Hero header */}
        <div className="relative bg-black text-white px-8 py-10 overflow-hidden">
          {/* subtle grid texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* corner bracket */}
          <div className="absolute top-6 right-8 border-t-2 border-r-2 border-amber-400/60 w-16 h-16 rounded-tr-lg" />

          <div className="relative">
            <p className="text-amber-400 text-xs font-semibold tracking-[0.25em] mb-4">
              — VENUE RATE CARD
            </p>
            <h1 className="text-5xl sm:text-6xl font-serif font-light tracking-tight mb-4">
              Big Hall
            </h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="bg-amber-400 text-black font-semibold px-3 py-1 rounded-full text-xs">
                100 participants
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">Kuala Lumpur</span>
            </div>
          </div>
        </div>

        {/* Pricing tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
          {/* Internal */}
          <div className="bg-amber-50/60 px-8 py-8 border-b md:border-b-0 md:border-r border-amber-200/60">
            <p className="text-amber-700 text-xs font-bold tracking-[0.2em] mb-3">
              — INTERNAL
            </p>
            <div className="font-serif text-5xl font-light text-gray-900 mb-1">
              RM 1,500
            </div>
            <p className="text-amber-700 text-sm mb-6">per day</p>
            <div className="border-t border-amber-200 pt-4">
              <p className="text-gray-500 text-xs font-bold tracking-[0.2em] mb-3">
                ADD ON
              </p>
              <PriceRow label="Technician onsite" price="+ RM 500/day" />
            </div>
          </div>

          {/* External */}
          <div className="bg-white px-8 py-8">
            <p className="text-gray-600 text-xs font-bold tracking-[0.2em] mb-3">
              — EXTERNAL
            </p>
            <div className="font-serif text-5xl font-light text-gray-900 mb-1">
              RM 3,000
            </div>
            <p className="text-gray-500 text-sm mb-6">9 hours per day</p>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-500 text-xs font-bold tracking-[0.2em] mb-3">
                ADD ON
              </p>
              <div className="space-y-2">
                <PriceRow label="Additional hour" price="+ RM 200/hr" />
                <PriceRow label="Technician onsite" price="+ RM 500/day" />
                <PriceRow
                  label="Security deposit"
                  price="+ RM 2,000"
                  emphasize
                />
              </div>
            </div>
          </div>
        </div>

        {/* Inclusions */}
        <div className="bg-amber-50/40 px-8 py-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-12 bg-amber-400" />
            <p className="text-amber-700 text-xs font-bold tracking-[0.3em]">
              INCLUSIONS
            </p>
            <span className="h-px w-12 bg-amber-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            <InclusionGroup
              title="Venue & Facilities"
              items={[
                "Registration area (Entrance)",
                "Dining area",
                "Restrooms (Outside hall)",
                "Tables and chairs",
              ]}
            />
            <InclusionGroup
              title="Display & Visuals"
              items={[
                "2× LED screens",
                'TV display (55" & 65" units)',
                '32" TV prompter (1 unit)',
                "Spotlight lighting",
              ]}
            />
            <InclusionGroup
              title="Audio & PA System"
              items={[
                "Wireless handheld microphones (2 units)",
                "Wireless headset microphones (2 units)",
                "PA system with speakers",
                "LIVE camera",
              ]}
            />
            <InclusionGroup
              title="Tech & Connectivity"
              items={[
                "Wi-Fi",
                "HDMI & VGA cables",
                "Extension cords & power strips",
                "Clicker / presenter remote",
              ]}
            />
          </div>
        </div>

        {/* Footer note */}
        <div className="bg-amber-50/40 border-t border-amber-200 px-8 py-4 text-center">
          <p className="text-xs text-amber-800/80 tracking-wide">
            <span className="text-amber-500">◆</span> All rates are quoted in
            Malaysian Ringgit (RM){" "}
            <span className="text-amber-500 mx-2">·</span> Prices are subject to
            change without prior notice <span className="text-amber-500">◆</span>
          </p>
        </div>
      </div>

      {/* Quick reference card */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          icon="💡"
          title="Internal events"
          desc="Flat RM 1,500/day. Best for company & internal use."
        />
        <SummaryCard
          icon="🤝"
          title="External events"
          desc="RM 3,000 for 9 hrs. Refundable RM 2,000 security deposit."
        />
        <SummaryCard
          icon="🛠️"
          title="Add-ons available"
          desc="Technician (RM 500/day), extra hours (RM 200/hr)."
        />
      </div>
    </div>
  );
}

function PriceRow({
  label,
  price,
  emphasize,
}: {
  label: string;
  price: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex justify-between items-baseline text-sm">
      <span className="text-gray-700">{label}</span>
      <span
        className={`font-semibold ${
          emphasize ? "text-blue-600" : "text-gray-900"
        }`}
      >
        {price}
      </span>
    </div>
  );
}

function InclusionGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-gray-900 text-sm font-bold tracking-wide mb-3 flex items-center gap-2">
        <span className="text-amber-500">◆</span>
        <span className="uppercase tracking-[0.15em]">{title}</span>
      </h3>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm text-gray-700 flex items-start gap-2"
          >
            <span className="text-amber-500 mt-0.5">–</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SummaryCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
      <p className="text-gray-600 text-xs">{desc}</p>
    </div>
  );
}
