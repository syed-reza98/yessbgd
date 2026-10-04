import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 Network Proxy convention (replacing middleware.ts).
 * Runs at the network boundary to inspect session tokens and enforce
 * security redirects exclusively on /admin routes.
 */
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Session cookies used by Auth.js / NextAuth v5 in HTTP and HTTPS environments
  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isLoginPage = pathname === "/admin/login";

  if (pathname.startsWith("/admin")) {
    if (!sessionToken && !isLoginPage) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (sessionToken && isLoginPage) {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = "/admin";
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
