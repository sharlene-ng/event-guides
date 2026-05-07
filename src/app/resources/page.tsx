import CopyableValue from "@/components/CopyableValue";
import { isAdminAuthed } from "@/lib/admin";

export const metadata = { title: "Resources" };
export const dynamic = "force-dynamic";

type Resource = {
  icon: string;
  label: string;
  href: string;
  note?: string;
};

const templates: Resource[] = [
  {
    icon: "✉️",
    label: "Email Template",
    href: "https://docs.google.com/document/d/1zItAHHseRnrvc7q1XnJUXgrhX9Ad1O01svnQ9dCAhD8/edit?usp=sharing",
    note: "Send to building management for new bookings",
  },
  {
    icon: "📄",
    label: "Guest List Template",
    href: "https://docs.google.com/spreadsheets/d/15HHNs5L_sAbXqrSrjggBdHFgLqnHuz_uv9SttKZ7avo/copy",
    note: "Make a copy for each event, submit to management and security",
  },
  {
    icon: "🛗",
    label: "Bomba / Service Lift Application Form",
    href: "https://drive.google.com/file/d/1Xto8QCFOFousJsSSUZXN-YXfDWrr84EM/view?usp=sharing",
    note: "Submit at least 3 days before",
  },
];

const calendars: Resource[] = [
  {
    icon: "📅",
    label: "FD Calendar",
    href: "https://calendar.google.com/calendar/u/3?cid=Y18zM2RhNWU2NDY4Mzk1Mzg3NDJiOGQ1MDFiZDZkODM4OWY2ZWU2NDQzNTkzMjdiZDgwZjJiODU5MDM5NDI4ZmU2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
    note: "Add to your Google Calendar",
  },
  {
    icon: "📅",
    label: "AIA GE Calendar",
    href: "https://calendar.google.com/calendar/u/3?cid=Y180YjE3Y2YyZDE1YjkxMDliMDA0YzRkNmQ4NGNlODcxN2M3ZjVhOTEwNThjODYxMTgxODEwNmQ0NTc1YWM3MTg0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
    note: "Add to your Google Calendar",
  },
];

const forms: Resource[] = [
  {
    icon: "📝",
    label: "Public Booking Form",
    href: "/book",
    note: "Share this link with external clients",
  },
];

const guides: Resource[] = [
  {
    icon: "✅",
    label: "Event Checklist",
    href: "/checklist",
    note: "Interactive run-of-show checklist by phase",
  },
];

export default async function ResourcesPage() {
  const isAdmin = await isAdminAuthed();
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
            Quick Access
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Resources</h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
            Templates, forms, calendars, and shareable links — all in one place.
          </p>
        </div>
      </div>

      {/* Guides — admin only */}
      {isAdmin && (
        <>
          <SectionHeader
            eyebrow="Run an Event"
            title="Guides"
            subtitle="Step-by-step interactive checklist."
          />
          <ResourceGrid items={guides} className="mb-10" />
        </>
      )}

      {/* Wi-Fi quick info */}
      <SectionHeader eyebrow="Hall Info" title="Wi-Fi" />
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div className="flex items-center gap-2">
          <span className="text-xl">📶</span>
          <p className="text-sm font-bold text-gray-900">Hall Wi-Fi</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 flex-1">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-0.5">
              Network
            </p>
            <CopyableValue
              value="AIM.BIG_Guest"
              type="text"
              className="text-sm font-medium text-gray-900"
            />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-0.5">
              Password
            </p>
            <CopyableValue
              value="ai888888"
              type="text"
              className="text-sm font-medium text-gray-900 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Templates */}
      <SectionHeader
        eyebrow="Documents"
        title="Templates & Forms"
        subtitle="Open in a new tab — make a copy or fill in directly."
      />
      <ResourceGrid items={templates} className="mb-10" />

      {/* Calendars */}
      <SectionHeader
        eyebrow="Schedules"
        title="Calendars"
        subtitle="Subscribe in Google Calendar to see all FD / AIA GE events alongside your own."
      />
      <ResourceGrid items={calendars} className="mb-10" />

      {/* Booking forms */}
      <SectionHeader
        eyebrow="Forms"
        title="Booking Form"
        subtitle="The public booking link — copy and share with prospective clients."
      />
      <ResourceGrid items={forms} className="mb-4" />
    </div>
  );
}

function ResourceGrid({
  items,
  className = "",
}: {
  items: Resource[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ${className}`}
    >
      {items.map((r) => (
        <a
          key={r.label}
          href={r.href}
          target={r.href.startsWith("http") ? "_blank" : undefined}
          rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all flex items-start gap-3"
        >
          <span className="text-2xl flex-shrink-0">{r.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700 mb-1">
              {r.label}
            </p>
            {r.note && (
              <p className="text-xs text-gray-500 leading-snug">{r.note}</p>
            )}
          </div>
          <svg
            className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 flex-shrink-0 mt-1"
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
      ))}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-600 mb-1.5">
        {eyebrow}
      </p>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}
