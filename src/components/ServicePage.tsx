import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import HowItWorks from "@/components/HowItWorks";
import DemoButton from "@/components/lead/DemoButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { ServiceContent } from "@/content/services";

function CheckIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Shared layout for /services/crm, /services/chatbot and /services/ai-receptionist. */
export default function ServicePage({ content }: { content: ServiceContent }) {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
          {content.earlyAccess && (
            <span className="mb-5 inline-block rounded-full bg-violet-tint px-4 py-1.5 text-sm font-semibold text-brand-violet">
              Early Access
            </span>
          )}
          <h1>{content.h1}</h1>
          <p className="measure mx-auto mt-5 text-lg leading-relaxed text-muted-strong">
            {content.subtext}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <DemoButton className="inline-flex items-center justify-center rounded-full bg-brand-violet px-6 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark" />
            <WhatsAppButton large />
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="bg-violet-tint">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2>{content.problem.title}</h2>
          <p className="measure mx-auto mt-4 text-lg leading-relaxed text-muted-strong">
            {content.problem.text}
          </p>
        </div>
      </section>

      {/* What is included */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="text-center">{content.includedTitle}</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {content.included.map((item) => (
              <li
                key={item.title}
                className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-tint text-brand-violet">
                  <CheckIcon />
                </span>
                <h3 className="mt-5">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-strong">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HowItWorks title={content.stepsTitle} steps={content.steps} background="tint" />

      {/* Best for */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center">Best for</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.bestFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-border bg-white px-5 py-4 shadow-soft"
              >
                <span className="mt-0.5 shrink-0 text-brand-violet">
                  <CheckIcon size={20} />
                </span>
                <span className="text-charcoal">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={content.faqs} background="tint" />

      <FinalCta heading={content.ctaHeading} />
    </>
  );
}
