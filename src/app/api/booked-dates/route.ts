import { NextResponse } from "next/server";
import { listEvents } from "@/lib/sheets";

export async function GET() {
  try {
    const events = await listEvents("approved");
    const ranges = events.map((e) => ({
      start: String(e.date),
      end: String(e.endDate || e.date),
      name: String(e.name || ""),
    }));
    return NextResponse.json({ ok: true, ranges });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
