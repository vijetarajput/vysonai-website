import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { validateLead } from "@/lib/lead";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

function fail(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
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

  // The webhook URL and secret stay on the server. If no URL is set, we still return success.
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (webhookUrl) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.N8N_WEBHOOK_SECRET) {
      headers["x-webhook-secret"] = process.env.N8N_WEBHOOK_SECRET;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: result.lead.name,
          whatsapp: `91${result.lead.whatsapp}`,
          businessType: result.lead.businessType,
          interests: result.lead.interests,
          consent: true,
          page: typeof body.page === "string" ? body.page.slice(0, 200) : undefined,
          source: siteConfig.url,
          submittedAt: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
    } catch (error) {
      console.error("Lead webhook failed:", error instanceof Error ? error.message : error);
      return fail(
        "Sorry, something went wrong on our side. Please try again in a minute, or chat with us on WhatsApp.",
        502,
      );
    }
  }

  return NextResponse.json({ ok: true });
}
