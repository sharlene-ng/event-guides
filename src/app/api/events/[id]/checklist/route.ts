import { NextResponse } from "next/server";
import { saveChecklist } from "@/lib/sheets";
import { isAdminAuthed } from "@/lib/admin";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json(
      { ok: false, error: "Admin auth required" },
      { status: 401 },
    );
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const event = await saveChecklist(id, body.state || {});
    return NextResponse.json({ ok: true, event });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
