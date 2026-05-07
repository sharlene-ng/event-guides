import CopyableValue from "@/components/CopyableValue";

export const dynamic = "force-dynamic";

type Card = {
  icon: string;
  title: string;
  rows: { label: string; value: string; copy?: boolean; note?: string }[];
};

// Placeholder values — fill these in with actual hall info.
const cards: Card[] = [
  {
    icon: "📶",
    title: "Wi-Fi",
    rows: [
      { label: "Network", value: "TBD", copy: true },
      { label: "Password", value: "TBD", copy: true },
      { label: "Guest network (if any)", value: "TBD", copy: true },
    ],
  },
  {
    icon: "🚪",
    title: "Access & Door Codes",
    rows: [
      { label: "Entrance keypad", value: "TBD", copy: true },
      { label: "Back door (Big Hall)", value: "TBD", copy: true },
      { label: "Storage room", value: "TBD", copy: true },
    ],
  },
  {
    icon: "❄️",
    title: "Aircond Control",
    rows: [
      {
        label: "Where",
        value: "TBD",
        note: "e.g. wall panel near stage",
      },
      { label: "Default temperature", value: "TBD" },
      {
        label: "After hours / weekend",
        value: "TBD",
        note: "Email building mgmt ≥1 day before",
      },
    ],
  },
  {
    icon: "🎤",
    title: "AV & Equipment Locations",
    rows: [
      { label: "Wireless mics", value: "TBD", note: "+ batteries" },
      { label: "Headset mics", value: "TBD" },
      { label: "Clicker / presenter remote", value: "TBD" },
      { label: "HDMI / VGA cables", value: "TBD" },
      { label: "Extension cords", value: "TBD" },
      { label: "Spare batteries", value: "TBD" },
    ],
  },
  {
    icon: "🛗",
    title: "Bomba / Service Lift",
    rows: [
      {
        label: "How to access",
        value: "TBD",
        note: "Apply via building mgmt; security keys",
      },
      { label: "Lift code / key location", value: "TBD" },
    ],
  },
  {
    icon: "🧹",
    title: "Cleaning & Trash",
    rows: [
      { label: "Cleaning supplies", value: "TBD" },
      { label: "Trash collection point", value: "TBD" },
      { label: "Recycling area", value: "TBD" },
    ],
  },
];

export default function HallInfoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
          🏛️ Quick Reference
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hall Info</h1>
        <p className="text-gray-500">
          Wi-Fi, door codes, equipment locations, and other things you need to
          know to run the BIG Hall day-to-day.
        </p>
      </div>

      {/* Reference cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <section
            key={card.title}
            className="bg-white border border-gray-200 rounded-xl p-5"
          >
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-lg">{card.icon}</span>
              {card.title}
            </h2>
            <dl className="space-y-3">
              {card.rows.map((row) => (
                <div key={row.label}>
                  <dt className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-0.5">
                    {row.label}
                  </dt>
                  <dd className="text-sm text-gray-900 font-medium">
                    {row.value === "TBD" ? (
                      <span className="text-gray-400 italic font-normal">
                        — to fill in —
                      </span>
                    ) : row.copy ? (
                      <CopyableValue
                        value={row.value}
                        type="text"
                        className="text-gray-900 font-medium"
                      />
                    ) : (
                      row.value
                    )}
                  </dd>
                  {row.note && (
                    <p className="text-xs text-gray-500 italic mt-0.5">
                      {row.note}
                    </p>
                  )}
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <p className="mt-6 text-xs text-gray-400 italic">
        💡 Want any of these saved in the Google Sheet so you can edit them
        yourself? Ask Sharlene.
      </p>
    </div>
  );
}
