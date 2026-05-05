export default function V2HallRulesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🏛️ Hall Rules</h1>
        <p className="text-gray-600">
          Things to remember when using the hall — for organizers and PICs.
        </p>
      </div>

      {/* Building access */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>🚪</span> Building Access
        </h2>
        <div className="space-y-3">
          {[
            {
              icon: "📋",
              rule: "Guest list must reach security",
              detail:
                "Print and pass the guest list to security before guests arrive. Without it, security may not let visitors up.",
            },
            {
              icon: "🆔",
              rule: "NRIC required from each visitor",
              detail:
                "Visitors fill in their NRIC on the guest list at the security counter on arrival.",
            },
            {
              icon: "🛗",
              rule: "Bomba lift for heavy / catering items",
              detail:
                "Catering, equipment, and any bulky items must use the service (Bomba) lift, not the main passenger lift. Book it in advance via email to building management.",
            },
            {
              icon: "🅿️",
              rule: "Reserved parking is subject to availability",
              detail:
                "Always send the date, time, and car plate when requesting parking. Don't promise parking until building management confirms.",
            },
          ].map((r) => (
            <RuleRow key={r.rule} {...r} />
          ))}
        </div>
      </div>

      {/* Email building management */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>📧</span> Booking with Building Management
        </h2>
        <div className="space-y-3">
          {[
            {
              icon: "⏰",
              rule: "Send booking email at least 1 week ahead",
              detail:
                "Email mercumkpmoffice@gmail.com a minimum of one week before the event. Late requests may not be accommodated.",
            },
            {
              icon: "❄️",
              rule: "Aircond is request-based",
              detail:
                "Air-conditioning outside normal hours must be requested in the booking email — it doesn't happen automatically.",
            },
            {
              icon: "📎",
              rule: "Always attach the guest list",
              detail:
                "Use the official Google Sheet template. Include Number, Name, Contact, NRIC field, and Tickbox columns.",
            },
          ].map((r) => (
            <RuleRow key={r.rule} {...r} />
          ))}
        </div>
      </div>

      {/* Event day */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>📍</span> On Event Day
        </h2>
        <div className="space-y-3">
          {[
            {
              icon: "👤",
              rule: "Always have a Registration PIC and AV PIC",
              detail:
                "These two roles must be assigned and on-site. Don't run an event without them.",
            },
            {
              icon: "💳",
              rule: "Standby credit card machines for company & internal events",
              detail:
                "Have credit card machines ready for company and internal projects in case of on-the-spot transactions.",
            },
            {
              icon: "🍽️",
              rule: "Don't forget crew food",
              detail:
                "When ordering catering, plan food for the working crew too — not just attendees.",
            },
            {
              icon: "📺",
              rule: "Lobby TV display + bunting",
              detail:
                "Setup the lobby TV display and place buntings on event day so guests can find the venue easily.",
            },
          ].map((r) => (
            <RuleRow key={r.rule} {...r} />
          ))}
        </div>
      </div>

      {/* Reminders */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2">
          <span>💡</span> Friendly Reminders
        </h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            Approval from Sharlene first — always.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            Update Google Calendar (FD + AIA GE) the moment approval is given.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            Announce in the FD Official Group Chat near the event date.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            Confirm cleaner is needed (not all events require one).
          </li>
        </ul>
      </div>
    </div>
  );
}

function RuleRow({
  icon,
  rule,
  detail,
}: {
  icon: string;
  rule: string;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{rule}</p>
        <p className="text-gray-600 text-sm mt-0.5">{detail}</p>
      </div>
    </div>
  );
}
