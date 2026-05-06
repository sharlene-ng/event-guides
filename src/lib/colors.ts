// Calendar event color palette — subtle pastel tones
export type EventColor =
  | "blue"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "sky"
  | "teal"
  | "slate";

export const EVENT_COLORS: { value: EventColor; label: string; swatch: string; bar: string }[] = [
  {
    value: "blue",
    label: "Blue",
    swatch: "bg-blue-200 border-blue-400",
    bar: "bg-blue-200 text-blue-900 hover:bg-blue-300 border-blue-300",
  },
  {
    value: "emerald",
    label: "Green",
    swatch: "bg-emerald-200 border-emerald-400",
    bar: "bg-emerald-200 text-emerald-900 hover:bg-emerald-300 border-emerald-300",
  },
  {
    value: "amber",
    label: "Amber",
    swatch: "bg-amber-200 border-amber-400",
    bar: "bg-amber-200 text-amber-900 hover:bg-amber-300 border-amber-300",
  },
  {
    value: "rose",
    label: "Rose",
    swatch: "bg-rose-200 border-rose-400",
    bar: "bg-rose-200 text-rose-900 hover:bg-rose-300 border-rose-300",
  },
  {
    value: "violet",
    label: "Violet",
    swatch: "bg-violet-200 border-violet-400",
    bar: "bg-violet-200 text-violet-900 hover:bg-violet-300 border-violet-300",
  },
  {
    value: "sky",
    label: "Sky",
    swatch: "bg-sky-200 border-sky-400",
    bar: "bg-sky-200 text-sky-900 hover:bg-sky-300 border-sky-300",
  },
  {
    value: "teal",
    label: "Teal",
    swatch: "bg-teal-200 border-teal-400",
    bar: "bg-teal-200 text-teal-900 hover:bg-teal-300 border-teal-300",
  },
  {
    value: "slate",
    label: "Gray",
    swatch: "bg-slate-200 border-slate-400",
    bar: "bg-slate-200 text-slate-900 hover:bg-slate-300 border-slate-300",
  },
];

export const DEFAULT_COLOR: EventColor = "blue";

export function getColorBar(color?: string): string {
  return (
    EVENT_COLORS.find((c) => c.value === color)?.bar ||
    EVENT_COLORS[0].bar
  );
}
