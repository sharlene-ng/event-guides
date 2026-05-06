import { Fragment } from "react";
import { listContacts, type Contact } from "@/lib/sheets";
import CopyableValue from "@/components/CopyableValue";
import EmergencyCard from "@/components/EmergencyCard";
import BookingFormResource from "@/components/BookingFormResource";

export const dynamic = "force-dynamic";

const sectionConfig: Record<
  string,
  { label: string; icon: string; type: "table" | "vendors" }
> = {
  approver: { label: "Approver — Start Here", icon: "⭐", type: "table" },
  coordinator: { label: "Vendor Coordinators", icon: "🤝", type: "table" },
  building: { label: "Building Management", icon: "🏗️", type: "table" },
  pic: { label: "Event Day PICs", icon: "👥", type: "table" },
  "vendor-wireman": { label: "⚡ Wireman / Electrical", icon: "⚡", type: "vendors" },
  "vendor-av": { label: "🎤 AV System", icon: "🎤", type: "vendors" },
  "vendor-internet": { label: "📡 Internet", icon: "📡", type: "vendors" },
  "vendor-catering": { label: "🍱 Catering", icon: "🍱", type: "vendors" },
  "vendor-coffee": { label: "☕ Coffee / Tea", icon: "☕", type: "vendors" },
  "vendor-lanyard": { label: "🎀 Lanyard / Printing", icon: "🎀", type: "vendors" },
  "vendor-cc": { label: "💳 Credit Card Machine", icon: "💳", type: "vendors" },
};

function groupBySection(contacts: Contact[]): Record<string, Contact[]> {
  const sorted = [...contacts].sort((a, b) =>
    (a.order || "").localeCompare(b.order || ""),
  );
  return sorted.reduce<Record<string, Contact[]>>((acc, c) => {
    if (!acc[c.section]) acc[c.section] = [];
    acc[c.section].push(c);
    return acc;
  }, {});
}

export default async function V2ContactsPage() {
  let contacts: Contact[] = [];
  let backendError: string | null = null;
  try {
    contacts = await listContacts();
  } catch (err) {
    backendError = String(err);
  }
  const grouped = groupBySection(contacts);
  const emergency = grouped["emergency"] || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
          📞 Directory
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacts</h1>
        <p className="text-gray-500">
          Edit any cell in the{" "}
          <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-sm font-mono">
            Contacts
          </span>{" "}
          tab in Google Sheets — this page updates automatically.
        </p>
      </div>

      {backendError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-lg mb-6">
          ⚠ Could not load contacts: {backendError}
        </div>
      )}

      {/* Emergency */}
      {emergency.length > 0 && (
        <div className="bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl p-6 mb-8 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-rose-100 mb-3">
            🚨 Emergency
          </p>
          <div
            className={`grid gap-3 ${emergency.length >= 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}
          >
            {emergency.map((c) => (
              <EmergencyCard
                key={c.role + c.phone}
                role={c.role}
                phone={c.phone}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tabular sections */}
      {Object.entries(sectionConfig)
        .filter(([, cfg]) => cfg.type === "table")
        .map(([key, cfg]) => {
          const rows = grouped[key];
          if (!rows || !rows.length) return null;
          return (
            <Section key={key} label={cfg.label}>
              <ContactTable contacts={rows} />
            </Section>
          );
        })}

      {/* Vendors grid */}
      {Object.entries(sectionConfig).some(
        ([key, cfg]) => cfg.type === "vendors" && grouped[key]?.length,
      ) && (
        <Section label="Vendors">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(sectionConfig)
              .filter(([, cfg]) => cfg.type === "vendors")
              .map(([key, cfg]) => {
                const rows = grouped[key];
                if (!rows || !rows.length) return null;
                return (
                  <div
                    key={key}
                    className="bg-white border border-gray-200 rounded-xl p-4"
                  >
                    <p className="text-sm font-semibold text-gray-800 mb-3">
                      {cfg.label}
                    </p>
                    <div className="space-y-2">
                      {rows.map((v) => (
                        <div
                          key={v.role + v.phone}
                          className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0 gap-2"
                        >
                          <span className="text-gray-700 truncate">{v.role}</span>
                          <CopyableValue
                            value={v.phone}
                            type="phone"
                            className="text-gray-500 text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </Section>
      )}

      {/* Resources (kept hardcoded — relevant links, not contacts) */}
      <Section label="Useful Resources">
        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
          <BookingFormResource />
          <a
            href="https://docs.google.com/spreadsheets/d/15HHNs5L_sAbXqrSrjggBdHFgLqnHuz_uv9SttKZ7avo/copy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
          >
            <span className="text-xl">📄</span>
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900">
                Guest List Template (Google Sheet)
              </p>
              <p className="text-xs text-gray-500">
                Make a copy for each event
              </p>
            </div>
            <svg
              className="w-4 h-4 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </Section>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
        {label}
      </p>
      {children}
    </section>
  );
}

function ContactTable({ contacts }: { contacts: Contact[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left py-2.5 px-5 text-[10px] uppercase tracking-wide text-gray-500 font-semibold">
                Role
              </th>
              <th className="text-left py-2.5 px-5 text-[10px] uppercase tracking-wide text-gray-500 font-semibold">
                Name
              </th>
              <th className="text-left py-2.5 px-5 text-[10px] uppercase tracking-wide text-gray-500 font-semibold">
                Phone
              </th>
              <th className="text-left py-2.5 px-5 text-[10px] uppercase tracking-wide text-gray-500 font-semibold">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contacts.map((c) => (
              <Fragment key={c.role + c.phone}>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-5 font-medium text-gray-900">
                    {c.role}
                  </td>
                  <td className="py-3 px-5 text-gray-700">{c.name || "—"}</td>
                  <td className="py-3 px-5">
                    <CopyableValue
                      value={c.phone}
                      type="phone"
                      className="text-blue-600 font-medium"
                    />
                  </td>
                  <td className="py-3 px-5 text-xs">
                    <CopyableValue value={c.email} type="email" className="text-gray-600" />
                  </td>
                </tr>
                {c.note && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 pb-3 text-xs text-gray-500 italic"
                    >
                      ↳ {c.note}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
