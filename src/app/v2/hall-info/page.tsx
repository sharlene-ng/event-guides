import Link from "next/link";
import {
  listHallInfo,
  listPricing,
  type HallInfoRow,
  type PricingRow,
} from "@/lib/sheets";

export const dynamic = "force-dynamic";

const inclusionGroups = [
  { key: "inclusion-venue", title: "Venue & Facilities" },
  { key: "inclusion-display", title: "Display & Visuals" },
  { key: "inclusion-audio", title: "Audio & PA System" },
  { key: "inclusion-tech", title: "Tech & Connectivity" },
];

function findInfo(rows: HallInfoRow[], key: string): HallInfoRow | undefined {
  return rows.find((r) => r.key === key);
}

function group(rows: PricingRow[], section: string): PricingRow[] {
  return rows
    .filter((r) => r.section === section)
    .sort((a, b) => (a.order || "").localeCompare(b.order || ""));
}

export default async function V2HallInfoPage() {
  let hallInfo: HallInfoRow[] = [];
  let pricing: PricingRow[] = [];
  let backendError: string | null = null;
  try {
    [hallInfo, pricing] = await Promise.all([listHallInfo(), listPricing()]);
  } catch (err) {
    backendError = String(err);
  }

  const venueName = findInfo(hallInfo, "venue_name")?.value || "Big Hall";
  const location = findInfo(hallInfo, "location")?.value || "Kuala Lumpur";
  const capacity = findInfo(hallInfo, "capacity");

  // Quick stats: render rows that exist (skip if all values are TBD or missing)
  const stats = hallInfo
    .filter((h) => !["venue_name", "location"].includes(h.key))
    .map((h) => ({
      label: h.key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      value: h.value,
      unit: h.unit,
    }));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {backendError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg mb-6">
          ⚠ Could not load hall info: {backendError}
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-8 sm:p-10 text-white mb-8">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative">
          <p className="text-blue-100 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Hall Info
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{venueName}</h1>
          <p className="text-blue-100">
            {location}
            {capacity && ` · Up to ${capacity.value} ${capacity.unit || "pax"}`}
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3 italic">
        Edit details in the{" "}
        <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono text-xs">
          HallInfo
        </span>{" "}
        and{" "}
        <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono text-xs">
          Pricing
        </span>{" "}
        tabs in your Google Sheet.
      </p>

      {/* Quick stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <p className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-1">
                {s.label}
              </p>
              <p className="text-xl font-bold text-gray-900">
                {s.value || "—"}
              </p>
              {s.unit && (
                <p className="text-xs text-gray-500 mt-0.5">{s.unit}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* What's included (sourced from Pricing tab) */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">
            What&apos;s Included
          </p>
          <Link
            href="/v2/pricing"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            See full rate card →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inclusionGroups.map((g) => {
            const items = group(pricing, g.key);
            if (items.length === 0) return null;
            return (
              <div
                key={g.key}
                className="bg-white border border-gray-200 rounded-xl p-5"
              >
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  {g.title}
                </h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li
                      key={item.label}
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
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
