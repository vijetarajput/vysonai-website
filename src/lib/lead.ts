import { z } from "zod";
import { DEFAULT_COUNTRY, isCountryCode, toE164, type CountryCode } from "@/lib/phone";

// Shared by the lead form (browser) and the /api/lead route (server).

export const BUSINESS_TYPES = ["Gym", "Clinic", "Salon", "Coaching", "Retail / Shop", "Other"] as const;
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

export const MESSAGE_MAX = 300;

export type LeadField =
  | "businessType"
  | "name"
  | "whatsapp"
  | "email"
  | "interests"
  | "message"
  | "consent";
export type LeadErrors = Partial<Record<LeadField, string>>;

export const messages = {
  businessType: "Please choose the type of business you run.",
  nameEmpty: "Please enter your name.",
  nameShort: "Please enter your full name (at least 2 letters).",
  whatsappEmpty: "Please enter your WhatsApp number.",
  whatsappInvalid: "Please enter a valid number for the selected country.",
  email: "Please enter a valid email address, like you@business.com, or leave it empty.",
  interests: "Please choose from the options shown.",
  message: `Please keep this note under ${MESSAGE_MAX} characters.`,
  consent: "Please tick the box so we can message you on WhatsApp.",
};

/**
 * WhatsApp number + selected country. Valid only if libphonenumber-js accepts the number for
 * that country. The output number is E.164, for example +447911123456.
 */
const phoneSchema = z
  .object({
    country: z.string().default(DEFAULT_COUNTRY),
    whatsapp: z.string({ error: messages.whatsappEmpty }),
  })
  .superRefine((value, ctx) => {
    if (!value.whatsapp.trim()) {
      ctx.addIssue({ code: "custom", path: ["whatsapp"], message: messages.whatsappEmpty });
    } else if (!isCountryCode(value.country) || !toE164(value.whatsapp, value.country)) {
      ctx.addIssue({ code: "custom", path: ["whatsapp"], message: messages.whatsappInvalid });
    }
  })
  .transform((value) => ({
    country: value.country as CountryCode,
    whatsapp: toE164(value.whatsapp, value.country as CountryCode) as string,
  }));

/** Optional. Empty is fine. If filled: trimmed, lowercase, at most 100 characters, valid format. */
const emailSchema = z
  .string({ error: messages.email })
  .trim()
  .toLowerCase()
  .max(100, messages.email)
  .refine((value) => value === "" || z.email().safeParse(value).success, messages.email)
  .default("");

/** Optional short note. Trimmed, at most MESSAGE_MAX characters. */
const messageSchema = z
  .string({ error: messages.message })
  .trim()
  .max(MESSAGE_MAX, messages.message)
  .default("");

const detailsSchema = z.object({
  businessType: z.enum(BUSINESS_TYPES, { error: messages.businessType }),
  name: z
    .string({ error: messages.nameEmpty })
    .trim()
    .min(1, messages.nameEmpty)
    .min(2, messages.nameShort)
    .max(80, messages.nameShort),
  email: emailSchema,
  interests: z
    .array(z.enum(INTERESTS, { error: messages.interests }), { error: messages.interests })
    .max(INTERESTS.length, messages.interests)
    .default([])
    .transform((list) => [...new Set(list)]),
  message: messageSchema,
  consent: z.literal(true, { error: messages.consent }),
});

export type Lead = z.output<typeof detailsSchema> & z.output<typeof phoneSchema>;

export function validateLead(
  input: unknown,
): { ok: true; lead: Lead } | { ok: false; errors: LeadErrors } {
  const data = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const details = detailsSchema.safeParse(data);
  const phone = phoneSchema.safeParse({ country: data.country, whatsapp: data.whatsapp });

  if (details.success && phone.success) {
    return { ok: true, lead: { ...details.data, ...phone.data } };
  }

  const errors: LeadErrors = {};
  const issues = [
    ...(details.success ? [] : details.error.issues),
    ...(phone.success ? [] : phone.error.issues),
  ];
  for (const issue of issues) {
    const field = issue.path[0] as LeadField | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return { ok: false, errors };
}
