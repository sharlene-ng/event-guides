import { NextResponse } from "next/server";
import { listContacts } from "@/lib/sheets";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section");
    const all = await listContacts();
    const filtered = section ? all.filter((c) => c.section === section) : all;
    return NextResponse.json({ ok: true, contacts: filtered });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
