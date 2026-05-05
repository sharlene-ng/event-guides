import { NextResponse } from "next/server";
import { getEvent } from "@/lib/sheets";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const event = await getEvent(id);
    if (!event) {
      return NextResponse.json(
        { ok: false, error: "Event not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ ok: true, event });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
