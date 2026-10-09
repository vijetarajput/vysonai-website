import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { validateLead, type Lead } from "@/lib/lead";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

const TIMEOUT_MS = 10_000;
const FROM = "VYSON-AI Website <onboarding@resend.dev>";

const DELIVERY_FAILED =
  "Sorry, something went wrong. Please message us on WhatsApp instead.";

function fail(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

/** Escapes characters that would be treated as HTML markup. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escapes the characters Telegram's HTML mode treats as markup. */
function escapeTelegram(value: string) {
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

function needsLabel(lead: Lead) {
  return lead.interests.length > 0 ? lead.interests.join(", ") : "Business audit";
}

function waMeUrl(number: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}

function telegramText(lead: Lead, page: string) {
  const number = lead.whatsapp; // E.164, for example +447911123456
  const wants = lead.interests.length > 0 ? lead.interests.join(", ") : "Not specified";

  return [
    `🔔 <b>New lead – ${escapeTelegram(siteConfig.name)}</b>`,
    `Name: ${escapeTelegram(lead.name)}`,
    `WhatsApp: ${escapeTelegram(number)} (<a href="${waMeUrl(number)}">open chat</a>)`,
    `Email: ${escapeTelegram(lead.email)}`,
    `Needs: ${escapeTelegram(wants)}`,
    `Message: ${lead.message ? escapeTelegram(lead.message) : "Not shared"}`,
    `Page: ${escapeTelegram(page)}`,
    `Time: ${kolkataTime(new Date())}`,
  ].join("\n");
}

function emailSubject(lead: Lead) {
  return `🔔 New lead: ${lead.name} – ${needsLabel(lead)}`;
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
  const mail = `mailto:${escapeHtml(lead.email)}`;
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

function isDelivered(result: PromiseSettledResult<boolean>) {
  return result.status === "fulfilled" && result.value === true;
}

/** Returns true only when Telegram confirms it accepted the message. Never logs personal data or the token. */
async function sendToTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Lead delivery: Telegram sendMessage failed: not configured");
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
    const data = (await response.json().catch(() => null)) as {
      ok?: boolean;
      description?: string;
    } | null;
    if (response.ok && data?.ok === true) return true;
    const reason =
      typeof data?.description === "string" && data.description
        ? data.description
        : `HTTP ${response.status}`;
    console.error(`Lead delivery: Telegram sendMessage failed: ${reason}`);
  } catch {
    // The error text can contain the request URL (which includes the token), so it is not logged.
    console.error("Lead delivery: Telegram sendMessage failed: network error");
  }
  return false;
}

/** Emails the lead. Never logs personal data, the API key, or the notify address. */
async function sendLeadEmail(lead: Lead, page: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to || /[\r\n]/.test(to)) {
    console.error("Lead delivery: Resend send failed: not configured");
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
        replyTo: lead.email,
        subject: emailSubject(lead),
        html: emailHtml(lead, page, at),
        text: emailText(lead, page, at),
      },
      { signal },
    );
    if (error) {
      const reason = error.statusCode === null && signal.aborted ? "timeout" : error.name;
      console.error(`Lead delivery: Resend send failed: ${reason}`);
      return false;
    }
    return Boolean(data?.id);
  } catch {
    console.error("Lead delivery: Resend send failed: network error");
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
    if (!response.ok) console.error(`Lead delivery: n8n responded with HTTP ${response.status}.`);
    return response.ok;
  } catch {
    console.error("Lead delivery: could not reach n8n.");
    return false;
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
  const lead = result.lead;

  const [emailResult, telegramResult] = await Promise.allSettled([
    sendLeadEmail(lead, page),
    sendToTelegram(telegramText(lead, page)),
    forwardToN8n(lead, page),
  ]);

  if (!isDelivered(emailResult) && !isDelivered(telegramResult)) {
    return fail(DELIVERY_FAILED, 502);
  }

  return NextResponse.json({ ok: true });
}
