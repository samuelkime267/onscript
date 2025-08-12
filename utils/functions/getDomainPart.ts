import type { NextRequest } from "next/server";

type Req = Request | NextRequest;

export default function getDomainParts(req?: Req) {
  let origin = "";
  let host = "";

  if (typeof window !== "undefined") {
    // Browser
    origin = window.location.origin;
    host = window.location.host;
  } else if (req) {
    // NextRequest (Edge / Middleware)
    if ("nextUrl" in req) {
      origin = req.nextUrl.origin;
      host = req.nextUrl.host;
    } else {
      // Standard Request (like in App Router or NextAuth in edge runtime)
      const url = new URL(req.url);
      origin = url.origin;
      host = url.host;
    }
  } else if (process.env.NEXT_PUBLIC_URL) {
    // Fallback to env
    const url = new URL(process.env.NEXT_PUBLIC_URL);
    origin = url.origin;
    host = url.host;
  }

  return { origin, host };
}
