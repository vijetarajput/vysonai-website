import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { validateLead, type Lead } from "@/lib/lead";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

const TIMEOUT_MS = 10_000;
const MAX_BODY_BYTES = 10 * 1024;
const FROM = "VYSON-AI Website <onboarding@resend.dev>";
const ALLOWED_FIELDS = new Set([
  "name",
  "country",
  "whatsapp",
  "email",
  "interests",
  "message",
  "consent",
  "website",
  "page",
]);

const DELIVERY_FAILED = siteConfig.showWhatsApp
  ? "Sorry, something went wrong. Please message us on WhatsApp instead."
  : `Sorry, something went wrong. Please email us at ${siteConfig.email} and we'll get back to you.`;

function fail(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

function methodNotAllowed() {
  return NextResponse.json(
    { ok: false, message: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const HEAD = methodNotAllowed;
export const OPTIONS = methodNotAllowed;

/** Escapes characters that would be treated as HTML markup. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strips CR/LF so values cannot split email headers. */
function headerSafe(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function kolkataTime(date: Date) {
  const text = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
  return `${text} IST`;
}

function needsLabel(lead: Lead) {
  return lead.interests.length > 0 ? lead.interests.join(", ") : "Business audit";
}

function waMeUrl(number: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}

function emailSubject(lead: Lead) {
  return `🔔 New lead: ${headerSafe(lead.name)} – ${headerSafe(needsLabel(lead))}`;
}

function emailText(lead: Lead, page: string, at: Date) {
  const message = lead.message ? lead.message : "Not shared";
  return [
    "New website lead",
    "",
    `Name: ${lead.name}`,
    `WhatsApp: ${lead.whatsapp}`,
    waMeUrl(lead.whatsapp),
    `Email: ${lead.email}`,
    `Needs: ${needsLabel(lead)}`,
    `Message: ${message}`,
    `Page: ${page}`,
    `Time: ${kolkataTime(at)}`,
  ].join("\n");
}

function emailHtml(lead: Lead, page: string, at: Date) {
  const message = lead.message ? escapeHtml(lead.message) : "Not shared";
  const wa = waMeUrl(lead.whatsapp);
  const mail = `mailto:${encodeURIComponent(lead.email)}`;
  const row = (label: string, value: string) =>
    `<p style="margin:0 0 12px 0;font-size:15px;line-height:1.5"><strong>${label}:</strong> ${value}</p>`;

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#F5F3FF;font-family:Arial,Helvetica,sans-serif;color:#1F2937">
  <div style="max-width:560px;margin:0 auto;padding:24px;background:#ffffff;border-radius:12px">
    <h1 style="margin:0 0 16px 0;font-size:18px;color:#1F2937">New website lead</h1>
    ${row("Name", escapeHtml(lead.name))}
    ${row("WhatsApp", `<a href="${wa}">${escapeHtml(lead.whatsapp)}</a>`)}
    ${row("Email", `<a href="${mail}">${escapeHtml(lead.email)}</a>`)}
    ${row("Needs", escapeHtml(needsLabel(lead)))}
    ${row("Message", message)}
    ${row("Page", escapeHtml(page))}
    ${row("Time", escapeHtml(kolkataTime(at)))}
  </div>
</body>
</html>`;
}

/** Logs only Resend's error name and message. Never logs the API key or personal data. */
function logResendFailure(error: unknown) {
  const name =
    error && typeof error === "object" && "name" in error && typeof error.name === "string"
      ? error.name
      : "Error";
  const message =
    error && typeof error === "object" && "message" in error && typeof error.message === "string"
      ? error.message
      : "send failed";
  console.error(`Lead delivery: Resend ${name}: ${message}`);
}

/** Emails the lead. Never logs personal data, the API key, or the notify address. */
async function sendLeadEmail(lead: Lead, page: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to || /[\r\n]/.test(to)) {
    console.error("Lead delivery: Resend Error: not configured");
    return false;
  }

  try {
    const at = new Date();
    const signal = AbortSignal.timeout(TIMEOUT_MS);
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send(
      {
        from: FROM,
        to,
        replyTo: headerSafe(lead.email),
        subject: emailSubject(lead),
        html: emailHtml(lead, page, at),
        text: emailText(lead, page, at),
      },
      { signal },
    );
    if (error) {
      logResendFailure(error);
      return false;
    }
    return Boolean(data?.id);
  } catch (error) {
    logResendFailure(error);
    return false;
  }
}

/** Optional extra copy to n8n. Its result never changes what the visitor sees. */
async function forwardToN8n(lead: Lead, page: string) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.N8N_WEBHOOK_SECRET) {
    headers["x-webhook-secret"] = process.env.N8N_WEBHOOK_SECRET;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: lead.name,
        whatsapp: lead.whatsapp, // E.164, for example +447911123456
        country: lead.country,
        email: lead.email,
        interests: lead.interests,
        message: lead.message,
        consent: true,
        page,
        source: siteConfig.url,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) console.error("Lead delivery: n8n webhook failed");
    return response.ok;
  } catch {
    console.error("Lead delivery: n8n webhook failed");
    return false;
  }
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return fail(
      siteConfig.showWhatsApp
        ? "Too many requests. Please wait a few minutes and try again, or chat with us on WhatsApp."
        : `Too many requests. Please wait a few minutes and try again, or email us at ${siteConfig.email}.`,
      429,
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return fail("We could not read your details. Please try again.", 413);
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return fail("We could not read your details. Please try again.", 400);
  }
  if (raw.length > MAX_BODY_BYTES) {
    return fail("We could not read your details. Please try again.", 413);
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return fail("We could not read your details. Please try again.", 400);
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return fail("We could not read your details. Please try again.", 400);
  }

  // Hidden "website" field: real people leave it empty. Pretend success for bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (Object.keys(body).some((key) => !ALLOWED_FIELDS.has(key))) {
    return fail("We could not read your details. Please try again.", 400);
  }

  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const page = typeof body.page === "string" && body.page ? body.page.slice(0, 200) : "Unknown";
  const lead = result.lead;

  const [emailResult] = await Promise.allSettled([
    sendLeadEmail(lead, page),
    forwardToN8n(lead, page),
  ]);

  if (emailResult.status !== "fulfilled" || emailResult.value !== true) {
    return fail(DELIVERY_FAILED, 502);
  }

  return NextResponse.json({ ok: true });
}
