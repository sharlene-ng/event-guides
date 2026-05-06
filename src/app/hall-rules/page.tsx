const sections = [
  {
    title: "Building Access",
    accent: "blue",
    rules: [
      {
        rule: "Guest list must reach security",
        detail:
          "Print and pass the guest list to security before guests arrive. Without it, security may not let visitors up.",
      },
      {
        rule: "NRIC required from each visitor",
        detail:
          "Visitors fill in their NRIC on the guest list at the security counter on arrival.",
      },
      {
        rule: "Bomba lift for heavy / catering items",
        detail:
          "Catering, equipment, and any bulky items must use the service (Bomba) lift, not the main passenger lift. Book in advance via email.",
      },
      {
        rule: "Reserved parking is subject to availability",
        detail:
          "Always send the date, time, and car plate when requesting parking. Don't promise parking until building management confirms.",
      },
    ],
  },
  {
    title: "Booking with Building Management",
    accent: "indigo",
    rules: [
      {
        rule: "Send booking email at least 1 week ahead",
        detail:
          "Email mercumkpmoffice@gmail.com a minimum of one week before the event. Late requests may not be accommodated.",
      },
      {
        rule: "Aircond is request-based",
        detail:
          "Air-conditioning outside normal hours must be requested in the booking email — it doesn't happen automatically.",
      },
      {
        rule: "Always attach the guest list",
        detail:
          "Use the official Google Sheet template. Include Number, Name, Contact, NRIC field, and Tickbox columns.",
      },
    ],
  },
  {
    title: "On Event Day",
    accent: "rose",
    rules: [
      {
        rule: "Always have a Registration PIC and AV PIC",
        detail:
          "These two roles must be assigned and on-site. Don't run an event without them.",
      },
      {
        rule: "Standby credit card machines for company & internal events",
        detail:
          "Have credit card machines ready for company and internal projects in case of on-the-spot transactions.",
      },
      {
        rule: "Don't forget crew food",
        detail:
          "When ordering catering, plan food for the working crew too — not just attendees.",
      },
      {
        rule: "Lobby TV display + bunting",
        detail:
          "Setup the lobby TV display and place buntings on event day so guests can find the venue easily.",
      },
    ],
  },
];

const accentMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
};

export default function V2HallRulesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
          📜 Policies
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hall Rules</h1>
        <p className="text-gray-500">
          Things to remember when using the hall — for organizers and PICs.
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">
              {section.title}
            </p>
            <div className="space-y-3">
              {section.rules.map((r) => (
                <div
                  key={r.rule}
                  className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4"
                >
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${accentMap[section.accent]}`}
                  >
                    !
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {r.rule}
                    </h3>
                    <p className="text-sm text-gray-500">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Friendly reminders */}
      <div className="mt-10 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-blue-700 mb-3">
          Friendly Reminders
        </p>
        <ul className="space-y-2 text-sm text-blue-900">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            Approval from Sharlene first — always.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            Update Google Calendar (FD + AIA GE) the moment approval is given.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            Announce in the FD Official Group Chat near the event date.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            Confirm cleaner is needed (not all events require one).
          </li>
        </ul>
      </div>
    </div>
  );
}
