import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createHoliday, deleteHoliday, listHolidays } from "@/lib/sheets";
import { isAdminAuthed } from "@/lib/admin";

export async function GET() {
  try {
    const holidays = await listHolidays();
    return NextResponse.json({ ok: true, holidays });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json(
      { ok: false, error: "Admin auth required" },
      { status: 401 },
    );
  }
  try {
    const body = await req.json();
    if (!body.date || !body.name) {
      return NextResponse.json(
        { ok: false, error: "Missing date or name" },
        { status: 400 },
      );
    }
    const holiday = await createHoliday({ date: body.date, name: body.name });
    revalidatePath("/");
    return NextResponse.json({ ok: true, holiday });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json(
      { ok: false, error: "Admin auth required" },
      { status: 401 },
    );
  }
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Missing id" },
        { status: 400 },
      );
    }
    await deleteHoliday(id);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
