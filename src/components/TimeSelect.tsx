"use client";

const TIME_OPTIONS = (() => {
  const opts: { value: string; label: string }[] = [];
  for (let h = 6; h <= 23; h++) {
    for (let m = 0; m < 60; m += 30) {
      const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const ampm = h < 12 ? "AM" : "PM";
      const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
      const label = `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
      opts.push({ value, label });
    }
  }
  return opts;
})();

export default function TimeSelect({
  name,
  label,
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue || ""}
        required={required}
        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 text-sm bg-gray-50 focus:bg-white transition-colors"
      >
        <option value="">Select time…</option>
        {TIME_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
