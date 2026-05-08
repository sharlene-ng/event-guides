import { redirect } from "next/navigation";

// Office How-To content has been merged into /sop (Event Playbook).
// Keep this route as a redirect for backward-compat / bookmarks.
export default function OfficeToolsRedirect() {
  redirect("/sop");
}
