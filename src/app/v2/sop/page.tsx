export default function V2SOPPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📋 FD Event Planning SOP
        </h1>
        <p className="text-gray-600">
          The full step-by-step guide — from getting approval to wrapping up the
          event day.
        </p>
      </div>

      <div className="space-y-10">
        {/* Phase 1 */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-white font-bold text-xl">
              Phase 1 · Approval & Calendar
            </h2>
            <p className="text-blue-100 text-sm mt-1">Start here</p>
          </div>
          <div className="p-6 space-y-4">
            <Step
              num="1.1"
              title="Get approval from Sharlene"
              desc="Sharlene identifies whether it's a company, internal, or external (chargeable) project. Don't proceed without her confirmation."
              important
            />
            <Step
              num="1.2"
              title="Log the event in Google Calendar"
              desc="Add the confirmed event to both calendars: FD Calendar and AIA GE."
            />
            <Step
              num="1.3"
              title="Invite yourself and all PICs"
              desc="Create the calendar event and invite yourself + every Person-In-Charge (registration, AV, etc.) so everyone has it on their schedule."
            />
          </div>
        </section>

        {/* Phase 2 */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-green-600 px-6 py-4">
            <h2 className="text-white font-bold text-xl">
              Phase 2 · Email Building Management
            </h2>
            <p className="text-green-100 text-sm mt-1">
              At least 1 week before the event
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-400 mb-1">Send to:</div>
              <a
                href="mailto:mercumkpmoffice@gmail.com"
                className="text-green-300 hover:underline"
              >
                mercumkpmoffice@gmail.com
              </a>
            </div>

            <p className="text-sm font-semibold text-gray-900 mt-4">
              Email must include:
            </p>
            <Step num="2.1" title="Event name" desc="Clear, full name of the event." />
            <Step
              num="2.2"
              title="Event date & time"
              desc="Start and end times, including setup and teardown windows if applicable."
            />
            <Step num="2.3" title="Estimated pax" desc="Best estimate of attendee count." />
            <Step
              num="2.4"
              title="Guest list (PDF)"
              desc="Columns: Number, Name, Contact Number, NRIC (filled by visitor), Tickbox. Use the official Google Sheet template below."
              important
            />
            <Step
              num="2.5"
              title="Reserved parking (if needed)"
              desc="Date, time, and car plate numbers. Subject to availability — request early."
            />
            <Step
              num="2.6"
              title="Service lift (Bomba lift)"
              desc="Required for catering equipment, heavy boxes, or any large setup."
            />
            <Step
              num="2.7"
              title="Aircond (optional)"
              desc="Mention if you need air-conditioning to be turned on outside normal hours."
            />

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <p className="text-sm font-semibold text-yellow-900 mb-2">
                📄 Guest List Template
              </p>
              <a
                href="https://docs.google.com/spreadsheets/d/15HHNs5L_sAbXqrSrjggBdHFgLqnHuz_uv9SttKZ7avo/copy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-yellow-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
              >
                Make a copy →
              </a>
              <p className="text-xs text-yellow-700 mt-2">
                Opens Google Sheets and prompts you to copy the template into your
                Drive.
              </p>
            </div>
          </div>
        </section>

        {/* Phase 3 */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-purple-600 px-6 py-4">
            <h2 className="text-white font-bold text-xl">
              Phase 3 · Other Prep
            </h2>
            <p className="text-purple-100 text-sm mt-1">Days before the event</p>
          </div>
          <div className="p-6 space-y-4">
            <Step
              num="3.1"
              title="Print guest list and pass to security"
              desc="Hand over the printed guest list to building security so they can verify visitors at entry."
              important
            />
            <Step
              num="3.2"
              title="Reserved parking (optional)"
              desc="Confirm parking allocation with building management if you've requested it."
            />
            <Step
              num="3.3"
              title="Aircond (optional)"
              desc="Confirm aircond schedule with building management."
            />
            <Step
              num="3.4"
              title="Catering / setup needing Bomba lift (optional)"
              desc="Coordinate timing with caterers and confirm Bomba lift access."
            />
          </div>
        </section>

        {/* Phase 4 — Event Day */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-red-600 px-6 py-4">
            <h2 className="text-white font-bold text-xl">
              Phase 4 · Event Day
            </h2>
            <p className="text-red-100 text-sm mt-1">
              Use the interactive checklist to tick items off
            </p>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-6">
              On the day, work through five areas: setup & display, comms,
              people (PICs), refreshments & catering, and other arrangements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  icon: "🎀",
                  title: "Setup & Display",
                  items: [
                    "Lanyard sleeve",
                    "Lanyard strap",
                    "Print lanyard nametag",
                    "Bunting placement",
                    "Lobby TV display",
                    "Event hall layout",
                  ],
                },
                {
                  icon: "📣",
                  title: "Comms",
                  items: [
                    "Event reminder",
                    "Announcement to FD Official Group Chat",
                  ],
                },
                {
                  icon: "👥",
                  title: "People (PICs)",
                  items: [
                    "Registration PIC",
                    "AV PIC",
                    "Cleaner needed?",
                  ],
                },
                {
                  icon: "🍱",
                  title: "Refreshments & Catering",
                  items: [
                    "Food / catering",
                    "Coffee / tea",
                    "Candies, snacks?",
                    "Crew food",
                  ],
                },
                {
                  icon: "💳",
                  title: "Other",
                  items: [
                    "Standby credit card machines (company & internal events)",
                    "Any special arrangements?",
                  ],
                },
              ].map((g) => (
                <div
                  key={g.title}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span>{g.icon}</span> {g.title}
                  </h3>
                  <ul className="space-y-1">
                    {g.items.map((it) => (
                      <li
                        key={it}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-gray-400 mt-0.5">•</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <a
                href="/v2/checklist"
                className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors"
              >
                Open interactive checklist →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Step({
  num,
  title,
  desc,
  important,
}: {
  num: string;
  title: string;
  desc: string;
  important?: boolean;
}) {
  return (
    <div
      className={`flex gap-4 p-4 rounded-lg border ${
        important ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-100"
      }`}
    >
      <span
        className={`font-bold text-sm mt-0.5 w-10 flex-shrink-0 ${
          important ? "text-red-600" : "text-blue-600"
        }`}
      >
        {num}
      </span>
      <div>
        <p
          className={`font-semibold ${important ? "text-red-800" : "text-gray-900"}`}
        >
          {title}
          {important && (
            <span className="ml-2 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
              REQUIRED
            </span>
          )}
        </p>
        <p className="text-sm text-gray-600 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
