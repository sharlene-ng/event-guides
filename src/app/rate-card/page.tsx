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

// Stats to hide from quick-stat grid (they're shown in the rate card section instead)
const HIDDEN_STAT_KEYS = new Set([
  "venue_name",
  "location",
  "floor_area",
  "ceiling_height",
  "stage_dimensions",
  "internal_price",
  "external_price",
]);

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
  const location = findInfo(hallInfo, "location")?.value || "Petaling Jaya";
  const capacity = findInfo(hallInfo, "capacity");

  const stats = hallInfo.filter(
    (h) => !HIDDEN_STAT_KEYS.has(h.key) && h.value && h.value !== "TBD",
  );

  const internal = group(pricing, "internal")[0];
  const external = group(pricing, "external")[0];
  const internalAddons = group(pricing, "addon-internal");
  const externalAddons = group(pricing, "addon-external");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {backendError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg mb-6">
          ⚠ Could not load hall info: {backendError}
        </div>
      )}

      {/* Hero — matches site-wide dark gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 sm:p-8 text-white mb-6 shadow-sm">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-blue-200 text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
              Rate Card
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">{venueName}</h1>
            <p className="text-blue-100 text-sm">
              {location}
              {capacity && ` · Up to ${capacity.value} ${capacity.unit || "pax"}`}
            </p>
          </div>
          <Link
            href="/book"
            target="_blank"
            className="inline-flex items-center gap-2 bg-white text-blue-900 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 shadow-sm transition-colors text-sm self-start sm:self-end"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Book This Hall
          </Link>
        </div>
      </div>

      {/* Location & Directions */}
      <section className="mb-8">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3 flex items-center gap-1.5">
          <span>📍</span>
          Location & Directions
        </p>
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start mb-4">
            <div>
              <p className="text-base font-bold text-gray-900">AIM.BIG HQ</p>
              <p className="text-sm text-gray-600">
                Level 8, Mercu Mustapha Kamal (Tower 1)
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://maps.app.goo.gl/H6AZsCgSF9ASbtq39"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-md border border-blue-200"
              >
                🚗 Google Maps
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              </a>
              <a
                href="https://waze.com/ul/hw286020g3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1.5 rounded-md border border-cyan-200"
              >
                🚗 Waze
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-[10px] font-bold tracking-wide uppercase text-blue-700 mb-2">
              How to get to Level 8
            </p>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2.5">
                <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">1</span>
                <span>Park at <span className="font-semibold">L1 / L2</span>.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">2</span>
                <span>Take the lift to <span className="font-semibold">G Floor</span> 🛗</span>
              </li>
              <li className="flex gap-2.5">
                <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">3</span>
                <span>Get your <span className="font-semibold">access pass</span> from the lobby security guard.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">4</span>
                <span>Take the lift to <span className="font-semibold">Level 8</span> 🛗</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Rate card — full pricing breakdown */}
      <div className="mb-10">
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">
            Rate Card
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            View / Download Rate Card →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Internal */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-amber-700 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
              Internal
            </p>
            <p className="text-3xl font-serif font-light text-gray-900">
              {internal?.value || "—"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {internal?.unit || ""}
            </p>
            {internalAddons.length > 0 && (
              <div className="border-t border-gray-100 pt-3">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">
                  Add-on
                </p>
                <div className="space-y-1.5">
                  {internalAddons.map((a) => (
                    <div
                      key={a.label}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-700">{a.label}</span>
                      <span className="text-gray-900 font-semibold">
                        {a.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* External */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
              External
            </p>
            <p className="text-3xl font-serif font-light text-gray-900">
              {external?.value || "—"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {external?.unit || ""}
            </p>
            {externalAddons.length > 0 && (
              <div className="border-t border-gray-100 pt-3">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">
                  Add-on
                </p>
                <div className="space-y-1.5">
                  {externalAddons.map((a) => (
                    <div
                      key={a.label}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-700">{a.label}</span>
                      <span
                        className={`font-semibold ${a.unit === "highlight" ? "text-blue-600" : "text-gray-900"}`}
                      >
                        {a.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* What's included */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-4">
          What&apos;s Included
        </p>
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
