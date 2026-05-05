"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const v1Links = [
  { href: "/", label: "Home" },
  { href: "/sop", label: "Full SOP" },
  { href: "/checklist", label: "Checklists" },
  { href: "/hall-info", label: "Hall Info" },
  { href: "/contacts", label: "Contacts" },
];

const v2Links = [
  { href: "/v2", label: "Home" },
  { href: "/v2/pricing", label: "Pricing" },
  { href: "/v2/hall-info", label: "Hall Info" },
  { href: "/v2/hall-rules", label: "Hall Rules" },
  { href: "/v2/sop", label: "Booking Guide" },
  { href: "/v2/checklist", label: "Checklist" },
  { href: "/v2/contacts", label: "Contacts" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isV2 = pathname.startsWith("/v2");
  const links = isV2 ? v2Links : v1Links;

  if (pathname === "/login") return null;

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Brand */}
          <Link href={isV2 ? "/v2" : "/"} className="flex items-center gap-2.5 flex-shrink-0">
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
                (link.href !== "/" &&
                  link.href !== "/v2" &&
                  pathname.startsWith(link.href));
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
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex bg-gray-100 rounded-md p-0.5">
              <Link
                href="/"
                className={`px-2 py-1 text-[11px] font-semibold rounded ${
                  !isV2 ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                v1
              </Link>
              <Link
                href="/v2"
                className={`px-2 py-1 text-[11px] font-semibold rounded ${
                  isV2 ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                v2
              </Link>
            </div>
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
