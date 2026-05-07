"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Hit = {
  category: string;
  title: string;
  subtitle?: string;
  href: string;
};

const categoryStyle: Record<string, string> = {
  Event: "bg-blue-50 text-blue-700",
  Contact: "bg-emerald-50 text-emerald-700",
  Checklist: "bg-amber-50 text-amber-700",
  Resource: "bg-violet-50 text-violet-700",
  "Office How-To": "bg-rose-50 text-rose-700",
  Page: "bg-gray-100 text-gray-600",
};

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cmd/Ctrl+K to focus
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside to close
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data.results || []);
        setActiveIdx(0);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q]);

  function go(hit: Hit) {
    setOpen(false);
    setQ("");
    if (hit.href.startsWith("http")) {
      window.open(hit.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(hit.href);
    }
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[activeIdx];
      if (hit) go(hit);
    }
  }

  return (
    <div ref={wrapRef} className="relative flex-1 max-w-md hidden md:block">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => q.length >= 2 && setOpen(true)}
          onKeyDown={onInputKey}
          placeholder="Search events, contacts, checklist…"
          className="w-full pl-9 pr-12 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </div>

      {open && q.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 max-h-[70vh] overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-xs text-gray-500">Searching…</div>
          )}
          {!loading && results.length === 0 && (
            <div className="px-4 py-3 text-xs text-gray-500">
              No matches for &ldquo;{q}&rdquo;
            </div>
          )}
          {!loading && results.length > 0 && (
            <ul>
              {results.map((hit, i) => (
                <li key={`${hit.href}-${i}`}>
                  <button
                    type="button"
                    onClick={() => go(hit)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={`w-full text-left px-4 py-2.5 flex items-start gap-3 border-b border-gray-50 last:border-b-0 ${
                      i === activeIdx ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 ${
                        categoryStyle[hit.category] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {hit.category}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {hit.title}
                      </p>
                      {hit.subtitle && (
                        <p className="text-xs text-gray-500 truncate">
                          {hit.subtitle}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
