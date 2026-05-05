"use client";

import { useState } from "react";

export default function CopyableValue({
  value,
  type,
  className,
}: {
  value: string;
  type?: "phone" | "email" | "text";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  if (!value || value === "—" || value === "") {
    return <span className={className || "text-gray-400"}>—</span>;
  }

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: select the text
      const sel = window.getSelection();
      if (sel) sel.selectAllChildren(e.currentTarget as Node);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`group inline-flex items-center gap-1.5 ${className || "text-gray-700"} hover:text-blue-600 transition-colors`}
      title={`Click to copy ${type || ""}`.trim()}
    >
      <span className="truncate">{value}</span>
      {copied ? (
        <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-wide flex-shrink-0">
          Copied!
        </span>
      ) : (
        <svg
          className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}
