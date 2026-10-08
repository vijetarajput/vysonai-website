import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { validateLead, type Lead } from "@/lib/lead";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

const TIMEOUT_MS = 10_000;

const DELIVERY_FAILED =
  "Sorry, something went wrong. Please message us on WhatsApp instead.";

function fail(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

/** Escapes the characters Telegram's HTML mode treats as markup. */
function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function kolkataTime(date: Date) {
  const text = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
  return `${text} IST`;
}

function telegramText(lead: Lead, page: string) {
  const number = lead.whatsapp; // E.164, for example +447911123456
  const waDigits = number.replace(/\D/g, ""); // wa.me links have no plus sign
  const wants = lead.interests.length > 0 ? lead.interests.join(", ") : "Not specified";

  return [
    `🔔 <b>New lead – ${escapeHtml(siteConfig.name)}</b>`,
    `Name: ${escapeHtml(lead.name)}`,
    `WhatsApp: ${escapeHtml(number)} (<a href="https://wa.me/${waDigits}">open chat</a>)`,
    `Email: ${escapeHtml(lead.email)}`,
    `Needs: ${escapeHtml(wants)}`,
    `Message: ${lead.message ? escapeHtml(lead.message) : "Not shared"}`,
    `Page: ${escapeHtml(page)}`,
    `Time: ${kolkataTime(new Date())}`,
  ].join("\n");
}

/** Returns true only when Telegram confirms it accepted the message. Never logs personal data or the token. */
async function sendToTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Lead delivery: Telegram is not configured.");
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const data = (await response.json().catch(() => null)) as { ok?: boolean } | null;
    if (response.ok && data?.ok === true) return true;
    console.error(`Lead delivery: Telegram did not accept the message (HTTP ${response.status}).`);
  } catch {
    // The error text can contain the request URL (which includes the token), so it is not logged.
    console.error("Lead delivery: could not reach Telegram.");
  }
  return false;
}

/** Optional extra copy to n8n. Its result never changes what the visitor sees. */
async function forwardToN8n(lead: Lead, page: string) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) return;

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
    if (!response.ok) console.error(`Lead delivery: n8n responded with HTTP ${response.status}.`);
  } catch {
    console.error("Lead delivery: could not reach n8n.");
  }
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return fail(
      "Too many requests. Please wait a few minutes and try again, or chat with us on WhatsApp.",
      429,
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("We could not read your details. Please try again.", 400);
  }

  // Hidden "website" field: real people leave it empty. Pretend success for bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const page = typeof body.page === "string" && body.page ? body.page.slice(0, 200) : "Unknown";

  // Telegram decides success. n8n (if configured) gets a copy at the same time.
  const [delivered] = await Promise.all([
    sendToTelegram(telegramText(result.lead, page)),
    forwardToN8n(result.lead, page),
  ]);

  if (!delivered) return fail(DELIVERY_FAILED, 502);

  return NextResponse.json({ ok: true });
}
