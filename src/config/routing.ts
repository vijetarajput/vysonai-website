// Shared by next.config.ts (page responses) and src/proxy.ts (redirects).

/** Slugs of the service pages that exist. Add each new service page here and in app/sitemap.ts. */
export const builtServices = [
  "ai-receptionist",
  "whatsapp-automation",
  "chatbot",
  "crm",
  "stock-management",
  "meta-ads",
  "linkedin-outreach",
] as const;

export function securityHeaders() {
  return [
    {
      key: "Content-Security-Policy",
      // Telegram and Resend are called from the server, not the browser.
      // React's development build needs eval(); production does not.
      value: [
        "default-src 'self'",
        process.env.NODE_ENV === "development"
          ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
          : "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
      ].join("; "),
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "DENY" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=()",
    },
  ];
}

export function applySecurityHeaders(headers: Headers) {
  for (const { key, value } of securityHeaders()) {
    headers.set(key, value);
  }
}
