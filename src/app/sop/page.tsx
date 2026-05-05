export default function SOPPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📋 Full Standard Operating Procedure
        </h1>
        <p className="text-gray-600">
          Complete step-by-step SOP for managing events at the BIG Hall.
          Applicable to all internal and external events.
        </p>
      </div>

      <div className="space-y-10">
        {/* Section 1 */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-white font-bold text-xl">
              Phase 1 · Booking Confirmation
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Triggered when company or external party confirms event in BIG Hall
            </p>
          </div>
          <div className="p-6 space-y-4">
            <Step
              num="1.1"
              title="Receive Official Confirmation"
              desc="Obtain a written confirmation (email or signed Event Request Form) from the organizer. Verbal requests are NOT sufficient."
              important
            />
            <Step
              num="1.2"
              title="Verify Event Details"
              desc="Confirm the following: Event name & purpose, Date & time (start and end), Expected guest count, Internal team or external client, Any special requirements (AV, catering, VIP guests)."
            />
            <Step
              num="1.3"
              title="Check Hall Availability"
              desc="Cross-check the BIG Hall booking calendar for conflicts. If a conflict exists, immediately notify the organizer and propose alternative dates."
            />
            <Step
              num="1.4"
              title="Log the Booking"
              desc="Record the event in the official hall booking log/system. Include organizer name, contact number, event date, guest count, and confirmation date."
            />
            <Step
              num="1.5"
              title="Send Confirmation Receipt"
              desc="Reply to the organizer with a confirmation email including event details, hall rules summary, setup deadline, and your contact for coordination."
            />
            <Step
              num="1.6"
              title="Assign Event Coordinator"
              desc="Designate an internal person-in-charge (PIC) for this event. The PIC is the main point of contact from confirmation to post-event."
            />
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-green-600 px-6 py-4">
            <h2 className="text-white font-bold text-xl">
              Phase 2 · Pre-Event Preparation (1–2 Weeks Before)
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <Step
              num="2.1"
              title="Venue Walkthrough Meeting"
              desc="Schedule a walkthrough with the organizer to plan the layout, check equipment, and address any special requirements."
            />
            <Step
              num="2.2"
              title="Confirm Layout & Setup"
              desc="Agree on seating arrangement (theatre, banquet, classroom, cocktail), stage or podium requirements, registration/reception area, and projection/screen placement."
            />
            <Step
              num="2.3"
              title="AV & Technical Requirements"
              desc="Confirm microphone type (handheld, lapel, panel), projector/screen needs, laptop connectivity (HDMI/USB-C), internet/WiFi needs, and live streaming or recording."
            />
            <Step
              num="2.4"
              title="Catering & F&B Coordination"
              desc="If food is involved: confirm menu, number of pax, halal/dietary requirements, setup area for catering, and cleanup arrangement post-event."
            />
            <Step
              num="2.5"
              title="Security & Access"
              desc="Arrange security personnel if needed, confirm access cards/passes for organizer team, and notify building management of the event."
            />
            <Step
              num="2.6"
              title="Vendor Access Coordination"
              desc="Notify building security about external vendors (caterers, AV technicians, decorators). Provide a vendor list with names and contact numbers."
            />
            <Step
              num="2.7"
              title="Send Pre-Event Briefing"
              desc="7 days before the event, send the organizer a briefing document with final confirmed details, setup schedule, and PIC contact information."
            />
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-yellow-500 px-6 py-4">
            <h2 className="text-white font-bold text-xl">
              Phase 3 · Day Before Event
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <Step
              num="3.1"
              title="Physical Hall Setup"
              desc="Arrange tables and chairs per confirmed layout. Set up stage, podium, and lectern. Place directional signage and event banners."
            />
            <Step
              num="3.2"
              title="AV & Equipment Testing"
              desc="Test all microphones, projectors, screens, and speaker systems. Test laptop connectivity and run a full slide presentation dry-run. Confirm internet speed and WiFi password."
            />
            <Step
              num="3.3"
              title="Catering Setup Confirmation"
              desc="Confirm caterer arrival time and setup location. Ensure serving tables, utensils, and waste bins are in place."
            />
            <Step
              num="3.4"
              title="Safety Check"
              desc="Check all emergency exit routes are unobstructed. Verify fire extinguisher locations and first aid kit. Confirm maximum capacity is not exceeded by the planned guest count."
            />
            <Step
              num="3.5"
              title="Confirm Staff Roster"
              desc="Confirm event day staff: PIC, AV technician, security, reception/registration staff, and cleaning crew timing."
            />
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-purple-600 px-6 py-4">
            <h2 className="text-white font-bold text-xl">
              Phase 4 · Event Day Operations
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <Step
              num="4.1"
              title="Hall Opening"
              desc="Open hall at least 1 hour before event start. Conduct final walkthrough to ensure everything is in order."
            />
            <Step
              num="4.2"
              title="Welcome Organizer Team"
              desc="Brief organizer team on: emergency exits, toilets, AV operation, hall rules, PIC contact."
            />
            <Step
              num="4.3"
              title="Guest Registration"
              desc="Station a staff member at the registration desk to welcome and register guests. Manage name tags, access lists, and gift/program distribution."
            />
            <Step
              num="4.4"
              title="Ongoing Event Monitoring"
              desc="PIC to remain on-site throughout the event. Monitor AV, catering, crowd levels, and respond to any issues immediately."
            />
            <Step
              num="4.5"
              title="Capacity & Safety Compliance"
              desc="Ensure BIG Hall capacity is not exceeded at any point. If approaching limit, inform organizer to manage guest flow."
              important
            />
            <Step
              num="4.6"
              title="Incident Management"
              desc="For any incident: assess severity, administer first aid if needed, contact emergency services if required, log the incident. See contacts page for emergency numbers."
            />
            <Step
              num="4.7"
              title="Catering Service"
              desc="Coordinate catering service timing with event flow. Ensure no service interruption during speeches or presentations."
            />
          </div>
        </section>

        {/* Section 5 */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-red-600 px-6 py-4">
            <h2 className="text-white font-bold text-xl">
              Phase 5 · Post-Event Wrap-Up
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <Step
              num="5.1"
              title="Event Close"
              desc="Signal to organizer 15 minutes before official end time. Assist in wrapping up and directing guests to exits."
            />
            <Step
              num="5.2"
              title="Damage Inspection"
              desc="Walk through the hall with the organizer to inspect for damage. Document any damage with photos. Organizer must acknowledge and sign the inspection form."
              important
            />
            <Step
              num="5.3"
              title="Hall Clearing & Cleaning"
              desc="Remove all organizer items, banners, and signage. Cleaning crew to sweep, mop, vacuum, and sanitize the hall. Return furniture to default layout."
            />
            <Step
              num="5.4"
              title="Equipment Return"
              desc="Collect all AV equipment, extension cords, and accessories. Verify all items are accounted for and undamaged."
            />
            <Step
              num="5.5"
              title="Update Booking Log"
              desc="Mark the event as completed in the booking system. Note any issues, incidents, or damage claims."
            />
            <Step
              num="5.6"
              title="Post-Event Report"
              desc="PIC to prepare a brief post-event report within 2 business days covering: guest count, event flow, incidents, damage, and recommendations."
            />
            <Step
              num="5.7"
              title="Invoice (if applicable)"
              desc="For external events, raise an invoice for hall rental, equipment, or damage charges within 3 business days."
            />
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
        important
          ? "bg-red-50 border-red-200"
          : "bg-gray-50 border-gray-100"
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
        <p className={`font-semibold ${important ? "text-red-800" : "text-gray-900"}`}>
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
