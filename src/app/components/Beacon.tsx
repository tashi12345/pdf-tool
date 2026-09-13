"use client";

import { useEffect } from "react";

/**
 * Reports one pageview via this site's own `/api/beacon`, which forwards it
 * to the Gieek Console's shared database (`record_pageview`, the same
 * security-definer trust model as the console's cold-email open-pixel: an
 * anonymous write, no read access). Going through this site's own route
 * rather than calling Supabase directly lets the server attach the
 * visitor's country from Vercel's `x-vercel-ip-country` header — the
 * browser has no way to know that on its own.
 *
 * The visitor id is a random string in localStorage, not a cookie — nothing
 * personally identifying, just enough to count "the same browser came back"
 * for a unique-visitor number. No consent banner needed for that.
 */

function visitorId(): string {
  try {
    const key = "gieek.visitor.id";
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    // Private browsing or storage blocked — still report the view, just
    // without a stable id for this visitor.
    return "";
  }
}

function deviceLabel(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "mobile";
  if (/Tablet|iPad/i.test(ua)) return "tablet";
  return "desktop";
}

export default function Beacon() {
  useEffect(() => {
    void fetch("/api/beacon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || null,
        visitorId: visitorId() || null,
        device: deviceLabel(),
      }),
      keepalive: true,
    }).catch(() => {
      // A missed pageview is not worth retrying or surfacing — never affects
      // the visitor's experience of the actual tool.
    });
  }, []);

  return null;
}
