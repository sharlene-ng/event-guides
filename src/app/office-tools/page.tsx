import CopyableValue from "@/components/CopyableValue";
import CopyButton from "@/components/CopyButton";

export const metadata = { title: "Office Tools" };

export default function OfficeToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 sm:p-10 text-white mb-8 shadow-sm">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative">
          <p className="text-blue-200 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            How-To
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Office Tools</h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
            Quick references for the office tools you&apos;ll occasionally need
            — printer, entrance TV, credit card machines, and the online event
            guidebook.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Event Guidebook (Online) — spans both columns */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 md:col-span-2">
          <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
            <span className="text-base">📖</span>
            Event Guidebook (Online)
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            Skip the PDF design — use the online guidebook system. Fast to set
            up, easy to duplicate across events, and updates in real time
            after sharing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <p className="text-[10px] font-bold tracking-wide uppercase text-blue-700 mb-2">
                Why use this
              </p>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-emerald-500 flex-shrink-0">✓</span>
                  <span>No PDF design work needed</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 flex-shrink-0">✓</span>
                  <span>Clone and edit for each event</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 flex-shrink-0">✓</span>
                  <span>One shareable link (WhatsApp / email / QR code)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500 flex-shrink-0">✓</span>
                  <span>Update in real time after sharing</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-wide uppercase text-blue-700 mb-2">
                Suggested workflow
              </p>
              <ol className="space-y-2 text-sm text-gray-700">
                <NumStep n={1}>Log in to the admin dashboard.</NumStep>
                <NumStep n={2}>
                  Duplicate the existing guidebook closest to your event type.
                </NumStep>
                <NumStep n={3}>
                  Update name, date, agenda, speakers, and venue details.
                </NumStep>
                <NumStep n={4}>
                  Share the public link via QR / WhatsApp / email.
                </NumStep>
              </ol>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mb-4">
            <p className="text-[10px] font-bold tracking-wide uppercase text-blue-700 mb-2">
              Sample guidebooks
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <QuickLinkCard
                label="Hackathon"
                url="https://bighall.vercel.app/e/hackathon"
              />
              <QuickLinkCard
                label="Vibe Coding Workshop"
                url="https://bighall.vercel.app/e/vibe-coding-workshop"
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
              <p className="text-[10px] font-bold tracking-wide uppercase text-amber-800">
                🔐 Admin Dashboard · internal only
              </p>
              <span className="text-[10px] text-amber-700 italic">
                Don&apos;t share with attendees
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <QuickLinkCard
                label="Admin URL"
                url="https://bighall.vercel.app/admin"
                tone="amber"
              />
              <div className="bg-white border border-amber-200 rounded-md p-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-0.5">
                  Password
                </p>
                <CopyableValue
                  value="931931huat"
                  type="text"
                  className="text-sm font-mono text-amber-900 font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TV Display at Office Entrance — spans both columns */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 md:col-span-2">
          <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
            <span className="text-base">📺</span>
            TV Display at Office Entrance
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            The entrance TV greets guests and shows countdowns, key messages,
            or any content from a browser link.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <p className="text-[10px] font-bold tracking-wide uppercase text-blue-700 mb-2">
                How to set up
              </p>
              <ol className="space-y-2 text-sm text-gray-700">
                <NumStep n={1}>
                  Turn on the TV and open the{" "}
                  <span className="font-semibold">TV Web Browser</span> app.
                </NumStep>
                <NumStep n={2}>Scan the QR code displayed on screen.</NumStep>
                <NumStep n={3}>
                  Paste your browser link into the field — it will be cast onto
                  the TV.
                </NumStep>
                <NumStep n={4}>
                  Scroll the page to show different sections as holding slides
                  (e.g. countdown, key message, agenda).
                </NumStep>
              </ol>
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-wide uppercase text-blue-700 mb-2">
                Welcoming guests
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                If a guest is arriving and you&apos;d like to display a welcome
                screen, open the browser → go to{" "}
                <span className="font-semibold">Starred</span> → select the
                welcome page.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-[10px] font-bold tracking-wide uppercase text-blue-700 mb-2">
              Quick links
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <QuickLinkCard
                label="Display · open on TV"
                url="https://big-tv-two.vercel.app/display.html"
              />
              <QuickLinkCard
                label="Admin panel · phone / laptop"
                url="https://big-tv-two.vercel.app/admin.html"
              />
            </div>
            <p className="text-xs text-gray-500 italic mt-2">
              💡 The display auto-updates — control everything from the admin
              panel on your phone or laptop.
            </p>
          </div>
        </div>

        {/* Credit Card Machines */}
        <a
          href="https://app.clickup.com/3700403/v/dc/3gxnk-54576/3gxnk-15676"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 group-hover:text-blue-700">
              <span className="text-base">💳</span>
              Credit Card Machines
            </h3>
            <svg
              className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 flex-shrink-0 mt-0.5"
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
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            For last-minute setup. Open the ClickUp guide for the full
            walk-through.
          </p>
        </a>

        {/* Printer */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-base">🖨️</span>
            Use the Printer
          </h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <NumStep n={1}>
              Go to the iMac next to Kherwei&apos;s seat.
            </NumStep>
            <NumStep n={2}>
              <span className="flex items-center gap-1.5 flex-wrap">
                <span>Log in. Password:</span>
                <span className="text-xs italic text-gray-400">
                  — to fill in —
                </span>
              </span>
            </NumStep>
            <NumStep n={3}>
              Open WhatsApp Web with your own number, send the file/link from
              your phone, then download or open it on the iMac.
            </NumStep>
            <NumStep n={4}>Print.</NumStep>
          </ol>
        </div>
      </div>
    </div>
  );
}

function NumStep({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="bg-blue-100 text-blue-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

function QuickLinkCard({
  label,
  url,
  tone = "blue",
}: {
  label: string;
  url: string;
  tone?: "blue" | "amber";
}) {
  const palette =
    tone === "amber"
      ? {
          bg: "bg-white",
          border: "border-amber-200",
          urlText: "text-amber-900",
          icon: "text-amber-600 hover:text-amber-800 hover:bg-amber-100",
        }
      : {
          bg: "bg-gray-50",
          border: "border-gray-200",
          urlText: "text-blue-700",
          icon: "text-blue-600 hover:text-blue-800 hover:bg-blue-50",
        };
  return (
    <div
      className={`${palette.bg} border ${palette.border} rounded-lg p-3 flex items-start gap-2`}
    >
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
          {label}
        </p>
        <p
          className={`text-sm font-mono ${palette.urlText} truncate`}
          title={url}
        >
          {url}
        </p>
      </div>
      <div className="flex items-center gap-0.5 flex-shrink-0">
        <CopyButton value={url} className={palette.icon} />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in new tab"
          className={`${palette.icon} rounded-md p-1.5 transition-colors`}
        >
          <svg
            className="w-3.5 h-3.5"
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
      </div>
    </div>
  );
}
