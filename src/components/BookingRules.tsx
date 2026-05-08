type Rule = { lead: string; body: string };

const rules: Rule[] = [
  {
    lead: "Check availability first",
    body: "review the BIG Hall calendar before committing to a date.",
  },
  {
    lead: "Submit a booking request",
    body: "the date isn't yours until Sharlene approves it.",
  },
  {
    lead: "Confirmation status matters",
    body: "a booking is only confirmed once it appears in this booking system calendar.",
  },
  {
    lead: "Google Calendar ≠ booking",
    body: "logging the event in Google Calendar (FD / AIA GE) does NOT reserve the hall. It must go through the booking system.",
  },
];

export default function BookingRules({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group bg-white border border-gray-200 rounded-2xl mb-6"
    >
      <summary className="flex items-center justify-between gap-3 px-5 py-3 cursor-pointer list-none select-none">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-base flex-shrink-0">📋</span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-600">
              Booking Rules
            </p>
            <p className="text-sm font-bold text-gray-900 leading-tight">
              Overview · the basics before you book
            </p>
          </div>
        </div>
        <svg
          className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>

      <ol className="border-t border-gray-100 divide-y divide-gray-100">
        {rules.map((rule, i) => (
          <li key={i} className="flex items-start gap-4 px-5 py-3.5">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center">
              {i + 1}
            </span>
            <p className="text-sm text-gray-700 leading-relaxed pt-0.5">
              <span className="font-semibold text-gray-900">{rule.lead}</span>
              <span className="text-gray-500"> — </span>
              {rule.body}
            </p>
          </li>
        ))}
      </ol>
    </details>
  );
}
