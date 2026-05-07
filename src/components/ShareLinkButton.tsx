"use client";

import { useState } from "react";

export default function ShareLinkButton({
  url,
  label,
  icon = "🔗",
  className = "",
}: {
  url: string;
  label: string;
  icon?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    // Resolve relative URLs to absolute so the share link is usable
    const absolute = url.startsWith("http")
      ? url
      : typeof window !== "undefined"
        ? `${window.location.origin}${url}`
        : url;
    try {
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors text-sm ${className}`}
    >
      <span className="text-base">{icon}</span>
      {copied ? "Link copied!" : label}
      {copied ? (
        <svg
          className="w-3.5 h-3.5"
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
          className="w-3.5 h-3.5 opacity-80"
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
