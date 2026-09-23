import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin";
import { listReserved } from "@/lib/sheets";
import ReservedClient from "./ReservedClient";

export const dynamic = "force-dynamic";

export default async function ReservedAdminPage() {
  if (!(await isAdminAuthed())) {
    redirect("/login?redirect=/admin/reserved");
  }

  let reserved;
  try {
    reserved = await listReserved();
  } catch (err) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-6">
          <p className="text-rose-700 font-semibold">Could not load reserved dates</p>
          <p className="text-rose-600 text-sm mt-1">{String(err)}</p>
        </div>
      </div>
    );
  }

  return <ReservedClient initial={reserved} />;
}
