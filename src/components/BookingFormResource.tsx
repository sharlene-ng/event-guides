"use client";

import { useState } from "react";

export default function BookingFormResource() {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/book`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <a
      href="/book"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 group"
    >
      <span className="text-xl">📋</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-gray-900">
          Booking Confirmation Form
        </p>
        <p className="text-xs text-gray-500 truncate">
          Public form — share with external organizers
        </p>
      </div>
      <button
        onClick={handleCopy}
        className="text-xs font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 flex-shrink-0"
        title="Copy link"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
      <svg
        className="w-4 h-4 text-gray-300 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </a>
  );
}
