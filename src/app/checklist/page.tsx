import { notFound } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin";
import ChecklistClient from "./ChecklistClient";

export const metadata = { title: "Event Checklist" };
export const dynamic = "force-dynamic";

export default async function ChecklistPage() {
  const isAdmin = await isAdminAuthed();
  if (!isAdmin) notFound();
  return <ChecklistClient />;
}
