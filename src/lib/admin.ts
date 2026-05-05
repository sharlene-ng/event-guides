import { cookies } from "next/headers";

async function expectedHash(password: string): Promise<string> {
  const data = new TextEncoder().encode("admin:" + password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isAdminAuthed(): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const cookieStore = await cookies();
  const cookie = cookieStore.get("admin")?.value;
  if (!cookie) return false;
  return cookie === (await expectedHash(adminPassword));
}
