import { NextRequest, NextResponse } from "next/server";
import { createEvent, listEvents, type EventStatus } from "@/lib/sheets";

export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get("status") as EventStatus | null;
    const events = await listEvents(status || undefined);
    return NextResponse.json({ ok: true, events });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    const required = ["name", "date", "organizer", "layout", "projectType"];
    for (const f of required) {
      if (!body[f]) {
        return NextResponse.json(
          { ok: false, error: `Missing field: ${f}` },
          { status: 400 },
        );
      }
    }

    const event = await createEvent(body);
    return NextResponse.json({ ok: true, event });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
