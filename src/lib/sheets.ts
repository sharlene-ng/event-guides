// Google Sheets backend client (via Apps Script web app)

export type EventStatus = "pending" | "approved" | "rejected";
export type EventLayout = "theater" | "classroom" | "banquet";
export type ProjectType = "company" | "internal" | "external";

export type EventRequirements = {
  catering?: boolean;
  parking?: boolean;
  lift?: boolean;
  aircond?: boolean;
  notes?: string;
  adminRemarks?: string;
};

export type SOPEvent = {
  id: string;
  name: string;
  date: string;       // start date (YYYY-MM-DD)
  endDate?: string;   // end date (YYYY-MM-DD) — same as date for single day
  startTime: string;
  endTime: string;
  pax: number | string;
  layout: EventLayout | string;
  organizer: string;          // displayed as "Event Owner"
  organizerContact: string;   // displayed as "Owner Contact"
  projectType: ProjectType | string;
  pic: string;
  requirements: EventRequirements;
  status: EventStatus;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  checklistState?: Record<string, boolean>;
  posterUrl?: string;        // direct image URL (Drive thumbnail)
  posterViewUrl?: string;    // open-in-Drive URL
};

export type PosterUpload = {
  base64: string;       // raw base64 (no data: prefix)
  filename: string;
  mimeType: string;
};

const API_URL = process.env.SHEETS_API_URL;
const API_SECRET = process.env.SHEETS_API_SECRET;

function ensureConfigured() {
  if (!API_URL || !API_SECRET) {
    throw new Error("Sheets backend not configured (SHEETS_API_URL / SHEETS_API_SECRET)");
  }
}

async function callGet(action: string, extraParams: Record<string, string> = {}): Promise<unknown> {
  ensureConfigured();
  const params = new URLSearchParams({ action, secret: API_SECRET!, ...extraParams });
  const res = await fetch(`${API_URL}?${params.toString()}`, {
    method: "GET",
    redirect: "follow",
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "API error");
  return data;
}

async function callPost(action: string, body: unknown): Promise<unknown> {
  ensureConfigured();
  const params = new URLSearchParams({ action, secret: API_SECRET! });
  // Apps Script web apps need text/plain body to avoid the CORS preflight
  const res = await fetch(`${API_URL}?${params.toString()}`, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "API error");
  return data;
}

// Sheets auto-converts strings that look like dates/times/numbers.
// Normalize them back to the original format we expect.
const TZ = "Asia/Kuala_Lumpur";

function isIsoLike(v: unknown): v is string {
  return typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v);
}

function normalizeDate(v: unknown): string {
  if (v == null || v === "") return "";
  if (isIsoLike(v)) {
    return new Date(v).toLocaleDateString("en-CA", { timeZone: TZ });
  }
  return String(v);
}

function normalizeTime(v: unknown): string {
  if (v == null || v === "") return "";
  if (isIsoLike(v)) {
    return new Date(v).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: TZ,
    });
  }
  return String(v);
}

function normalizeEvent(e: SOPEvent): SOPEvent {
  const startDate = normalizeDate(e.date);
  const endDate = normalizeDate(e.endDate) || startDate;
  return {
    ...e,
    date: startDate,
    endDate,
    startTime: normalizeTime(e.startTime),
    endTime: normalizeTime(e.endTime),
    organizerContact: e.organizerContact == null ? "" : String(e.organizerContact),
    pic: e.pic == null ? "" : String(e.pic),
    organizer: String(e.organizer || ""),
    name: String(e.name || ""),
    pax: e.pax,
    posterUrl: e.posterUrl ? String(e.posterUrl) : "",
    posterViewUrl: e.posterViewUrl ? String(e.posterViewUrl) : "",
  };
}

export async function uploadPoster(payload: PosterUpload): Promise<{
  posterUrl: string;
  posterViewUrl: string;
}> {
  const data = (await callPost("uploadPoster", payload)) as {
    thumbnailUrl: string;
    webViewLink: string;
  };
  return {
    posterUrl: data.thumbnailUrl,
    posterViewUrl: data.webViewLink,
  };
}

export async function listEvents(status?: EventStatus): Promise<SOPEvent[]> {
  const data = (await callGet("list", status ? { status } : {})) as {
    events: SOPEvent[];
  };
  return (data.events || []).map(normalizeEvent);
}

export async function getEvent(id: string): Promise<SOPEvent | null> {
  const data = (await callGet("get", { id })) as { event: SOPEvent | null };
  return data.event ? normalizeEvent(data.event) : null;
}

export async function createEvent(
  payload: Omit<SOPEvent, "id" | "status" | "createdAt">,
): Promise<SOPEvent> {
  const data = (await callPost("create", payload)) as { event: SOPEvent };
  return normalizeEvent(data.event);
}

export async function updateEventStatus(
  id: string,
  status: EventStatus,
  approvedBy?: string,
): Promise<SOPEvent> {
  const data = (await callPost("updateStatus", { id, status, approvedBy })) as {
    event: SOPEvent;
  };
  return normalizeEvent(data.event);
}

export async function saveChecklist(
  id: string,
  state: Record<string, boolean>,
): Promise<SOPEvent> {
  const data = (await callPost("saveChecklist", { id, state })) as {
    event: SOPEvent;
  };
  return normalizeEvent(data.event);
}

// ============ CONTACTS ============

export type Contact = {
  section: string; // emergency, approver, building, pic, vendor-catering, etc.
  role: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  order: string;
};

export async function listContacts(): Promise<Contact[]> {
  const data = (await callGet("listContacts")) as { contacts: Contact[] };
  return (data.contacts || []).map((c) => ({
    section: String(c.section || ""),
    role: String(c.role || ""),
    name: String(c.name || ""),
    phone: String(c.phone || ""),
    email: String(c.email || ""),
    note: String(c.note || ""),
    order: String(c.order || ""),
  }));
}

// ============ PRICING ============

export type PricingRow = {
  section: string; // header, internal, external, addon-internal, addon-external, inclusion-*
  label: string;
  value: string;
  unit: string;
  order: string;
};

export async function listPricing(): Promise<PricingRow[]> {
  const data = (await callGet("listPricing")) as { pricing: PricingRow[] };
  return (data.pricing || []).map((p) => ({
    section: String(p.section || ""),
    label: String(p.label || ""),
    value: String(p.value || ""),
    unit: String(p.unit || ""),
    order: String(p.order || ""),
  }));
}

// ============ HALL INFO ============

export type HallInfoRow = {
  key: string;
  value: string;
  unit: string;
  order: string;
};

export async function listHallInfo(): Promise<HallInfoRow[]> {
  const data = (await callGet("listHallInfo")) as { hallInfo: HallInfoRow[] };
  return (data.hallInfo || []).map((h) => ({
    key: String(h.key || ""),
    value: String(h.value || ""),
    unit: String(h.unit || ""),
    order: String(h.order || ""),
  }));
}
