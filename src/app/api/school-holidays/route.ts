import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createSchoolHoliday, deleteSchoolHoliday, listSchoolHolidays } from "@/lib/sheets";
import { isAdminAuthed } from "@/lib/admin";

export async function GET() {
  try {
    const schoolHolidays = await listSchoolHolidays();
    return NextResponse.json({ ok: true, schoolHolidays });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "Admin auth required" }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (!body.startDate || !body.endDate) {
      return NextResponse.json({ ok: false, error: "Missing startDate or endDate" }, { status: 400 });
    }
    const schoolHoliday = await createSchoolHoliday({ startDate: body.startDate, endDate: body.endDate });
    revalidatePath("/");
    return NextResponse.json({ ok: true, schoolHoliday });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "Admin auth required" }, { status: 401 });
  }
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
    }
    await deleteSchoolHoliday(id);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
