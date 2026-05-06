import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin";

const SHEETS_API_URL = process.env.SHEETS_API_URL;
const SHEETS_API_SECRET = process.env.SHEETS_API_SECRET;

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json(
      { ok: false, error: "Admin auth required" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    if (!body.id || !body.fields || typeof body.fields !== "object") {
      return NextResponse.json(
        { ok: false, error: "Missing id or fields" },
        { status: 400 },
      );
    }

    if (!SHEETS_API_URL || !SHEETS_API_SECRET) {
      return NextResponse.json(
        { ok: false, error: "Sheets backend not configured" },
        { status: 500 },
      );
    }

    const params = new URLSearchParams({
      action: "updateMeta",
      secret: SHEETS_API_SECRET,
    });
    const res = await fetch(`${SHEETS_API_URL}?${params.toString()}`, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ id: body.id, fields: body.fields }),
      redirect: "follow",
      cache: "no-store",
    });
    const data = await res.json();
    if (!data.ok) {
      return NextResponse.json(data, { status: 500 });
    }
    revalidatePath("/");
    return NextResponse.json({ ok: true, event: data.event });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
