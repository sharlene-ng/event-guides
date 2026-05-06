import { NextResponse } from "next/server";
import { listEvents } from "@/lib/sheets";

export async function GET() {
  try {
    const all = await listEvents();
    const ranges = all
      .filter((e) => e.status === "approved" || e.status === "reserved")
      .map((e) => ({
        start: String(e.date),
        end: String(e.endDate || e.date),
        name: String(e.name || ""),
        tentative: e.status === "reserved",
      }));
    return NextResponse.json({ ok: true, ranges });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
