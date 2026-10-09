"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import BrandName from "@/components/BrandName";
import { CheckIcon } from "@/components/lead/icons";
import PhoneField from "@/components/lead/PhoneField";
import EmailButton from "@/components/EmailButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteConfig } from "@/config/site";
import {
  INTERESTS,
  MESSAGE_MAX,
  NAME_MAX,
  validateLead,
  type Interest,
  type LeadErrors,
  type LeadField,
} from "@/lib/lead";
import { DEFAULT_COUNTRY, type CountryCode } from "@/lib/phone";

type Props = {
  /** "modal" shows the gradient side panel; "inline" is a simple card for pages. */
  layout: "modal" | "inline";
  /** Preselects the "What do you need help with?" chips. */
  initialInterests?: Interest[];
  /** Prefills the optional "Tell us a bit more" box. */
  initialMessage?: string;
  onClose?: () => void;
};

const DELIVERY_FAILED = siteConfig.showWhatsApp
  ? "Sorry, something went wrong. Please message us on WhatsApp instead."
  : `Sorry, something went wrong. Please email us at ${siteConfig.email} and we'll get back to you.`;

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-charcoal placeholder:text-muted focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30";

const TITLE = "Book your free business audit";
const SUBTEXT =
  "30 minutes. No cost, no commitment. We'll look at how you work today and show you where AI can save time. We usually reply within 1 hour (9 AM – 9 PM IST).";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

export default function LeadFlow({ layout, initialInterests, initialMessage, onClose }: Props) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [name, setName] = useState("");
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<Interest[]>(initialInterests ?? []);
  const [message, setMessage] = useState(initialMessage ?? "");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<LeadField, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<LeadErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const finished = useRef(false);

  // After sending, move keyboard focus to the "Thank you" title.
  useEffect(() => {
    if (done && finished.current) titleRef.current?.focus();
  }, [done]);

  const check = validateLead({
    name,
    country,
    whatsapp: phone,
    email,
    interests,
    message,
    consent,
  });
  const errors: LeadErrors = check.ok ? {} : check.errors;
  const shownError = (field: LeadField) =>
    serverErrors[field] ?? (touched[field] ? errors[field] : undefined);

  const touch = (field: LeadField) => setTouched((t) => ({ ...t, [field]: true }));
  const clearServer = (field: LeadField) =>
    setServerErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  const borderFor = (field: LeadField) => (shownError(field) ? "border-red-600" : "border-border");

  function toggleInterest(item: Interest) {
    setInterests((list) =>
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item],
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setFormError("");

    if (!check.ok) {
      setTouched({ name: true, whatsapp: true, email: true, message: true, consent: true });
      return;
    }

    const honeypot = String(new FormData(event.currentTarget).get("website") ?? "");

    setSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          country,
          whatsapp: phone,
          email,
          interests,
          message,
          consent,
          website: honeypot,
          page: window.location.pathname,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        finished.current = true;
        setDone(true);
      } else if (data.errors) {
        setServerErrors(data.errors);
      } else {
        setFormError(data.message ?? DELIVERY_FAILED);
      }
    } catch {
      setFormError(DELIVERY_FAILED);
    } finally {
      setSubmitting(false);
    }
  }

  const Heading = layout === "modal" ? "h2" : "h3";
  const title = done ? "Thank you!" : TITLE;
  const titleId = id("title");

  const form = (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      {/* Hidden spam trap: people never see or fill this */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor={id("name")} className="mb-1.5 block text-sm font-semibold">
          Your name <span className="text-red-700">*</span>
        </label>
        <input
          id={id("name")}
          type="text"
          autoComplete="name"
          placeholder="e.g. Rahul Sharma"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearServer("name");
          }}
          onBlur={() => touch("name")}
          aria-invalid={!!shownError("name")}
          aria-describedby={shownError("name") ? id("name-error") : undefined}
          maxLength={NAME_MAX}
          className={`${inputBase} ${borderFor("name")}`}
        />
        <FieldError id={id("name-error")} message={shownError("name")} />
      </div>

      <div>
        <label htmlFor={id("whatsapp")} className="mb-1.5 block text-sm font-semibold">
          WhatsApp number <span className="text-red-700">*</span>
        </label>
        <PhoneField
          id={id("whatsapp")}
          country={country}
          onCountryChange={(code) => {
            setCountry(code);
            clearServer("whatsapp");
          }}
          value={phone}
          onValueChange={(value) => {
            setPhone(value);
            clearServer("whatsapp");
          }}
          onBlur={() => touch("whatsapp")}
          invalid={!!shownError("whatsapp")}
          describedBy={shownError("whatsapp") ? id("whatsapp-error") : undefined}
          borderClass={borderFor("whatsapp")}
          inputClass={inputBase}
        />
        <FieldError id={id("whatsapp-error")} message={shownError("whatsapp")} />
      </div>

      <div>
        <label htmlFor={id("email")} className="mb-1.5 block text-sm font-semibold">
          Email <span className="text-red-700">*</span>
        </label>
        <input
          id={id("email")}
          type="email"
          autoComplete="email"
          required
          maxLength={100}
          placeholder="you@business.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearServer("email");
          }}
          onBlur={() => touch("email")}
          aria-invalid={!!shownError("email")}
          aria-describedby={shownError("email") ? id("email-error") : undefined}
          className={`${inputBase} ${borderFor("email")}`}
        />
        <FieldError id={id("email-error")} message={shownError("email")} />
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-semibold">
          What do you need help with?{" "}
          <span className="font-normal text-muted-strong">(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((item) => {
            const selected = interests.includes(item);
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleInterest(item)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? "border-brand-violet bg-brand-violet text-white"
                    : "border-border bg-white text-charcoal hover:border-brand-violet hover:bg-violet-tint"
                }`}
              >
                {selected && <CheckIcon size={13} />}
                {item}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor={id("message")} className="mb-1.5 block text-sm font-semibold">
          Tell us a bit more{" "}
          <span className="font-normal text-muted-strong">(optional)</span>
        </label>
        <textarea
          id={id("message")}
          rows={3}
          maxLength={MESSAGE_MAX}
          placeholder="e.g. We miss calls when we're busy. Not sure yet? Leave it blank."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearServer("message");
          }}
          aria-invalid={!!shownError("message")}
          aria-describedby={shownError("message") ? id("message-error") : undefined}
          className={`${inputBase} resize-y ${borderFor("message")}`}
        />
        <FieldError id={id("message-error")} message={shownError("message")} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-charcoal">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              touch("consent");
              clearServer("consent");
            }}
            aria-invalid={!!shownError("consent")}
            aria-describedby={shownError("consent") ? id("consent-error") : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-border accent-brand-violet"
          />
          <span>
            I agree to receive messages on WhatsApp from <BrandName />. Read our{" "}
            <Link
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="link-brand font-medium"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <FieldError id={id("consent-error")} message={shownError("consent")} />
      </div>

      <div aria-live="polite">
        {formError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{formError}</p>
            {siteConfig.showWhatsApp ? (
              <WhatsAppButton label="Chat on WhatsApp" className="mt-3" />
            ) : (
              <EmailButton label="Email us" className="mt-3" />
            )}
          </div>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={!check.ok || submitting}
          aria-describedby={!check.ok ? id("hint") : undefined}
          className="w-full whitespace-nowrap rounded-full bg-brand-violet px-6 py-3 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-violet"
        >
          {submitting ? "Sending..." : "Book my free audit"}
        </button>
        {!check.ok && (
          <p id={id("hint")} className="mt-3 text-center text-sm text-muted-strong">
            Add your name, WhatsApp number and email, and tick the box to continue.
          </p>
        )}
      </div>
    </form>
  );

  const doneView = (
    <div role="status" className="py-4 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-tint text-brand-violet">
        <CheckIcon size={26} />
      </span>
      <p className="mt-5 text-base leading-relaxed text-muted-strong sm:text-lg">
        Your free business audit request is in. We&apos;ll get in touch shortly. We usually reply
        within 1 hour (9 AM – 9 PM IST).
      </p>
      {siteConfig.showWhatsApp || onClose ? (
        <div className="mt-6 flex flex-col items-center gap-3">
          {siteConfig.showWhatsApp ? (
            <WhatsAppButton label="Chat with us on WhatsApp now" large />
          ) : null}
          {onClose ? (
            <button type="button" onClick={onClose} className="link-brand text-sm font-medium">
              Close
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );

  const body = done ? doneView : form;

  /* ---------- layouts ---------- */

  if (layout === "inline") {
    return (
      <div>
        <Heading ref={titleRef} tabIndex={-1} className="text-2xl focus:outline-none">
          {title}
        </Heading>
        {!done && <p className="mt-1 text-muted-strong">{SUBTEXT}</p>}
        <div className="mt-6">{body}</div>
      </div>
    );
  }

  return (
    <div className="relative flex h-dvh flex-col md:h-auto md:max-h-[90dvh] md:min-h-[520px] md:flex-row">
      {/* Gradient panel: a header strip on mobile, a side panel on desktop */}
      <aside className="on-dark bg-brand-gradient-diagonal px-6 py-5 pr-16 text-white md:flex md:w-[35%] md:shrink-0 md:flex-col md:p-8">
        <Heading
          id={titleId}
          ref={titleRef}
          tabIndex={-1}
          className="text-xl leading-tight text-white focus:outline-none md:text-2xl"
        >
          {title}
        </Heading>
        {!done && <p className="mt-2 text-sm">{SUBTEXT}</p>}
      </aside>

      <div className="flex-1 overflow-y-auto bg-white p-6 md:p-10">{body}</div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20 md:right-4 md:top-4 md:text-charcoal md:hover:bg-violet-tint"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </div>
  );
}
