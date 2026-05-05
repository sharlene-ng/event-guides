import { NextRequest, NextResponse } from "next/server";

async function expectedHash(password: string): Promise<string> {
  const data = new TextEncoder().encode("admin:" + password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { ok: false, error: "Admin password not configured" },
      { status: 500 },
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (body.password !== adminPassword) {
    return NextResponse.json(
      { ok: false, error: "Wrong admin password" },
      { status: 401 },
    );
  }

  const hash = await expectedHash(adminPassword);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", hash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", "", { path: "/", maxAge: 0 });
  return res;
}
