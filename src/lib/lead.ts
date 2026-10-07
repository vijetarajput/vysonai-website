import { z } from "zod";

// Shared by the lead form (browser) and the /api/lead route (server).

export const BUSINESS_TYPES = ["Gym", "Clinic", "Salon", "Coaching", "Other"] as const;
export type BusinessType = (typeof BUSINESS_TYPES)[number];

/** Optional "What do you want to automate?" choices. */
export const INTERESTS = [
  "Reminders",
  "Follow-ups",
  "Customer dashboard",
  "Weekly report",
  "Chatbot",
  "AI receptionist",
] as const;
export type Interest = (typeof INTERESTS)[number];

export type LeadField = "businessType" | "name" | "whatsapp" | "interests" | "consent";
export type LeadErrors = Partial<Record<LeadField, string>>;

/** Keeps digits only and removes a leading +91 / 91 / 0 if the user typed one. */
export function normalizeIndianMobile(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export const messages = {
  businessType: "Please choose the type of business you run.",
  nameEmpty: "Please enter your name.",
  nameShort: "Please enter your full name (at least 2 letters).",
  whatsappEmpty: "Please enter your WhatsApp number.",
  whatsappLength: "Please enter a 10-digit mobile number, like 9876543210.",
  whatsappStart: "Indian mobile numbers start with 6, 7, 8 or 9. Please check your number.",
  interests: "Please choose from the options shown.",
  consent: "Please tick the box so we can message you on WhatsApp.",
};

const whatsappSchema = z
  .string({ error: messages.whatsappEmpty })
  .superRefine((raw, ctx) => {
    const digits = normalizeIndianMobile(raw);
    if (!raw.trim()) ctx.addIssue({ code: "custom", message: messages.whatsappEmpty });
    else if (digits.length !== 10) ctx.addIssue({ code: "custom", message: messages.whatsappLength });
    else if (!/^[6-9]/.test(digits)) ctx.addIssue({ code: "custom", message: messages.whatsappStart });
  })
  .transform(normalizeIndianMobile);

export const leadSchema = z.object({
  businessType: z.enum(BUSINESS_TYPES, { error: messages.businessType }),
  name: z
    .string({ error: messages.nameEmpty })
    .trim()
    .min(1, messages.nameEmpty)
    .min(2, messages.nameShort)
    .max(80, messages.nameShort),
  whatsapp: whatsappSchema,
  interests: z
    .array(z.enum(INTERESTS, { error: messages.interests }), { error: messages.interests })
    .max(INTERESTS.length, messages.interests)
    .default([])
    .transform((list) => [...new Set(list)]),
  consent: z.literal(true, { error: messages.consent }),
});

export type Lead = z.output<typeof leadSchema>;

export function validateLead(
  input: unknown,
): { ok: true; lead: Lead } | { ok: false; errors: LeadErrors } {
  const result = leadSchema.safeParse(input);
  if (result.success) return { ok: true, lead: result.data };

  const errors: LeadErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as LeadField | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { ok: false, errors };
}
