"use client";

// Shared visual constants for all 3 layouts
const STAGE_PROPS = { x: 35, y: 6, width: 30, height: 4, rx: 0.5 };
const TABLE_OPACITY = 0.5;
const CHAIR_OPACITY = 0.7;
const CHAIR_R = 1.4;

function Stage() {
  return (
    <>
      <rect
        {...STAGE_PROPS}
        fill="currentColor"
        opacity="0.4"
      />
      <text
        x="50"
        y="9.5"
        textAnchor="middle"
        fontSize="2.5"
        fill="currentColor"
        opacity="0.7"
        fontWeight="600"
      >
        STAGE
      </text>
    </>
  );
}

const layouts = [
  {
    value: "theater",
    label: "Theater",
    desc: "Rows facing the front. Best for talks & presentations.",
    diagram: (
      <svg viewBox="0 0 100 70" className="w-full h-full">
        <Stage />
        {/* 5 rows × 8 chairs facing the stage */}
        {[22, 32, 42, 52, 62].map((y) =>
          [16, 26, 36, 46, 56, 66, 76, 84].map((x) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={1.7}
              fill="currentColor"
              opacity={CHAIR_OPACITY + 0.15}
            />
          )),
        )}
      </svg>
    ),
  },
  {
    value: "classroom",
    label: "Classroom",
    desc: "Rows of tables with chairs. Great for workshops.",
    diagram: (
      <svg viewBox="0 0 100 70" className="w-full h-full">
        <Stage />
        {[20, 38, 56].map((y) =>
          [10, 39, 68].map((x) => (
            <g key={`${x}-${y}`}>
              <rect
                x={x}
                y={y}
                width={22}
                height={4}
                rx={0.5}
                fill="currentColor"
                opacity={TABLE_OPACITY}
              />
              {[x + 4, x + 11, x + 18].map((cx) => (
                <circle
                  key={cx}
                  cx={cx}
                  cy={y + 8}
                  r={CHAIR_R}
                  fill="currentColor"
                  opacity={CHAIR_OPACITY}
                />
              ))}
            </g>
          )),
        )}
      </svg>
    ),
  },
  {
    value: "banquet",
    label: "Fishbone",
    desc: "Angled tables pointing toward the stage. Great for dinners.",
    diagram: (
      <svg viewBox="0 0 100 70" className="w-full h-full">
        <Stage />
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
                rx={0.5}
                transform={`rotate(${angle} ${cx} ${cy})`}
                fill="currentColor"
                opacity={TABLE_OPACITY}
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
                      r={CHAIR_R}
                      fill="currentColor"
                      opacity={CHAIR_OPACITY}
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
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 items-center justify-center hidden peer-checked:flex shadow-md pointer-events-none">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </label>
      ))}
    </div>
  );
}
