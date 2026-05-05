"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const v1Links = [
  { href: "/", label: "Home" },
  { href: "/sop", label: "Full SOP" },
  { href: "/checklist", label: "Checklists" },
  { href: "/hall-info", label: "Hall Info" },
  { href: "/contacts", label: "Contacts" },
];

const v2Links = [
  { href: "/v2", label: "Home" },
  { href: "/v2/sop", label: "Full SOP" },
  { href: "/v2/checklist", label: "Event Day" },
  { href: "/v2/hall-rules", label: "Hall Rules" },
  { href: "/v2/contacts", label: "Contacts" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isV2 = pathname.startsWith("/v2");
  const links = isV2 ? v2Links : v1Links;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={isV2 ? "/v2" : "/"} className="flex items-center gap-2">
            <span className="text-2xl">{isV2 ? "📅" : "🏛️"}</span>
            <span className="font-bold text-lg text-gray-900">
              {isV2 ? "FD Event Planning" : "BIG Hall SOP"}
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Version toggle */}
          <div className="flex bg-gray-100 rounded-md p-0.5 ml-4">
            <Link
              href="/"
              className={`px-2 py-1 text-xs font-semibold rounded ${
                !isV2 ? "bg-white text-gray-900 shadow" : "text-gray-500"
              }`}
            >
              v1
            </Link>
            <Link
              href="/v2"
              className={`px-2 py-1 text-xs font-semibold rounded ${
                isV2 ? "bg-white text-gray-900 shadow" : "text-gray-500"
              }`}
            >
              v2
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
