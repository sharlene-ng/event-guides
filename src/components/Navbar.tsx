"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Event Calendar" },
  { href: "/sop", label: "Event Playbook" },
  { href: "/checklist", label: "Checklist" },
  { href: "/contacts", label: "Key Contacts" },
  { href: "/resources", label: "Resources" },
  { href: "/office-tools", label: "Office Tools" },
  { href: "/rate-card", label: "Rate Card" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/book") return;
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => setIsAdmin(!!d.admin))
      .catch(() => {});
  }, [pathname]);

  // Hide navbar on login + public booking form
  if (pathname === "/login" || pathname === "/book") return null;

  async function handleLogout() {
    if (isAdmin) await fetch("/api/admin/login", { method: "DELETE" });
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12h3l3-9 6 18 3-9h3" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm text-gray-900">BIG Hall</span>
              <span className="text-[11px] text-gray-500">Event Wiki</span>
            </div>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/submit"
              className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-blue-700"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Event
            </Link>

            {isAdmin ? (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 px-2.5 py-1.5 rounded-md transition-colors"
                title="You are signed in as Admin · click for approval panel"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Admin
              </Link>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-md"
                title="Read-only access — sign in as Admin to make changes"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                Team
              </span>
            )}
            {!isAdmin && (
              <Link
                href="/admin"
                className="text-xs text-gray-400 hover:text-amber-700"
                title="Sign in as Admin"
              >
                🔐
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="text-xs text-gray-400 hover:text-gray-700"
              title="Sign out"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
