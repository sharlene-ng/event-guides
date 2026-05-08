import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin";
import { listSchoolHolidays } from "@/lib/sheets";
import SchoolHolidaysClient from "./SchoolHolidaysClient";

export const dynamic = "force-dynamic";

export default async function SchoolHolidaysAdminPage() {
  if (!(await isAdminAuthed())) {
    redirect("/login?redirect=/admin/school-holidays");
  }

  let schoolHolidays;
  try {
    schoolHolidays = await listSchoolHolidays();
  } catch (err) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-6">
          <p className="text-rose-700 font-semibold">Could not load school holidays</p>
          <p className="text-rose-600 text-sm mt-1">{String(err)}</p>
        </div>
      </div>
    );
  }

  return <SchoolHolidaysClient initial={schoolHolidays} />;
}
