import { Fragment } from "react";

export default function V2ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
          📞 Directory
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacts</h1>
        <p className="text-gray-500">
          Key people and emails for FD event planning. Update with actual phone
          numbers as you have them.
        </p>
      </div>

      {/* Emergency */}
      <div className="bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl p-6 mb-8 shadow-sm">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-rose-100 mb-3">
          🚨 Emergency
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Police", number: "999" },
            { label: "Ambulance / Fire", number: "999" },
            { label: "Building Security", number: "Update" },
          ].map((c) => (
            <div key={c.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3">
              <p className="text-rose-100 text-[10px] uppercase tracking-wide font-semibold">
                {c.label}
              </p>
              <p className="text-white font-bold text-xl mt-1">{c.number}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Approver */}
      <Section label="Approver — Start Here">
        <ContactTable
          contacts={[
            {
              role: "Approver",
              name: "Sharlene",
              phone: "Update",
              email: "Update",
              note: "Identifies project type: company / internal / external",
              tag: { label: "Required", color: "bg-rose-50 text-rose-700" },
            },
          ]}
        />
      </Section>

      {/* Building Management */}
      <Section label="Building Management">
        <ContactTable
          contacts={[
            {
              role: "Mercu KPM Office",
              name: "Building Management",
              phone: "Update",
              email: "mercumkpmoffice@gmail.com",
              note: "Email ≥1 week before for parking, lift, aircond, guest list",
            },
            {
              role: "Security Desk",
              name: "Security Team",
              phone: "Update",
              email: "—",
              note: "Hand printed guest list to them on event day",
            },
          ]}
        />
      </Section>

      {/* PICs */}
      <Section label="Event Day PICs">
        <ContactTable
          contacts={[
            {
              role: "Registration PIC",
              name: "Update",
              phone: "Update",
              email: "Update",
            },
            {
              role: "AV PIC",
              name: "Update",
              phone: "Update",
              email: "Update",
            },
            {
              role: "Cleaner (if required)",
              name: "Update",
              phone: "Update",
              email: "—",
            },
          ]}
        />
      </Section>

      {/* Vendors */}
      <Section label="Vendors">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              category: "🍱 Catering",
              vendors: [
                { name: "Caterer A", phone: "Update" },
                { name: "Caterer B", phone: "Update" },
              ],
            },
            {
              category: "☕ Coffee / Tea",
              vendors: [
                { name: "Vendor A", phone: "Update" },
                { name: "Vendor B", phone: "Update" },
              ],
            },
            {
              category: "🎀 Lanyard / Printing",
              vendors: [
                { name: "Lanyard supplier", phone: "Update" },
                { name: "Name tag printer", phone: "Update" },
              ],
            },
            {
              category: "💳 Credit Card Machine",
              vendors: [{ name: "Bank / merchant", phone: "Update" }],
            },
          ].map((g) => (
            <div
              key={g.category}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <p className="text-sm font-semibold text-gray-800 mb-3">
                {g.category}
              </p>
              <div className="space-y-2">
                {g.vendors.map((v) => (
                  <div
                    key={v.name}
                    className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-gray-700">{v.name}</span>
                    <span className="text-gray-400">{v.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Resources */}
      <Section label="Useful Resources">
        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
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
            <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
          <a
            href="mailto:mercumkpmoffice@gmail.com"
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
          >
            <span className="text-xl">📧</span>
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900">
                Email Mercu KPM Office
              </p>
              <p className="text-xs text-gray-500">
                For parking, lift, aircond, guest list submission
              </p>
            </div>
            <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
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

function ContactTable({
  contacts,
}: {
  contacts: {
    role: string;
    name: string;
    phone: string;
    email: string;
    note?: string;
    tag?: { label: string; color: string };
  }[];
}) {
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
              <Fragment key={c.role}>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-5 font-medium text-gray-900">
                    <span className="flex items-center gap-2">
                      {c.role}
                      {c.tag && (
                        <span
                          className={`text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded ${c.tag.color}`}
                        >
                          {c.tag.label}
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-gray-700">{c.name}</td>
                  <td className="py-3 px-5 text-blue-600">{c.phone}</td>
                  <td className="py-3 px-5 text-gray-600 text-xs">{c.email}</td>
                </tr>
                {c.note && (
                  <tr>
                    <td colSpan={4} className="px-5 pb-3 text-xs text-gray-500 italic">
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
