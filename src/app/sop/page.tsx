import Link from "next/link";
import CopyableValue from "@/components/CopyableValue";
import CopyButton from "@/components/CopyButton";

const bookingRules: { lead: string; body: string }[] = [
  {
    lead: "Check availability first",
    body: "review the BIG Hall calendar before committing to a date.",
  },
  {
    lead: "Submit a booking request",
    body: "the date isn't yours until Sharlene approves it.",
  },
  {
    lead: "Confirmation status matters",
    body: "a booking is only confirmed once it appears in this booking system calendar.",
  },
  {
    lead: "Google Calendar ≠ booking",
    body: "logging the event in Google Calendar (FD / AIA GE) does NOT reserve the hall. It must go through the booking system.",
  },
];

export const metadata = { title: "Event Playbook" };

type Topic = {
  id: string;
  icon: string;
  title: string;
  oneLiner: string;
  accent: "blue" | "indigo" | "violet" | "rose" | "amber" | "emerald";
};

const topics: Topic[] = [
  {
    id: "booking-rules",
    icon: "📋",
    title: "Booking Rules",
    oneLiner: "The basics before you book the hall",
    accent: "emerald",
  },
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
    accent: "amber",
  },
  {
    id: "contingency",
    icon: "🚨",
    title: "When Things Go Wrong",
    oneLiner: "Power trips, internet down — emergency steps",
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
  amber: {
    dot: "bg-amber-500",
    chipBg: "bg-amber-50",
    chipText: "text-amber-700",
    ring: "ring-amber-100",
  },
  emerald: {
    dot: "bg-emerald-500",
    chipBg: "bg-emerald-50",
    chipText: "text-emerald-700",
    ring: "ring-emerald-100",
  },
  rose: {
    dot: "bg-rose-500",
    chipBg: "bg-rose-50",
    chipText: "text-rose-700",
    ring: "ring-rose-100",
  },
};

export default function PlaybookPage() {
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
            Team Reference
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Event Playbook</h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
            Office how-to guides and contingency plans — everything you need to
            run an event in the BIG Hall.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/contacts"
              className="inline-flex items-center gap-1.5 bg-white/10 text-white font-medium px-4 py-2 rounded-lg hover:bg-white/20 text-sm border border-white/20"
            >
              📞 Key Contacts
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 bg-white/10 text-white font-medium px-4 py-2 rounded-lg hover:bg-white/20 text-sm border border-white/20"
            >
              📚 Resources
            </Link>
          </div>
        </div>
      </div>

      {/* Hall Wi-Fi quick info */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl">📶</span>
          <p className="text-sm font-bold text-gray-900">Hall Wi-Fi</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 flex-1">
          <div>
            <span className="text-gray-400 text-xs mr-1">Network</span>
            <CopyableValue
              value="AIM.BIG_Guest"
              type="text"
              className="text-sm text-gray-900 font-medium"
            />
          </div>
          <div>
            <span className="text-gray-400 text-xs mr-1">Password</span>
            <CopyableValue
              value="ai888888"
              type="text"
              className="text-sm text-gray-900 font-medium font-mono"
            />
          </div>
        </div>
        <Link
          href="/resources"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 sm:ml-auto"
        >
          All resources →
        </Link>
      </div>

      {/* Layout: sidebar (desktop) + topic content */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-8 mb-12">
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
                  <p className="font-semibold leading-snug">{t.title}</p>
                  <p className="text-xs opacity-70 leading-snug mt-0.5">
                    {t.oneLiner}
                  </p>
                </div>
              </a>
            ))}
          </nav>
        </aside>

        {/* Topic content */}
        <main className="space-y-12 min-w-0">
          {/* Topic 1: Booking Rules */}
          <TopicSection topic={topics[0]}>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              The basics every team member should know before booking the hall.
            </p>
            <ol className="bg-gray-50 border border-gray-200 rounded-xl divide-y divide-gray-200">
              {bookingRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-4 px-5 py-3.5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed pt-0.5">
                    <span className="font-semibold text-gray-900">
                      {rule.lead}
                    </span>
                    <span className="text-gray-500"> — </span>
                    {rule.body}
                  </p>
                </li>
              ))}
            </ol>
          </TopicSection>

          {/* Topic 2: Event Guidebook */}
          <TopicSection topic={topics[1]}>
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
                <div className="bg-white border border-amber-200 rounded-md p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
                    Password
                  </p>
                  <p className="text-base font-mono text-amber-900 font-semibold tracking-widest mb-1">
                    ••••••••
                  </p>
                  <p className="text-[11px] text-amber-700 leading-snug">
                    Refer to the{" "}
                    <span className="font-semibold">
                      FD Official Group Chat
                    </span>{" "}
                    description.
                  </p>
                </div>
              </div>
            </div>
          </TopicSection>

          {/* Topic 3: TV Display */}
          <TopicSection topic={topics[2]}>
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

          {/* Topic 4: Credit Card Machines */}
          <TopicSection topic={topics[3]}>
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

          {/* Topic 5: Printer */}
          <TopicSection topic={topics[4]}>
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

          {/* Topic 6: Contingency Plan */}
          <TopicSection topic={topics[5]}>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              If something breaks during the event — refer to these steps in
              order.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Power Trips */}
              <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-base">⚡</span>
                  If Power Trips
                </h3>
                <ol className="space-y-2.5 text-sm text-gray-700">
                  <Step n={1}>
                    Check the DB Box next to the stage (there are two — check
                    both). Another DB Box is in the Big Room.
                  </Step>
                  <Step n={2}>
                    Push up all the switches. If it still trips, call the
                    Management Office (Akmal).
                  </Step>
                  <Step n={3}>
                    If still unresolved, call our vendor (Abee).
                  </Step>
                </ol>
              </div>

              {/* Internet Down */}
              <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-base">📡</span>
                  If Internet Goes Down
                </h3>
                <p className="text-[10px] font-bold tracking-wide uppercase text-rose-700 mb-1.5">
                  Immediate workaround
                </p>
                <p className="text-sm text-gray-700 mb-3 pl-3 border-l-2 border-rose-200">
                  Ask attendees to connect to their own hotspot.
                </p>
                <p className="text-[10px] font-bold tracking-wide uppercase text-rose-700 mb-1.5">
                  Troubleshooting
                </p>
                <ol className="space-y-2.5 text-sm text-gray-700">
                  <Step n={1}>Restart the internet / router.</Step>
                  <Step n={2}>
                    If still down, call Nick to check. If the issue is
                    infrastructure-related, contact Khai.
                  </Step>
                </ol>
              </div>
            </div>
            <Link
              href="/contacts"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900"
            >
              See full contact list →
            </Link>
          </TopicSection>
        </main>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  accent = "blue",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: "blue" | "rose";
}) {
  const eyebrowCls = accent === "rose" ? "text-rose-600" : "text-blue-600";
  return (
    <div className="mb-5">
      <p
        className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5 ${eyebrowCls}`}
      >
        {eyebrow}
      </p>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="bg-rose-100 text-rose-700 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-[11px] flex-shrink-0">
        {n}
      </span>
      <span>{children}</span>
    </li>
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
