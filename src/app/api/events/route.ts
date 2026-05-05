import { NextRequest, NextResponse } from "next/server";
import {
  createEvent,
  listEvents,
  uploadPoster,
  type EventStatus,
} from "@/lib/sheets";

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

    const required = ["name", "date", "organizer", "layout"];
    for (const f of required) {
      if (!body[f]) {
        return NextResponse.json(
          { ok: false, error: `Missing field: ${f}` },
          { status: 400 },
        );
      }
    }

    // If a poster image was attached, upload to Drive first
    if (body.poster && body.poster.base64) {
      try {
        const upload = await uploadPoster({
          base64: body.poster.base64,
          filename: body.poster.filename || "poster.jpg",
          mimeType: body.poster.mimeType || "image/jpeg",
        });
        body.posterUrl = upload.posterUrl;
        body.posterViewUrl = upload.posterViewUrl;
      } catch (err) {
        console.error("Poster upload failed:", err);
      }
      delete body.poster;
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
