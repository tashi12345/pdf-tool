import { NextResponse } from "next/server";

/**
 * Forwards one pageview to the Gieek Console's shared database, adding the
 * one thing only a server can see: the visitor's country, from Vercel's own
 * `x-vercel-ip-country` request header — free, no geolocation service, no
 * extra request. Everything else in the body came from the browser.
 */

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SITE = "pdf-tool";

export async function POST(req: Request) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return NextResponse.json({ ok: false }, { status: 503 });

  let body: { path?: string; referrer?: string | null; visitorId?: string | null; device?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const country = req.headers.get("x-vercel-ip-country");

  await fetch(`${SUPABASE_URL}/rest/v1/rpc/record_pageview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      pageview_id: crypto.randomUUID(),
      site: SITE,
      path: body.path ?? "/",
      referrer: body.referrer || null,
      visitor_id: body.visitorId || null,
      country: country || null,
      device: body.device ?? null,
    }),
  }).catch(() => {
    // Best-effort — a missed pageview never surfaces to the visitor.
  });

  return NextResponse.json({ ok: true });
}
