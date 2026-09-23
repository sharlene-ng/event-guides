import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createReserved, deleteReserved, listReserved } from "@/lib/sheets";
import { isAdminAuthed } from "@/lib/admin";

export async function GET() {
  try {
    const reserved = await listReserved();
    return NextResponse.json({ ok: true, reserved });
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
    const reserved = await createReserved({
      startDate: body.startDate,
      endDate: body.endDate,
      note: body.note || "",
    });
    revalidatePath("/");
    return NextResponse.json({ ok: true, reserved });
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
    await deleteReserved(id);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
