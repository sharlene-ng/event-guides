import Link from "next/link";
import { listEvents, listHolidays, type Holiday, type SOPEvent } from "@/lib/sheets";
import HomeTabs from "@/components/HomeTabs";
import ShareLinkButton from "@/components/ShareLinkButton";
import BookingRules from "@/components/BookingRules";

export const revalidate = 60; // re-fetch from Sheets at most every 60 s

export default async function V2Home() {
  let allVisible: SOPEvent[] = [];
  let holidays: Holiday[] = [];
  let backendError: string | null = null;

  try {
    // Show confirmed (approved) + reserved + pending on home page; hide cancelled / rejected
    // Fetch holidays in parallel — fails soft to [] if backend doesn't support it yet.
    const [all, hols] = await Promise.all([listEvents(), listHolidays()]);
    allVisible = all.filter(
      (e) => e.status === "approved" || e.status === "reserved" || e.status === "pending",
    );
    holidays = hols;
  } catch (err) {
    backendError = String(err);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero — matches Event Playbook */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 sm:p-8 text-white mb-6 shadow-sm">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative">
          <p className="text-blue-200 text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
            Internal Wiki
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            BIG Hall Event Calendar
          </h1>
          <p className="text-blue-100 text-sm max-w-2xl">
            Calendar of upcoming bookings, booking guide, and resources.
          </p>
        </div>
      </div>

      {backendError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg mb-6">
          ⚠ Could not load events: {backendError}
        </div>
      )}

      {/* Booking Rules — collapsible (closed by default to save vertical space) */}
      <BookingRules />

      {/* Compact action row */}
      <div className="flex flex-wrap gap-2 mb-4 justify-end">
        <Link
          href="/submit"
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-colors text-sm"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Request Booking
        </Link>
        <a
          href="https://bighall.vercel.app/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300 text-gray-800 font-medium px-3.5 py-2 rounded-lg transition-colors text-sm"
        >
          <span>📖</span>
          Guidebook
          <svg
            className="w-3 h-3 text-gray-400 group-hover:text-blue-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
        <ShareLinkButton
          url="/book"
          label="Share Form"
          icon="🔗"
          className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 hover:border-blue-300"
        />
        <Link
          href="/rate-card"
          className="group inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300 text-gray-800 font-medium px-3.5 py-2 rounded-lg transition-colors text-sm"
        >
          <span>💰</span>
          Rate Card
        </Link>
      </div>

      <HomeTabs events={allVisible} holidays={holidays} />
    </div>
  );
}
