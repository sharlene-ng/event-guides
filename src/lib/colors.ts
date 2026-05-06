// Calendar event color palette — subtle pastel tones
export type EventColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "pink"
  | "rose"
  | "slate";

export const EVENT_COLORS: { value: EventColor; label: string; swatch: string; bar: string }[] = [
  {
    value: "red",
    label: "Red",
    swatch: "bg-red-200 border-red-400",
    bar: "bg-red-200 text-red-900 hover:bg-red-300 border-red-300",
  },
  {
    value: "orange",
    label: "Orange",
    swatch: "bg-orange-200 border-orange-400",
    bar: "bg-orange-200 text-orange-900 hover:bg-orange-300 border-orange-300",
  },
  {
    value: "amber",
    label: "Amber",
    swatch: "bg-amber-200 border-amber-400",
    bar: "bg-amber-200 text-amber-900 hover:bg-amber-300 border-amber-300",
  },
  {
    value: "yellow",
    label: "Yellow",
    swatch: "bg-yellow-200 border-yellow-400",
    bar: "bg-yellow-200 text-yellow-900 hover:bg-yellow-300 border-yellow-300",
  },
  {
    value: "lime",
    label: "Lime",
    swatch: "bg-lime-200 border-lime-400",
    bar: "bg-lime-200 text-lime-900 hover:bg-lime-300 border-lime-300",
  },
  {
    value: "emerald",
    label: "Green",
    swatch: "bg-emerald-200 border-emerald-400",
    bar: "bg-emerald-200 text-emerald-900 hover:bg-emerald-300 border-emerald-300",
  },
  {
    value: "teal",
    label: "Teal",
    swatch: "bg-teal-200 border-teal-400",
    bar: "bg-teal-200 text-teal-900 hover:bg-teal-300 border-teal-300",
  },
  {
    value: "cyan",
    label: "Cyan",
    swatch: "bg-cyan-200 border-cyan-400",
    bar: "bg-cyan-200 text-cyan-900 hover:bg-cyan-300 border-cyan-300",
  },
  {
    value: "sky",
    label: "Sky",
    swatch: "bg-sky-200 border-sky-400",
    bar: "bg-sky-200 text-sky-900 hover:bg-sky-300 border-sky-300",
  },
  {
    value: "blue",
    label: "Blue",
    swatch: "bg-blue-200 border-blue-400",
    bar: "bg-blue-200 text-blue-900 hover:bg-blue-300 border-blue-300",
  },
  {
    value: "indigo",
    label: "Indigo",
    swatch: "bg-indigo-200 border-indigo-400",
    bar: "bg-indigo-200 text-indigo-900 hover:bg-indigo-300 border-indigo-300",
  },
  {
    value: "violet",
    label: "Violet",
    swatch: "bg-violet-200 border-violet-400",
    bar: "bg-violet-200 text-violet-900 hover:bg-violet-300 border-violet-300",
  },
  {
    value: "purple",
    label: "Purple",
    swatch: "bg-purple-200 border-purple-400",
    bar: "bg-purple-200 text-purple-900 hover:bg-purple-300 border-purple-300",
  },
  {
    value: "pink",
    label: "Pink",
    swatch: "bg-pink-200 border-pink-400",
    bar: "bg-pink-200 text-pink-900 hover:bg-pink-300 border-pink-300",
  },
  {
    value: "rose",
    label: "Rose",
    swatch: "bg-rose-200 border-rose-400",
    bar: "bg-rose-200 text-rose-900 hover:bg-rose-300 border-rose-300",
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
    EVENT_COLORS.find((c) => c.value === DEFAULT_COLOR)!.bar
  );
}
