import { isAdminAuthed } from "@/lib/admin";
import { listEvents } from "@/lib/sheets";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminAuthed();

  if (!authed) {
    return <AdminLogin />;
  }

  let events;
  try {
    events = await listEvents();
  } catch (err) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-6">
          <p className="text-rose-700 font-semibold">
            Could not load events from Sheets backend
          </p>
          <p className="text-rose-600 text-sm mt-1">{String(err)}</p>
        </div>
      </div>
    );
  }

  return <AdminPanel initialEvents={events} />;
}
