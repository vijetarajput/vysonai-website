// Shared by the lead form (browser) and the /api/lead route (server).

export const BUSINESS_TYPES = ["Gym", "Clinic", "Salon", "Coaching", "Other"] as const;
export type BusinessType = (typeof BUSINESS_TYPES)[number];

export type LeadField = "name" | "whatsapp" | "businessType" | "consent";
export type LeadErrors = Partial<Record<LeadField, string>>;

export type Lead = {
  name: string;
  whatsapp: string; // 10-digit Indian mobile, without +91
  businessType: BusinessType | "";
};

/** Keeps digits only and removes a leading +91 / 91 / 0 if the user typed one. */
export function normalizeIndianMobile(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export const messages = {
  nameEmpty: "Please enter your name.",
  nameShort: "Please enter your full name (at least 2 letters).",
  whatsappEmpty: "Please enter your WhatsApp number.",
  whatsappLength: "Please enter a 10-digit mobile number, like 9876543210.",
  whatsappStart:
    "Indian mobile numbers start with 6, 7, 8 or 9. Please check your number.",
  businessType: "Please choose one of the business types from the list.",
  consent: "Please tick the box so we can message you on WhatsApp.",
};

export function validateLead(input: {
  name?: unknown;
  whatsapp?: unknown;
  businessType?: unknown;
  consent?: unknown;
}): { ok: true; lead: Lead } | { ok: false; errors: LeadErrors } {
  const errors: LeadErrors = {};

  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!name) errors.name = messages.nameEmpty;
  else if (name.length < 2 || name.length > 80) errors.name = messages.nameShort;

  const rawPhone = typeof input.whatsapp === "string" ? input.whatsapp : "";
  const whatsapp = normalizeIndianMobile(rawPhone);
  if (!rawPhone.trim()) errors.whatsapp = messages.whatsappEmpty;
  else if (whatsapp.length !== 10) errors.whatsapp = messages.whatsappLength;
  else if (!/^[6-9]/.test(whatsapp)) errors.whatsapp = messages.whatsappStart;

  const businessType = typeof input.businessType === "string" ? input.businessType : "";
  if (businessType && !(BUSINESS_TYPES as readonly string[]).includes(businessType)) {
    errors.businessType = messages.businessType;
  }

  if (input.consent !== true) errors.consent = messages.consent;

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, lead: { name, whatsapp, businessType: businessType as Lead["businessType"] } };
}
