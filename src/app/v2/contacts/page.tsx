import { Fragment } from "react";

export default function V2ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📞 Contacts</h1>
        <p className="text-gray-600">
          Key people and emails for FD event planning. Update this page with
          actual phone numbers as you have them.
        </p>
      </div>

      {/* Emergency banner */}
      <div className="bg-red-600 text-white rounded-xl p-6 mb-8">
        <h2 className="font-bold text-xl mb-3 flex items-center gap-2">
          🚨 Emergency Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Police", number: "999" },
            { label: "Ambulance / Fire", number: "999" },
            { label: "Building Security", number: "Update with actual number" },
          ].map((c) => (
            <div key={c.label} className="bg-red-700 rounded-lg p-3">
              <p className="text-red-200 text-xs uppercase tracking-wide">
                {c.label}
              </p>
              <p className="text-white font-bold text-lg">{c.number}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Approver — Sharlene */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>⭐</span> Approver — Start Here
        </h2>
        <ContactTable
          contacts={[
            {
              role: "Approver",
              name: "Sharlene",
              phone: "Update with number",
              email: "Update with email",
              note: "Identifies project type: company / internal / external",
            },
          ]}
        />
      </div>

      {/* Building Management */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>🏗️</span> Building Management
        </h2>
        <ContactTable
          contacts={[
            {
              role: "Mercu KPM Office",
              name: "Building Management",
              phone: "Update with number",
              email: "mercumkpmoffice@gmail.com",
              note: "Email ≥1 week before for parking, lift, aircond, guest list",
            },
            {
              role: "Security Desk",
              name: "Security Team",
              phone: "Update with number",
              email: "—",
              note: "Hand printed guest list to them on event day",
            },
          ]}
        />
      </div>

      {/* PICs */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>👥</span> Event Day PICs
        </h2>
        <ContactTable
          contacts={[
            {
              role: "Registration PIC",
              name: "Update with name",
              phone: "Update with number",
              email: "Update with email",
            },
            {
              role: "AV PIC",
              name: "Update with name",
              phone: "Update with number",
              email: "Update with email",
            },
            {
              role: "Cleaner (if required)",
              name: "Update with name",
              phone: "Update with number",
              email: "—",
            },
          ]}
        />
      </div>

      {/* Vendors */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>🤝</span> Vendors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              category: "🍱 Catering",
              vendors: [
                { name: "Preferred Caterer A", phone: "Update with number" },
                { name: "Preferred Caterer B", phone: "Update with number" },
              ],
            },
            {
              category: "☕ Coffee / Tea",
              vendors: [
                { name: "Vendor A", phone: "Update with number" },
                { name: "Vendor B", phone: "Update with number" },
              ],
            },
            {
              category: "🎀 Lanyard / Printing",
              vendors: [
                { name: "Lanyard supplier", phone: "Update with number" },
                { name: "Name tag printer", phone: "Update with number" },
              ],
            },
            {
              category: "💳 Credit Card Machine",
              vendors: [
                { name: "Bank / merchant contact", phone: "Update with number" },
              ],
            },
          ].map((group) => (
            <div
              key={group.category}
              className="border border-gray-100 rounded-lg p-4 bg-gray-50"
            >
              <h3 className="font-semibold text-gray-800 text-sm mb-3">
                {group.category}
              </h3>
              <div className="space-y-2">
                {group.vendors.map((v) => (
                  <div
                    key={v.name}
                    className="flex justify-between text-sm border-b border-gray-100 pb-1 last:border-0"
                  >
                    <span className="text-gray-700">{v.name}</span>
                    <span className="text-gray-500">{v.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-yellow-900 text-lg mb-3 flex items-center gap-2">
          <span>📎</span> Useful Resources
        </h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-yellow-700">•</span>
            <a
              href="https://docs.google.com/spreadsheets/d/15HHNs5L_sAbXqrSrjggBdHFgLqnHuz_uv9SttKZ7avo/copy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              Guest List Template (Google Sheet)
            </a>
            <span className="text-yellow-800">— make a copy for each event</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-700">•</span>
            <a
              href="mailto:mercumkpmoffice@gmail.com"
              className="text-blue-600 hover:underline font-medium"
            >
              Email Mercu KPM Office
            </a>
            <span className="text-yellow-800">
              — for parking, lift, aircond, guest list submission
            </span>
          </li>
        </ul>
      </div>

      {/* Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
        <p className="text-yellow-800 text-sm font-medium flex items-start gap-2">
          <span className="text-lg">📝</span>
          <span>
            <strong>Keep this page up to date.</strong> Update phone numbers and
            emails as you confirm them. Outdated contacts cause delays.
          </span>
        </p>
      </div>
    </div>
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
  }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 text-gray-500 font-medium">Role</th>
            <th className="text-left py-2 text-gray-500 font-medium">Name</th>
            <th className="text-left py-2 text-gray-500 font-medium">Phone</th>
            <th className="text-left py-2 text-gray-500 font-medium">Email</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {contacts.map((c) => (
            <Fragment key={c.role}>
              <tr className="hover:bg-gray-50">
                <td className="py-2.5 font-medium text-gray-800">{c.role}</td>
                <td className="py-2.5 text-gray-600">{c.name}</td>
                <td className="py-2.5 text-blue-600">{c.phone}</td>
                <td className="py-2.5 text-gray-600 text-xs">{c.email}</td>
              </tr>
              {c.note && (
                <tr>
                  <td colSpan={4} className="pb-2 pl-1 text-xs text-gray-500 italic">
                    ↳ {c.note}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
