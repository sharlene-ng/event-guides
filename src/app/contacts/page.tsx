export default function ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📞 Key Contacts
        </h1>
        <p className="text-gray-600">
          Essential contacts for events at the BIG Hall. Update this page with
          actual names and numbers.
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

      {/* Internal contacts */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>🏢</span> Internal Team
        </h2>
        <ContactTable
          contacts={[
            {
              role: "Event PIC (Primary)",
              name: "Update with name",
              phone: "Update with number",
              email: "Update with email",
            },
            {
              role: "Event PIC (Backup)",
              name: "Update with name",
              phone: "Update with number",
              email: "Update with email",
            },
            {
              role: "Facilities Manager",
              name: "Update with name",
              phone: "Update with number",
              email: "Update with email",
            },
            {
              role: "IT / AV Support",
              name: "Update with name",
              phone: "Update with number",
              email: "Update with email",
            },
            {
              role: "Admin / Booking",
              name: "Update with name",
              phone: "Update with number",
              email: "Update with email",
            },
            {
              role: "Finance (Invoice)",
              name: "Update with name",
              phone: "Update with number",
              email: "Update with email",
            },
          ]}
        />
      </div>

      {/* Building management */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>🏗️</span> Building Management
        </h2>
        <ContactTable
          contacts={[
            {
              role: "Building Manager",
              name: "Update with name",
              phone: "Update with number",
              email: "Update with email",
            },
            {
              role: "Security Desk",
              name: "Security Team",
              phone: "Update with number",
              email: "Update with email",
            },
            {
              role: "Maintenance",
              name: "Update with name",
              phone: "Update with number",
              email: "Update with email",
            },
            {
              role: "Parking",
              name: "Update with name",
              phone: "Update with number",
              email: "Update with email",
            },
          ]}
        />
      </div>

      {/* Vendors */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>🤝</span> Approved Vendors
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
              category: "🎛️ AV / Technical",
              vendors: [
                { name: "AV Vendor A", phone: "Update with number" },
                { name: "AV Vendor B", phone: "Update with number" },
              ],
            },
            {
              category: "🌸 Decoration / Florist",
              vendors: [
                { name: "Decoration Vendor A", phone: "Update with number" },
                { name: "Decoration Vendor B", phone: "Update with number" },
              ],
            },
            {
              category: "📸 Photography",
              vendors: [
                { name: "Photographer A", phone: "Update with number" },
                { name: "Photographer B", phone: "Update with number" },
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

      {/* Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
        <p className="text-yellow-800 text-sm font-medium flex items-start gap-2">
          <span className="text-lg">📝</span>
          <span>
            <strong>Keep this page up to date.</strong> Update all contact
            details with actual names and numbers. Outdated contacts can cause
            delays in an emergency. Review quarterly or whenever there is a team
            change.
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
  }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 text-gray-500 font-medium w-1/4">
              Role
            </th>
            <th className="text-left py-2 text-gray-500 font-medium w-1/4">
              Name
            </th>
            <th className="text-left py-2 text-gray-500 font-medium w-1/4">
              Phone
            </th>
            <th className="text-left py-2 text-gray-500 font-medium w-1/4">
              Email
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {contacts.map((c) => (
            <tr key={c.role} className="hover:bg-gray-50">
              <td className="py-2.5 font-medium text-gray-800">{c.role}</td>
              <td className="py-2.5 text-gray-600">{c.name}</td>
              <td className="py-2.5 text-blue-600">{c.phone}</td>
              <td className="py-2.5 text-gray-600 text-xs">{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
