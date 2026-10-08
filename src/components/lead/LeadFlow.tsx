"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import BrandName from "@/components/BrandName";
import { BusinessIcon, CheckIcon } from "@/components/lead/icons";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  BUSINESS_TYPES,
  INTERESTS,
  validateLead,
  type BusinessType,
  type Interest,
  type LeadErrors,
  type LeadField,
} from "@/lib/lead";

type Step = 1 | 2 | "done";

type Props = {
  /** "modal" shows the gradient side panel; "inline" is a simple card for pages. */
  layout: "modal" | "inline";
  /** Preselects "What do you want to automate?" chips. */
  initialInterests?: Interest[];
  onClose?: () => void;
};

const DELIVERY_FAILED = "Sorry, something went wrong. Please message us on WhatsApp instead.";

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-charcoal placeholder:text-muted focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30";

const stepContent = {
  1: {
    label: "Step 1 of 2",
    title: "What type of business do you run?",
    text: "This helps us prepare a demo made for you.",
  },
  2: {
    label: "Step 2 of 2",
    title: "Where should we send your demo?",
    text: "We'll WhatsApp you within 24 hours.",
  },
  done: {
    label: "All done",
    title: "Thank you!",
    text: "",
  },
} as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}

export default function LeadFlow({ layout, initialInterests, onClose }: Props) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [step, setStep] = useState<Step>(1);
  const [business, setBusiness] = useState<BusinessType | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<Interest[]>(initialInterests ?? []);
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<LeadField, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<LeadErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const userMoved = useRef(false);

  // After the person moves between steps, move keyboard focus to the new step title.
  useEffect(() => {
    if (userMoved.current) titleRef.current?.focus();
  }, [step]);

  function goTo(next: Step) {
    userMoved.current = true;
    setStep(next);
  }

  const check = validateLead({
    businessType: business,
    name,
    whatsapp: phone,
    email,
    interests,
    consent,
  });
  const errors: LeadErrors = check.ok ? {} : check.errors;
  const shownError = (field: LeadField) =>
    serverErrors[field] ?? (touched[field] ? errors[field] : undefined);

  const touch = (field: LeadField) => setTouched((t) => ({ ...t, [field]: true }));
  const clearServer = (field: LeadField) =>
    setServerErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  const borderFor = (field: LeadField) =>
    shownError(field) ? "border-red-600" : "border-border";

  function chooseBusiness(type: BusinessType) {
    setBusiness(type);
    clearServer("businessType");
    goTo(2);
  }

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
      setTouched({ name: true, whatsapp: true, email: true, consent: true, businessType: true });
      return;
    }

    const honeypot = String(new FormData(event.currentTarget).get("website") ?? "");

    setSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: business,
          name,
          whatsapp: phone,
          email,
          interests,
          consent,
          website: honeypot,
          page: window.location.pathname,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        goTo("done");
      } else if (data.errors) {
        setServerErrors(data.errors);
        if (data.errors.businessType) goTo(1);
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
  const content = stepContent[step];
  const titleId = id("title");

  const stepList = [
    { label: "Choose business", done: step !== 1 },
    { label: "Your details", done: step === "done" },
  ];

  /* ---------- the form body for each step ---------- */

  const businessStep = (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {BUSINESS_TYPES.map((type) => {
          const selected = business === type;
          return (
            <li key={type}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => chooseBusiness(type)}
                className={`flex h-full w-full flex-col items-center gap-3 rounded-2xl border-2 px-3 py-5 text-center transition-colors hover:border-brand-violet hover:bg-violet-tint ${
                  selected
                    ? "border-brand-violet bg-violet-tint"
                    : "border-border bg-white"
                }`}
              >
                <span className="text-brand-violet">
                  <BusinessIcon type={type} />
                </span>
                <span className="font-heading text-base font-semibold text-charcoal">
                  {type}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <FieldError id={id("business-error")} message={shownError("businessType")} />
    </div>
  );

  const detailsStep = (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Hidden spam trap: people never see or fill this */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {business && (
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-violet-tint px-4 py-3">
          <p className="flex items-center gap-3 text-sm text-charcoal">
            <span className="text-brand-violet">
              <BusinessIcon type={business} size={24} />
            </span>
            <span>
              Business: <span className="font-semibold">{business}</span>
            </span>
          </p>
          <button type="button" onClick={() => goTo(1)} className="link-brand text-sm font-medium">
            Change
          </button>
        </div>
      )}

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
          className={`${inputBase} ${borderFor("name")}`}
        />
        <FieldError id={id("name-error")} message={shownError("name")} />
      </div>

      <div>
        <label htmlFor={id("whatsapp")} className="mb-1.5 block text-sm font-semibold">
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
            id={id("whatsapp")}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/[^\d\s+-]/g, "").slice(0, 16));
              clearServer("whatsapp");
            }}
            onBlur={() => touch("whatsapp")}
            aria-invalid={!!shownError("whatsapp")}
            aria-describedby={shownError("whatsapp") ? id("whatsapp-error") : undefined}
            className={`${inputBase} rounded-l-none ${borderFor("whatsapp")}`}
          />
        </div>
        <FieldError id={id("whatsapp-error")} message={shownError("whatsapp")} />
      </div>

      <div>
        <label htmlFor={id("email")} className="mb-1.5 block text-sm font-semibold">
          Email <span className="font-normal text-muted-strong">(optional)</span>
        </label>
        <input
          id={id("email")}
          type="email"
          autoComplete="email"
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
          What do you want to automate?{" "}
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
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
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
              rel="noopener"
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
            <WhatsAppButton label="Chat on WhatsApp" className="mt-3" />
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => goTo(1)}
          className="rounded-full border-2 border-border px-6 py-3 text-base font-medium text-charcoal transition-colors hover:bg-violet-tint"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!check.ok || submitting}
          aria-describedby={!check.ok ? id("hint") : undefined}
          className="flex-1 rounded-full bg-brand-violet px-6 py-3 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-violet"
        >
          {submitting ? "Sending..." : "Get Free Demo"}
        </button>
      </div>
      {!check.ok && (
        <p id={id("hint")} className="text-center text-sm text-muted-strong">
          {errors.email && !errors.name && !errors.whatsapp && !errors.consent
            ? "Please check your email address to continue."
            : "Add your name and WhatsApp number, and tick the box to continue."}
        </p>
      )}
    </form>
  );

  const doneStep = (
    <div role="status" className="py-4 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-tint text-brand-violet">
        <CheckIcon size={26} />
      </span>
      <p className="mt-5 font-heading text-2xl font-bold leading-tight tracking-tight text-charcoal">
        Thank you! We&apos;ll WhatsApp you within 24 hours.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3">
        <WhatsAppButton label="Chat with us on WhatsApp now" large />
        {onClose && (
          <button type="button" onClick={onClose} className="link-brand text-sm font-medium">
            Close
          </button>
        )}
      </div>
    </div>
  );

  const body = step === 1 ? businessStep : step === 2 ? detailsStep : doneStep;

  /* ---------- layouts ---------- */

  if (layout === "inline") {
    return (
      <div>
        <p className="text-sm font-semibold text-brand-violet">{content.label}</p>
        <Heading
          ref={titleRef}
          tabIndex={-1}
          className="mt-1 text-2xl focus:outline-none"
        >
          {step === "done" ? "All done" : content.title}
        </Heading>
        {content.text && <p className="mt-1 text-muted-strong">{content.text}</p>}
        <div className="mt-6">{body}</div>
      </div>
    );
  }

  return (
    <div className="relative flex h-dvh flex-col md:h-auto md:max-h-[90dvh] md:min-h-[520px] md:flex-row">
      {/* Gradient panel: a header strip on mobile, a side panel on desktop */}
      <aside className="on-dark bg-brand-gradient-diagonal px-6 py-5 pr-16 text-white md:flex md:w-[35%] md:shrink-0 md:flex-col md:p-8">
        <p className="text-sm font-semibold">{content.label}</p>
        <Heading
          id={titleId}
          ref={titleRef}
          tabIndex={-1}
          className="mt-2 text-xl leading-tight text-white focus:outline-none md:text-2xl"
        >
          {content.title}
        </Heading>
        {content.text && <p className="mt-2 hidden text-sm md:block">{content.text}</p>}

        <ol className="mt-8 hidden space-y-4 md:block">
          {stepList.map((item, index) => {
            const current = (step === 1 && index === 0) || (step === 2 && index === 1);
            return (
              <li key={item.label} className="flex items-center gap-3 text-sm font-medium">
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold ${
                    item.done
                      ? "border-white bg-white text-brand-violet"
                      : current
                        ? "border-white text-white"
                        : "border-white/60 text-white/80"
                  }`}
                >
                  {item.done ? <CheckIcon size={14} /> : index + 1}
                </span>
                <span>
                  {item.label}
                  {item.done && <span className="sr-only"> (done)</span>}
                  {current && <span className="sr-only"> (current step)</span>}
                </span>
              </li>
            );
          })}
        </ol>
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