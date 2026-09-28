import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/**
 * Next.js 16 Network Proxy convention (replacing middleware.ts).
 * Runs at the network boundary to handle request inspection, session token refresh,
 * and security redirection exclusively for administrative routes.
 * Public static and marketing pages avoid edge authentication calls, maximizing TTFB.
 */
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return await updateSession(request);
  }
  return NextResponse.next();
}

export const config = {
  // Restrict edge proxy execution strictly to protected administrative routes
  matcher: ["/admin/:path*"],
};

