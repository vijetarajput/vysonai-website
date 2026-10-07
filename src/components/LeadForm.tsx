"use client";

import { useEffect, useRef, useState } from "react";
import BrandName from "@/components/BrandName";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BUSINESS_TYPES, validateLead, type LeadErrors, type LeadField } from "@/lib/lead";

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-charcoal placeholder:text-muted focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

export default function LeadForm() {
  const [errors, setErrors] = useState<LeadErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const thanksRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (done) thanksRef.current?.focus();
  }, [done]);

  const borderFor = (field: LeadField) =>
    errors[field] ? "border-red-600" : "border-border";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setFormError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      whatsapp: String(form.get("whatsapp") ?? ""),
      businessType: String(form.get("businessType") ?? ""),
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""), // hidden spam trap
    };

    const check = validateLead(payload);
    if (!check.ok) {
      setErrors(check.errors);
      const first = (["name", "whatsapp", "businessType", "consent"] as const).find(
        (f) => check.errors[f],
      );
      if (first) {
        (event.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      }
      return;
    }
    setErrors({});

    setSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.ok) {
        setDone(true);
      } else if (data.errors) {
        setErrors(data.errors);
      } else {
        setFormError(
          data.message ??
            "Sorry, something went wrong. Please try again, or chat with us on WhatsApp.",
        );
      }
    } catch {
      setFormError(
        "We could not reach the server. Please check your internet and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div role="status" className="text-center">
        <h3
          ref={thanksRef}
          tabIndex={-1}
          className="text-2xl focus:outline-none"
        >
          Thank you! We&apos;ll WhatsApp you within 24 hours.
        </h3>
        <WhatsAppButton label="Chat with us on WhatsApp now" className="mt-6" />
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onChange={(event) => {
        // Clear a field's error as soon as the person starts fixing it
        const field = (event.target as unknown as HTMLInputElement).name as LeadField;
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      }}
      noValidate
      className="space-y-5"
    >
      {/* Hidden spam trap: people never see or fill this */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="lead-name" className="mb-1.5 block text-sm font-semibold">
          Your name <span className="text-red-700">*</span>
        </label>
        <input
          id="lead-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="e.g. Rahul Sharma"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "lead-name-error" : undefined}
          className={`${inputBase} ${borderFor("name")}`}
        />
        <FieldError id="lead-name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="lead-whatsapp" className="mb-1.5 block text-sm font-semibold">
          WhatsApp number <span className="text-red-700">*</span>
        </label>
        <div className="flex">
          <span
            aria-hidden="true"
            className={`inline-flex items-center rounded-l-xl border border-r-0 bg-violet-tint px-4 text-base font-medium text-charcoal ${borderFor("whatsapp")}`}
          >
            +91
          </span>
          <input
            id="lead-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="10-digit mobile number"
            aria-invalid={!!errors.whatsapp}
            aria-describedby={errors.whatsapp ? "lead-whatsapp-error" : undefined}
            className={`${inputBase} rounded-l-none ${borderFor("whatsapp")}`}
          />
        </div>
        <FieldError id="lead-whatsapp-error" message={errors.whatsapp} />
      </div>

      <div>
        <label htmlFor="lead-type" className="mb-1.5 block text-sm font-semibold">
          Business type
        </label>
        <select
          id="lead-type"
          name="businessType"
          defaultValue=""
          aria-invalid={!!errors.businessType}
          aria-describedby={errors.businessType ? "lead-type-error" : undefined}
          className={`${inputBase} ${borderFor("businessType")}`}
        >
          <option value="">Select your business type</option>
          {BUSINESS_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <FieldError id="lead-type-error" message={errors.businessType} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-charcoal">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "lead-consent-error" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-border accent-brand-violet"
          />
          <span>
            I agree to receive messages on WhatsApp from <BrandName />
          </span>
        </label>
        <FieldError id="lead-consent-error" message={errors.consent} />
      </div>

      <div aria-live="polite">
        {formError && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {formError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand-violet px-6 py-3.5 text-base font-semibold text-white shadow-soft transition-colors hover:bg-brand-violet-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Sending..." : "Get Free Demo"}
      </button>
    </form>
  );
}
