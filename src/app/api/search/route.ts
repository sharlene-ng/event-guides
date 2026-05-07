import { NextResponse } from "next/server";
import { listEvents, listContacts } from "@/lib/sheets";
import { allChecklistSections, checklistTabs } from "@/lib/checklistData";

export const dynamic = "force-dynamic";

type Hit = {
  category: "Event" | "Contact" | "Checklist" | "Resource" | "Office How-To" | "Page";
  title: string;
  subtitle?: string;
  href: string;
};

const staticHits: Hit[] = [
  { category: "Page", title: "Calendar", href: "/" },
  { category: "Page", title: "Playbook", href: "/sop" },
  { category: "Page", title: "Key Contacts", href: "/contacts" },
  { category: "Page", title: "Office How-To", href: "/office-tools" },
  { category: "Page", title: "Resources", href: "/resources" },
  { category: "Page", title: "Rate Card", href: "/rate-card" },
  { category: "Page", title: "Event Checklist", href: "/checklist" },
  { category: "Page", title: "Submit Event", href: "/submit" },

  { category: "Resource", title: "Email Template", subtitle: "Building management", href: "https://docs.google.com/document/d/1zItAHHseRnrvc7q1XnJUXgrhX9Ad1O01svnQ9dCAhD8/edit?usp=sharing" },
  { category: "Resource", title: "Guest List Template", subtitle: "Per-event sheet", href: "https://docs.google.com/spreadsheets/d/15HHNs5L_sAbXqrSrjggBdHFgLqnHuz_uv9SttKZ7avo/copy" },
  { category: "Resource", title: "Bomba Lift Application Form", subtitle: "Submit ≥1 day before", href: "https://drive.google.com/file/d/1Xto8QCFOFousJsSSUZXN-YXfDWrr84EM/view?usp=sharing" },
  { category: "Resource", title: "FD Calendar", subtitle: "Google Calendar feed", href: "https://calendar.google.com/calendar/u/3?cid=Y18zM2RhNWU2NDY4Mzk1Mzg3NDJiOGQ1MDFiZDZkODM4OWY2ZWU2NDQzNTkzMjdiZDgwZjJiODU5MDM5NDI4ZmU2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20" },
  { category: "Resource", title: "AIA GE Calendar", subtitle: "Google Calendar feed", href: "https://calendar.google.com/calendar/u/3?cid=Y180YjE3Y2YyZDE1YjkxMDliMDA0YzRkNmQ4NGNlODcxN2M3ZjVhOTEwNThjODYxMTgxODEwNmQ0NTc1YWM3MTg0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20" },
  { category: "Resource", title: "Public Booking Form", subtitle: "Share with clients", href: "/book" },
  { category: "Resource", title: "Hall Wi-Fi", subtitle: "AIM.BIG_Guest / ai888888", href: "/resources" },

  { category: "Office How-To", title: "Event Guidebook (Online)", subtitle: "Online attendee guidebook", href: "/office-tools#event-guidebook" },
  { category: "Office How-To", title: "TV Display at Office Entrance", subtitle: "Cast onto entrance TV", href: "/office-tools#tv-display" },
  { category: "Office How-To", title: "Credit Card Machines", subtitle: "Setup guide", href: "/office-tools#credit-card" },
  { category: "Office How-To", title: "Use the Printer", subtitle: "iMac next to Kherwei", href: "/office-tools#printer" },
];

// Checklist hits — flatten all items into searchable rows
const checklistHits: Hit[] = (() => {
  const out: Hit[] = [];
  for (const tab of checklistTabs) {
    for (const sec of tab.data) {
      for (const item of sec.items) {
        out.push({
          category: "Checklist",
          title: item.label,
          subtitle: `${tab.label} · ${sec.title}`,
          href: "/checklist",
        });
      }
    }
  }
  return out;
})();
void allChecklistSections;

function score(hit: Hit, q: string): number {
  const needle = q.toLowerCase();
  const t = hit.title.toLowerCase();
  const s = (hit.subtitle || "").toLowerCase();
  if (t === needle) return 100;
  if (t.startsWith(needle)) return 80;
  if (t.includes(needle)) return 60;
  if (s.includes(needle)) return 40;
  return 0;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") || "").trim();
  if (q.length < 2) {
    return NextResponse.json({ ok: true, results: [] });
  }

  const hits: Hit[] = [...staticHits, ...checklistHits];

  // Pull events + contacts in parallel — fail soft on either
  const [events, contacts] = await Promise.all([
    listEvents().catch(() => []),
    listContacts().catch(() => []),
  ]);

  for (const e of events) {
    hits.push({
      category: "Event",
      title: e.name,
      subtitle: [e.date, e.organizer, e.pic, e.requirements?.speakerName].filter(Boolean).join(" · "),
      href: `/events/${e.id}`,
    });
  }

  for (const c of contacts) {
    if (!c.name && !c.role && !c.phone) continue;
    hits.push({
      category: "Contact",
      title: c.name || c.role || "Contact",
      subtitle: [c.role, c.phone, c.email, c.note].filter(Boolean).join(" · "),
      href: "/contacts",
    });
  }

  const ranked = hits
    .map((h) => ({ h, s: score(h, q) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 24)
    .map((r) => r.h);

  return NextResponse.json({ ok: true, results: ranked });
}
