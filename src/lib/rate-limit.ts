// Simple in-memory rate limiter. It is per server instance, so on serverless hosting
// it only slows down basic abuse. Use a shared store (e.g. Redis) if you need strict limits.

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep memory small: drop keys that have gone quiet.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(k);
    }
  }
  return false;
}

export function clientIp(request: Request): string {
  const vercel = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (vercel) return vercel;
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
