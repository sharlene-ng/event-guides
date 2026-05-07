import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin";
import { listHolidays } from "@/lib/sheets";
import HolidaysClient from "./HolidaysClient";

export const dynamic = "force-dynamic";

export default async function HolidaysAdminPage() {
  if (!(await isAdminAuthed())) {
    redirect("/login?redirect=/admin/holidays");
  }

  let holidays;
  try {
    holidays = await listHolidays();
  } catch (err) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-6">
          <p className="text-rose-700 font-semibold">
            Could not load holidays
          </p>
          <p className="text-rose-600 text-sm mt-1">{String(err)}</p>
        </div>
      </div>
    );
  }

  return <HolidaysClient initial={holidays} />;
}
