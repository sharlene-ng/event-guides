"use client";

import { useState } from "react";

export default function EmergencyCard({
  role,
  phone,
}: {
  role: string;
  phone: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    if (!phone || phone === "—") return;
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-left hover:bg-white/20 transition-colors group"
    >
      <p className="text-rose-100 text-[10px] uppercase tracking-wide font-semibold">
        {role}
      </p>
      <p className="text-white font-bold text-xl mt-1">
        {copied ? "Copied!" : phone || "—"}
      </p>
      <p className="text-rose-100/60 text-[10px] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        click to copy
      </p>
    </button>
  );
}
