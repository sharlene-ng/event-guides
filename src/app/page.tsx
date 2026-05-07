import Link from "next/link";
import { listEvents, listHolidays, type Holiday, type SOPEvent } from "@/lib/sheets";
import HomeTabs from "@/components/HomeTabs";
import ShareLinkButton from "@/components/ShareLinkButton";

export const revalidate = 60; // re-fetch from Sheets at most every 60 s

export default async function V2Home() {
  let allVisible: SOPEvent[] = [];
  let holidays: Holiday[] = [];
  let backendError: string | null = null;

  try {
    // Show confirmed (approved) + reserved on home page; hide cancelled / rejected / pending
    // Fetch holidays in parallel — fails soft to [] if backend doesn't support it yet.
    const [all, hols] = await Promise.all([listEvents(), listHolidays()]);
    allVisible = all.filter(
      (e) => e.status === "approved" || e.status === "reserved",
    );
    holidays = hols;
  } catch (err) {
    backendError = String(err);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-8 sm:p-10 text-white mb-8 shadow-sm">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-blue-100 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Internal Wiki
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              BIG Hall Event Planning
            </h1>
            <p className="text-blue-50 text-sm sm:text-base max-w-xl">
              Calendar of upcoming bookings, booking guide, and resources.
            </p>
          </div>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 shadow-md transition-colors text-sm self-start sm:self-end"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Submit New Event
          </Link>
        </div>
      </div>

      {backendError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg mb-6">
          ⚠ Could not load events: {backendError}
        </div>
      )}

      {/* Quick shortcuts — guidebook creation + sharable booking link */}
      <div className="flex flex-wrap gap-3 mb-6">
        <a
          href="https://bighall.vercel.app/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
        >
          <span className="text-base">📖</span>
          Create Event Guidebook
          <svg
            className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
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
          label="Share Public Application Form"
          icon="🔗"
          className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 hover:border-blue-300"
        />
      </div>

      <HomeTabs events={allVisible} holidays={holidays} />
    </div>
  );
}
