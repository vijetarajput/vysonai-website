import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { validateLead } from "@/lib/lead";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "We could not read your details. Please try again." },
      { status: 400 },
    );
  }

  // Hidden "website" field: real people leave it empty. Pretend success for bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  // The webhook URL stays on the server. If it is not set, we still return success.
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.lead.name,
          whatsapp: `91${result.lead.whatsapp}`,
          businessType: result.lead.businessType,
          consent: true,
          source: siteConfig.url,
          submittedAt: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
    } catch (error) {
      console.error("Lead webhook failed:", error instanceof Error ? error.message : error);
      return NextResponse.json(
        {
          ok: false,
          message:
            "Sorry, something went wrong on our side. Please try again in a minute, or chat with us on WhatsApp.",
        },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
