export default function HallInfoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🏛️ Hall Info & Rules
        </h1>
        <p className="text-gray-600">
          Essential information about the BIG Hall — capacity, layout options,
          available equipment, and policies every organizer must know.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Capacity */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
            <span>👥</span> Capacity
          </h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {[
                ["Theatre / Auditorium", "300 pax"],
                ["Banquet (rounds)", "200 pax"],
                ["Classroom / Seminar", "150 pax"],
                ["Cocktail / Standing", "350 pax"],
                ["Board / U-Shape", "50 pax"],
              ].map(([layout, cap]) => (
                <tr key={layout} className="py-1">
                  <td className="py-2 text-gray-600">{layout}</td>
                  <td className="py-2 font-semibold text-gray-900 text-right">
                    {cap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-red-600 mt-3 font-medium">
            ⚠️ Exceeding capacity is strictly prohibited (fire safety).
          </p>
        </div>

        {/* Dimensions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
            <span>📐</span> Hall Specifications
          </h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              {[
                ["Floor Area", "Update with actual m²"],
                ["Ceiling Height", "Update with actual height"],
                ["Stage Dimensions", "Update with actual size"],
                ["Loading Dock", "Available (notify security)"],
                ["Parking", "Level B2 — notify in advance"],
                ["Access Hours", "7:00 AM – 10:00 PM"],
              ].map(([spec, val]) => (
                <tr key={spec}>
                  <td className="py-2 text-gray-600">{spec}</td>
                  <td className="py-2 font-semibold text-gray-900 text-right">
                    {val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Equipment */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>🎛️</span> Available Equipment
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              category: "AV & Projection",
              items: [
                "Projector (HDMI / USB-C)",
                "Main projector screen",
                "Portable screen (secondary)",
                "PA speaker system",
                "Wireless handheld mic ×2",
                "Wireless lapel mic ×2",
                "Panel table mic ×6",
                "Mixing console",
                "DVD / Blu-ray player",
              ],
            },
            {
              category: "Furniture",
              items: [
                "Round banquet tables",
                "Rectangular tables",
                "Banquet chairs ×300",
                "Podium / Lectern",
                "Stage panels (modular)",
                "Registration counters",
                "High bar stools ×10",
                "Bar counters ×4",
                "Sofa sets (VIP area)",
              ],
            },
            {
              category: "Facilities",
              items: [
                "WiFi (high-speed)",
                "Air-conditioning (central)",
                "Stage lighting (basic)",
                "Spotlight ×4",
                "Extension cords / power strips",
                "Prayer room (nearby)",
                "Changing room",
                "Accessible restrooms",
                "Catering preparation area",
              ],
            },
          ].map((group) => (
            <div key={group.category}>
              <h3 className="font-semibold text-gray-800 text-sm mb-2 uppercase tracking-wide">
                {group.category}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Rules */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <span>📜</span> Hall Rules & Policies
        </h2>
        <div className="space-y-3">
          {[
            {
              icon: "🚫",
              rule: "No food or drinks inside hall",
              detail:
                "F&B must be consumed in the designated catering area only, not inside the main hall.",
            },
            {
              icon: "🚬",
              rule: "Strictly no smoking",
              detail: "Entire premises is non-smoking including outdoor corridors.",
            },
            {
              icon: "🔊",
              rule: "Noise curfew — 9:30 PM",
              detail:
                "All events must end by 9:30 PM. Music and PA system off by 9:45 PM.",
            },
            {
              icon: "📦",
              rule: "Setup window: Day before (after 2 PM)",
              detail:
                "Organizers may set up the day before from 2:00 PM onwards, subject to hall availability.",
            },
            {
              icon: "🏋️",
              rule: "Heavy items via loading dock only",
              detail:
                "All heavy or bulky equipment must use the loading dock. No freight through main entrance.",
            },
            {
              icon: "📸",
              rule: "Photography & filming — notify in advance",
              detail:
                "Professional photography and filming crews must be declared during booking.",
            },
            {
              icon: "💧",
              rule: "Water only at registration desk",
              detail:
                "Only plain water is permitted on tables inside the hall to prevent spills on equipment.",
            },
            {
              icon: "🧹",
              rule: "Hall must be returned to original condition",
              detail:
                "Organizer is responsible for clearing all items. Additional cleaning charges apply for excessive mess.",
            },
            {
              icon: "💰",
              rule: "Damage liability",
              detail:
                "Organizer is fully liable for any damage to hall property, furniture, or equipment caused during the event.",
            },
          ].map((r) => (
            <div
              key={r.rule}
              className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100"
            >
              <span className="text-xl flex-shrink-0">{r.icon}</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{r.rule}</p>
                <p className="text-gray-600 text-sm mt-0.5">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout diagrams placeholder */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="font-bold text-blue-900 text-lg mb-2 flex items-center gap-2">
          <span>🗺️</span> Layout Diagrams
        </h2>
        <p className="text-blue-700 text-sm">
          Layout floor plans are available from the PIC or hall manager upon
          request. Please specify your preferred seating arrangement when
          submitting the event request form.
        </p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Theatre", "Banquet", "Classroom", "Cocktail"].map((layout) => (
            <div
              key={layout}
              className="bg-white border border-blue-200 rounded-lg p-3 text-center"
            >
              <div className="text-2xl mb-1">🪑</div>
              <p className="text-xs font-medium text-blue-800">{layout}</p>
              <p className="text-xs text-blue-500">Request floor plan</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
