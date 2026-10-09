import { NextResponse, type NextRequest } from "next/server";
import { applySecurityHeaders, builtServices } from "@/config/routing";

const built = new Set<string>(builtServices);

function redirectHomeServices(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/#services", request.url), 307);
  applySecurityHeaders(response.headers);
  return response;
}

/**
 * Temporary redirects for unfinished service URLs, with the same security headers as real pages.
 * next.config redirects run before Proxy and would skip those headers.
 */
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/services" || path === "/solutions" || path.startsWith("/solutions/")) {
    return redirectHomeServices(request);
  }

  if (path.startsWith("/services/")) {
    const slug = path.slice("/services/".length).replace(/\/$/, "");
    if (!built.has(slug)) return redirectHomeServices(request);
  }
}

export const config = {
  matcher: ["/services", "/services/:path*", "/solutions", "/solutions/:path*"],
};
