import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    return new NextResponse("Bad id", { status: 400 });
  }

  // Try multiple Drive endpoints — first one that succeeds wins
  const urls = [
    `https://lh3.googleusercontent.com/d/${id}=w1200`,
    `https://drive.google.com/thumbnail?id=${id}&sz=w1200`,
    `https://drive.google.com/uc?export=view&id=${id}`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        redirect: "follow",
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      if (!res.ok) continue;
      const ct = res.headers.get("content-type") || "";
      if (!ct.startsWith("image/")) continue;
      const buf = await res.arrayBuffer();
      return new NextResponse(buf, {
        status: 200,
        headers: {
          "Content-Type": ct,
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    } catch {
      // try next
    }
  }
  return new NextResponse("Image not available", { status: 404 });
}
