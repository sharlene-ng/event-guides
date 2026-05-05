import { NextRequest, NextResponse } from "next/server";
import { updateEventStatus } from "@/lib/sheets";
import { isAdminAuthed } from "@/lib/admin";

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json(
      { ok: false, error: "Admin auth required" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    if (!body.id || !body.status) {
      return NextResponse.json(
        { ok: false, error: "Missing id or status" },
        { status: 400 },
      );
    }
    if (!["approved", "rejected", "pending"].includes(body.status)) {
      return NextResponse.json(
        { ok: false, error: "Invalid status" },
        { status: 400 },
      );
    }
    const event = await updateEventStatus(
      body.id,
      body.status,
      body.approvedBy || "Sharlene",
    );
    return NextResponse.json({ ok: true, event });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
