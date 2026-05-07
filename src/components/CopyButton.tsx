"use client";

import { useState } from "react";

export default function CopyButton({
  value,
  className = "",
  size = "sm",
}: {
  value: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  const iconClass = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  const padding = size === "md" ? "p-2" : "p-1.5";

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy"}
      className={`${className} rounded-md ${padding} transition-colors relative`}
    >
      {copied ? (
        <svg
          className={`${iconClass} text-emerald-500`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          className={iconClass}
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
