import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import DemoButton from "@/components/lead/DemoButton";
import ReviewsBonus from "@/components/ReviewsBonus";
import ServiceIcon from "@/components/ServiceIcon";
import ServiceStickyBar from "@/components/ServiceStickyBar";
import ServiceVisual from "@/components/ServiceVisual";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { ServiceContent } from "@/content/services";

function CheckIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function CrossIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 7l10 10M17 7L7 17" />
    </svg>
  );
}

type Tone = "white" | "tint";

function Section({
  tone,
  title,
  intro,
  children,
}: {
  tone: Tone;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={tone === "tint" ? "bg-violet-tint" : "bg-white"}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-center">{title}</h2>
        {intro && (
          <p className="measure mx-auto mt-3 text-center text-lg leading-relaxed text-muted-strong">
            {intro}
          </p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/**
 * Conversion-focused layout shared by the four service pages:
 * hero, before vs after, how it works, industry examples, what you get, FAQ, final CTA,
 * plus a sticky "Book Free Demo" bar on mobile.
 */
export default function ServicePage({ content }: { content: ServiceContent }) {
  // Sections after the hero alternate between tinted and white backgrounds
  let index = 0;
  const nextTone = (): Tone => (index++ % 2 === 0 ? "tint" : "white");

  return (
    <>
      {/* 1. Hero */}
      <section id="service-hero" className="bg-white">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12 lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold text-brand-violet">{content.question}</p>
              {content.earlyAccess && (
                <span className="rounded-full bg-violet-tint px-3 py-1 text-xs font-semibold text-brand-violet">
                  Early Access
                </span>
              )}
            </div>
            <h1 className="mt-4 text-[2rem] md:text-[2.5rem]">{content.h1}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-strong">{content.subtext}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <DemoButton
                interests={content.interests}
                className="inline-flex items-center justify-center rounded-full bg-brand-violet px-6 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark"
              >
                Book Free Demo
              </DemoButton>
              <WhatsAppButton large />
            </div>
          </div>
          <ServiceVisual visual={content.visual} />
        </div>
      </section>

      {/* 2. Before vs After */}
      <Section tone={nextTone()} title="Before and after">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-strong">Before</p>
            <ul className="mt-5 space-y-4">
              {content.before.map((text) => (
                <li key={text} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                    <CrossIcon size={14} />
                  </span>
                  <span className="leading-relaxed text-muted-strong">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border-2 border-brand-violet bg-white p-6 shadow-soft sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-violet">After</p>
            <ul className="mt-5 space-y-4">
              {content.after.map((text) => (
                <li key={text} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-tint text-brand-violet">
                    <CheckIcon size={14} />
                  </span>
                  <span className="leading-relaxed text-charcoal">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Optional: normal vs AI comparison (AI Dashboard) */}
      {content.comparison && (
        <Section tone={nextTone()} title={content.comparison.title}>
          <div className="mx-auto max-w-4xl">
            <div className="hidden grid-cols-2 gap-4 px-2 pb-3 md:grid">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-strong">
                {content.comparison.normalLabel}
              </p>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-violet">
                {content.comparison.aiLabel}
              </p>
            </div>
            <ul className="space-y-4">
              {content.comparison.rows.map((row) => (
                <li key={row.ai} className="grid gap-3 md:grid-cols-2 md:gap-4">
                  <div className="rounded-2xl border border-border bg-white p-5">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-strong md:hidden">
                      {content.comparison!.normalLabel}
                    </p>
                    <p className="leading-relaxed text-muted-strong">{row.normal}</p>
                  </div>
                  <div className="rounded-2xl border-2 border-brand-violet bg-violet-tint p-5">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-violet md:hidden">
                      {content.comparison!.aiLabel}
                    </p>
                    <p className="font-medium leading-relaxed text-charcoal">{row.ai}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* 3. How it works */}
      <Section tone={nextTone()} title="How it works">
        <ol className="grid gap-5 md:grid-cols-3 md:gap-6">
          {content.steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-tint text-brand-violet">
                  <ServiceIcon name={step.icon} />
                </span>
                <span className="font-heading text-sm font-bold text-muted-strong">Step {i + 1}</span>
              </div>
              <h3 className="mt-5">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-strong">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Optional bonus block (WhatsApp page): Google reviews */}
      {content.reviewsBonus && <ReviewsBonus tone={nextTone()} />}

      {/* 4. Works for businesses like yours */}
      <Section tone={nextTone()} title="Works for businesses like yours">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.industries.map((item) => (
            <li
              key={item.name}
              className="rounded-3xl border border-border bg-white p-6 shadow-soft"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-tint text-brand-violet">
                <ServiceIcon name={item.icon} />
              </span>
              <h3 className="mt-4 text-lg">{item.name}</h3>
              <p className="mt-2 leading-relaxed text-muted-strong">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. What you get */}
      <Section tone={nextTone()} title="What you get">
        <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {content.deliverables.map((text) => (
            <li
              key={text}
              className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-violet text-white">
                <CheckIcon size={14} />
              </span>
              <span className="font-medium leading-relaxed text-charcoal">{text}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. FAQ (with FAQPage JSON-LD) */}
      <Faq items={content.faqs} background={nextTone()} />

      {/* 7. Final call to action */}
      <FinalCta
        heading={content.ctaHeading}
        interests={content.interests}
        buttonLabel="Book Free Demo"
      />

      {/* 8. Sticky bar on mobile */}
      <ServiceStickyBar interests={content.interests} />
    </>
  );
}
