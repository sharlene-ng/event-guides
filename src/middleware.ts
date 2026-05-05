import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PREFIXES = [
  "/login",
  "/api/login",
  "/api/logout",
  "/_next",
  "/favicon",
  "/book", // public booking form for outside guests
];

async function expectedHash(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;

  // No password configured — skip protection (useful for first deploy / local dev)
  if (!password) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // Allow login + auth API + Next.js internals + public booking form
  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow POST to /api/events from the public booking form
  if (req.method === "POST" && pathname === "/api/events") {
    return NextResponse.next();
  }

  // Verify auth cookie
  const cookie = req.cookies.get("auth")?.value;
  if (cookie && cookie === (await expectedHash(password))) {
    return NextResponse.next();
  }

  // Redirect to login, preserving intended destination
  const loginUrl = new URL("/login", req.url);
  if (pathname !== "/") loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
