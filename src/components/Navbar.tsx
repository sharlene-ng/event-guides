"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";

const links = [
  { href: "/", label: "Calendar" },
  { href: "/sop", label: "Playbook" },
  { href: "/contacts", label: "Key Contacts" },
  { href: "/resources", label: "Resources" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/admin/login" || pathname === "/book") return;
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => setIsAdmin(!!d.admin))
      .catch(() => {});
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/admin/login" || pathname === "/book") return;
    fetch("/api/events")
      .then((r) => r.json())
      .then((d) => {
        const n = (d.events || []).filter(
          (e: { status?: string }) => e.status === "pending",
        ).length;
        setPendingCount(n);
      })
      .catch(() => {});
  }, [pathname]);

  // Hide navbar on login + public booking form
  if (pathname === "/login" || pathname === "/admin/login" || pathname === "/book") return null;

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
              let active = false;
              if (link.href === "/") active = pathname === "/";
              else if (link.href === "/resources")
                active = pathname.startsWith("/resources") || pathname.startsWith("/checklist");
              else active = pathname.startsWith(link.href);
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
            {isAdmin && (
              <Link
                href="/admin"
                className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  pathname.startsWith("/admin")
                    ? "bg-amber-50 text-amber-700"
                    : "text-amber-700 hover:bg-amber-50"
                }`}
              >
                Approvals
                {pendingCount > 0 && (
                  <span className="inline-flex items-center justify-center text-[10px] font-bold rounded-full px-1.5 py-0.5 bg-red-500 text-white">
                    {pendingCount}
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* Search */}
          <SearchBar />

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/submit"
              className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-blue-700"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Request Booking
            </Link>

            {isAdmin ? (
              <Link
                href="/admin"
                className="relative inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-yellow-100 hover:bg-yellow-200 border border-yellow-200 px-2.5 py-1.5 rounded-md transition-colors"
                title="You are signed in as Admin · click for approval panel"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Admin
                {pendingCount > 0 && (
                  <>
                    <span className="ml-0.5 inline-flex items-center justify-center text-[10px] font-bold rounded-full px-1.5 py-0.5 bg-red-500 text-white">
                      {pendingCount}
                    </span>
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    </span>
                  </>
                )}
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="relative inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-md transition-colors"
                title="Sign in as Admin"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Admin Login
                {pendingCount > 0 && (
                  <>
                    <span className="ml-0.5 inline-flex items-center justify-center text-[10px] font-bold rounded-full px-1.5 py-0.5 bg-red-500 text-white">
                      {pendingCount}
                    </span>
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    </span>
                  </>
                )}
              </Link>
            )}

            {isAdmin && (
              <button
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-gray-700"
                title="Sign out of admin"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
