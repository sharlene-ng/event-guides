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
};

export type SOPEvent = {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  pax: number | string;
  layout: EventLayout | string;
  organizer: string;
  organizerContact: string;
  projectType: ProjectType | string;
  pic: string;
  requirements: EventRequirements;
  status: EventStatus;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  checklistState?: Record<string, boolean>;
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
  return {
    ...e,
    date: normalizeDate(e.date),
    startTime: normalizeTime(e.startTime),
    endTime: normalizeTime(e.endTime),
    organizerContact: e.organizerContact == null ? "" : String(e.organizerContact),
    pic: e.pic == null ? "" : String(e.pic),
    organizer: String(e.organizer || ""),
    name: String(e.name || ""),
    pax: e.pax,
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
