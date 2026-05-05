import { NextRequest, NextResponse } from "next/server";

async function expectedHash(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Tiny in-memory rate limit per IP (good enough for a small SOP site)
const attempts = new Map<string, { count: number; firstTry: number }>();
const WINDOW_MS = 60_000; // 1 minute window
const MAX_ATTEMPTS = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.firstTry > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstTry: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(req: NextRequest) {
  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) {
    return NextResponse.json(
      { ok: false, error: "Password not configured on server" },
      { status: 500 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in 1 minute." },
      { status: 429 },
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (body.password !== sitePassword) {
    return NextResponse.json(
      { ok: false, error: "Wrong password" },
      { status: 401 },
    );
  }

  const hash = await expectedHash(sitePassword);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("auth", hash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
  return res;
}
