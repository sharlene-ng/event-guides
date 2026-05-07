import CopyButton from "@/components/CopyButton";

export const metadata = { title: "Office How-To" };

type Topic = {
  id: string;
  icon: string;
  title: string;
  oneLiner: string;
  accent: "blue" | "indigo" | "violet" | "rose";
};

const topics: Topic[] = [
  {
    id: "event-guidebook",
    icon: "📖",
    title: "Event Guidebook (Online)",
    oneLiner: "Online attendee guidebook system",
    accent: "blue",
  },
  {
    id: "tv-display",
    icon: "📺",
    title: "TV Display at Office Entrance",
    oneLiner: "Cast a browser link onto the entrance TV",
    accent: "indigo",
  },
  {
    id: "credit-card",
    icon: "💳",
    title: "Credit Card Machines",
    oneLiner: "Setup guide on ClickUp",
    accent: "violet",
  },
  {
    id: "printer",
    icon: "🖨️",
    title: "Use the Printer",
    oneLiner: "Print via the iMac next to Kherwei",
    accent: "rose",
  },
];

const accent: Record<
  Topic["accent"],
  { dot: string; chipBg: string; chipText: string; ring: string }
> = {
  blue: {
    dot: "bg-blue-500",
    chipBg: "bg-blue-50",
    chipText: "text-blue-700",
    ring: "ring-blue-100",
  },
  indigo: {
    dot: "bg-indigo-500",
    chipBg: "bg-indigo-50",
    chipText: "text-indigo-700",
    ring: "ring-indigo-100",
  },
  violet: {
    dot: "bg-violet-500",
    chipBg: "bg-violet-50",
    chipText: "text-violet-700",
    ring: "ring-violet-100",
  },
  rose: {
    dot: "bg-rose-500",
    chipBg: "bg-rose-50",
    chipText: "text-rose-700",
    ring: "ring-rose-100",
  },
};

export default function OfficeToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Office How-To</h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
            Quick references for the office tools you&apos;ll occasionally need.
            Tap a topic to jump straight to it.
          </p>
        </div>
      </div>

      {/* Layout: sidebar (desktop) + topic content */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-8">
        {/* Topic index — sticky sidebar on desktop */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-2">
            Topics
          </p>
          <nav className="flex flex-col gap-1">
            {topics.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${accent[t.accent].chipBg} ${accent[t.accent].chipText} hover:brightness-95 transition-all`}
              >
                <span className="text-base leading-none flex-shrink-0">
                  {t.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{t.title}</p>
                  <p className="text-xs opacity-70 truncate">{t.oneLiner}</p>
                </div>
              </a>
            ))}
          </nav>
        </aside>

        {/* Topic content */}
        <main className="space-y-12 min-w-0">
          {/* Topic 1: Event Guidebook */}
          <TopicSection topic={topics[0]}>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              Skip the PDF design — use the online guidebook system. Fast to
              set up, easy to duplicate across events, and updates in real time
              after sharing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <Subhead>Why use this</Subhead>
              <Subhead>Suggested workflow</Subhead>

              <ul className="space-y-1.5 text-sm text-gray-700 -mt-3">
                <Bullet>No PDF design work needed</Bullet>
                <Bullet>Clone and edit for each event</Bullet>
                <Bullet>One shareable link (WhatsApp / email / QR code)</Bullet>
                <Bullet>Update in real time after sharing</Bullet>
              </ul>

              <ol className="space-y-2 text-sm text-gray-700 -mt-3">
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

            <Subhead>Sample guidebooks</Subhead>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
              <QuickLinkCard
                label="Hackathon"
                url="https://bighall.vercel.app/e/hackathon"
              />
              <QuickLinkCard
                label="Vibe Coding Workshop"
                url="https://bighall.vercel.app/e/vibe-coding-workshop"
              />
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
                <div className="bg-white border border-amber-200 rounded-md p-3 flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
                      Password
                    </p>
                    <p className="text-sm font-mono text-amber-900 font-semibold truncate">
                      931931huat
                    </p>
                  </div>
                  <CopyButton
                    value="931931huat"
                    className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                  />
                </div>
              </div>
            </div>
          </TopicSection>

          {/* Topic 2: TV Display */}
          <TopicSection topic={topics[1]}>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              The entrance TV greets guests and shows countdowns, key messages,
              or any content from a browser link.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <Subhead>How to set up</Subhead>
                <ol className="space-y-2 text-sm text-gray-700">
                  <NumStep n={1}>
                    Turn on the TV and open the{" "}
                    <span className="font-semibold">TV Web Browser</span> app.
                  </NumStep>
                  <NumStep n={2}>Scan the QR code displayed on screen.</NumStep>
                  <NumStep n={3}>
                    Paste your browser link into the field — it will be cast
                    onto the TV.
                  </NumStep>
                  <NumStep n={4}>
                    Scroll the page to show different sections as holding
                    slides (e.g. countdown, key message, agenda).
                  </NumStep>
                </ol>
              </div>

              <div>
                <Subhead>Welcoming guests</Subhead>
                <p className="text-sm text-gray-700 leading-relaxed">
                  If a guest is arriving and you&apos;d like to display a
                  welcome screen, open the browser → go to{" "}
                  <span className="font-semibold">Starred</span> → select the
                  welcome page.
                </p>
              </div>
            </div>

            <Subhead>Quick links</Subhead>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <QuickLinkCard
                label="Display · open on TV"
                url="https://big-tv-two.vercel.app/display.html"
              />
              <QuickLinkCard
                label="Admin panel · phone / laptop"
                url="https://big-tv-two.vercel.app/admin.html"
              />
            </div>
            <p className="text-xs text-gray-500 italic">
              💡 The display auto-updates — control everything from the admin
              panel on your phone or laptop.
            </p>
          </TopicSection>

          {/* Topic 3: Credit Card Machines */}
          <TopicSection topic={topics[2]}>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              For last-minute setup. The full walk-through lives in ClickUp.
            </p>
            <a
              href="https://app.clickup.com/3700403/v/dc/3gxnk-54576/3gxnk-15676"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-violet-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-violet-700 transition-colors"
            >
              Open ClickUp guide
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
          </TopicSection>

          {/* Topic 4: Printer */}
          <TopicSection topic={topics[3]}>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              The shared printer is connected to the iMac next to
              Kherwei&apos;s seat. Get your file onto the iMac, then print.
            </p>
            <ol className="space-y-2.5 text-sm text-gray-700">
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
                Open WhatsApp Web with your own number, send the file/link
                from your phone, then download or open it on the iMac.
              </NumStep>
              <NumStep n={4}>Print.</NumStep>
            </ol>
          </TopicSection>
        </main>
      </div>
    </div>
  );
}

function TopicSection({
  topic,
  children,
}: {
  topic: Topic;
  children: React.ReactNode;
}) {
  const a = accent[topic.accent];
  return (
    <section
      id={topic.id}
      className={`bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 scroll-mt-20 ring-2 ring-offset-0 ${a.ring}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-base ${a.dot}`}
        >
          {topic.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-gray-900 text-lg">{topic.title}</h2>
          <p className="text-xs text-gray-500">{topic.oneLiner}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold tracking-wide uppercase text-blue-700 mb-2">
      {children}
    </p>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="text-emerald-500 flex-shrink-0">✓</span>
      <span>{children}</span>
    </li>
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

