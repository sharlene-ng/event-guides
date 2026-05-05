"use client";

const layouts = [
  {
    value: "theater",
    label: "Theater",
    desc: "Rows facing the front. Best for talks & presentations.",
    diagram: (
      <svg viewBox="0 0 100 70" className="w-full h-full">
        {/* Stage */}
        <rect x="20" y="6" width="60" height="6" rx="1" fill="currentColor" opacity="0.3" />
        <text x="50" y="11" textAnchor="middle" fontSize="3.5" fill="currentColor" opacity="0.7">STAGE</text>
        {/* Rows of dots */}
        {[20, 30, 40, 50, 60].map((y) => (
          <g key={y}>
            {[15, 25, 35, 45, 55, 65, 75, 85].map((x) => (
              <circle key={x} cx={x} cy={y} r="2.2" fill="currentColor" opacity="0.85" />
            ))}
          </g>
        ))}
      </svg>
    ),
  },
  {
    value: "classroom",
    label: "Classroom",
    desc: "Rows of tables with chairs. Great for workshops.",
    diagram: (
      <svg viewBox="0 0 100 70" className="w-full h-full">
        <rect x="20" y="6" width="60" height="6" rx="1" fill="currentColor" opacity="0.3" />
        <text x="50" y="11" textAnchor="middle" fontSize="3.5" fill="currentColor" opacity="0.7">FRONT</text>
        {[22, 38, 54].map((y) => (
          <g key={y}>
            {/* tables */}
            <rect x="12" y={y} width="22" height="4" rx="1" fill="currentColor" opacity="0.4" />
            <rect x="40" y={y} width="22" height="4" rx="1" fill="currentColor" opacity="0.4" />
            <rect x="68" y={y} width="22" height="4" rx="1" fill="currentColor" opacity="0.4" />
            {/* chairs */}
            {[16, 22, 28].map((x) => <circle key={x} cx={x} cy={y + 8} r="2" fill="currentColor" opacity="0.85" />)}
            {[44, 50, 56].map((x) => <circle key={x} cx={x} cy={y + 8} r="2" fill="currentColor" opacity="0.85" />)}
            {[72, 78, 84].map((x) => <circle key={x} cx={x} cy={y + 8} r="2" fill="currentColor" opacity="0.85" />)}
          </g>
        ))}
      </svg>
    ),
  },
  {
    value: "banquet",
    label: "Fishbone",
    desc: "Angled tables pointing toward the stage. Great for dinners.",
    diagram: (
      <svg viewBox="0 0 100 70" className="w-full h-full">
        {/* Stage at top center */}
        <rect x="40" y="6" width="20" height="5" rx="0.5" fill="currentColor" opacity="0.5" />
        {/* Stage chairs (small dots) */}
        <circle cx="46" cy="14" r="1.2" fill="currentColor" opacity="0.6" />
        <circle cx="54" cy="14" r="1.2" fill="currentColor" opacity="0.6" />

        {/* 4 tables in V-shape pointing toward the stage */}
        {[
          { cx: 30, cy: 28, angle: -30 },
          { cx: 70, cy: 28, angle: 30 },
          { cx: 26, cy: 52, angle: -30 },
          { cx: 74, cy: 52, angle: 30 },
        ].map(({ cx, cy, angle }) => {
          const tableW = 18;
          const tableH = 4;
          const rad = (angle * Math.PI) / 180;
          const cos = Math.cos(rad);
          const sin = Math.sin(rad);
          const chairOffset = 3.5;
          const positions = [-0.3, 0, 0.3];
          return (
            <g key={`${cx}-${cy}`}>
              <rect
                x={cx - tableW / 2}
                y={cy - tableH / 2}
                width={tableW}
                height={tableH}
                rx="0.5"
                transform={`rotate(${angle} ${cx} ${cy})`}
                fill="currentColor"
                opacity="0.85"
              />
              {[-1, 1].flatMap((side) =>
                positions.map((t, i) => {
                  const x = cx + t * tableW * cos + side * chairOffset * -sin;
                  const y = cy + t * tableW * sin + side * chairOffset * cos;
                  return (
                    <circle
                      key={`${side}-${i}`}
                      cx={x}
                      cy={y}
                      r="1.3"
                      fill="currentColor"
                      opacity="0.6"
                    />
                  );
                }),
              )}
            </g>
          );
        })}
      </svg>
    ),
  },
];

export default function LayoutPicker({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {layouts.map((l) => (
        <label key={l.value} className="relative cursor-pointer block">
          <input
            type="radio"
            name={name}
            value={l.value}
            defaultChecked={defaultValue === l.value}
            required
            className="peer sr-only"
          />
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white peer-checked:border-blue-500 peer-checked:ring-4 peer-checked:ring-blue-100 hover:border-gray-300 transition-all">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-white p-2 text-blue-600">
              {l.diagram}
            </div>
            <div className="px-3 py-2.5 border-t border-gray-100">
              <p className="font-semibold text-sm text-gray-900 mb-0.5">{l.label}</p>
              <p className="text-xs text-gray-500">{l.desc}</p>
            </div>
          </div>
          {/* Sibling of input — peer-checked works */}
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 items-center justify-center hidden peer-checked:flex shadow-md pointer-events-none">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
        </label>
      ))}
    </div>
  );
}
