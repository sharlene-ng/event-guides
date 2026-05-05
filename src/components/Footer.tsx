"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/book") return null;
  return (
    <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
      BIG Hall Event Wiki · Internal Use Only
    </footer>
  );
}
