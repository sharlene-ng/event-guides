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

export const headerGradients: Record<EventColor, string> = {
  red:     "from-red-500 via-red-600 to-rose-700",
  orange:  "from-orange-400 via-orange-500 to-amber-600",
  amber:   "from-amber-400 via-amber-500 to-yellow-600",
  yellow:  "from-yellow-400 via-yellow-500 to-amber-600",
  lime:    "from-lime-400 via-lime-500 to-green-600",
  emerald: "from-emerald-500 via-emerald-600 to-teal-700",
  teal:    "from-teal-500 via-teal-600 to-cyan-700",
  cyan:    "from-cyan-500 via-cyan-600 to-sky-700",
  sky:     "from-sky-500 via-sky-600 to-blue-700",
  blue:    "from-blue-500 via-blue-600 to-indigo-700",
  indigo:  "from-indigo-500 via-indigo-600 to-violet-700",
  violet:  "from-violet-500 via-violet-600 to-purple-700",
  purple:  "from-purple-500 via-purple-600 to-violet-700",
  pink:    "from-pink-500 via-pink-600 to-rose-700",
  rose:    "from-rose-500 via-rose-600 to-pink-700",
  slate:   "from-slate-600 via-slate-700 to-gray-800",
};

export function getColorBar(color?: string): string {
  return (
    EVENT_COLORS.find((c) => c.value === color)?.bar ||
    EVENT_COLORS.find((c) => c.value === DEFAULT_COLOR)!.bar
  );
}
