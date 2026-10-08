import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import HowItWorks from "@/components/HowItWorks";
import DemoButton from "@/components/lead/DemoButton";
import PhoneMockup from "@/components/PhoneMockup";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { IndustryContent } from "@/content/industry";

function CheckIcon() {
  return (
    <svg
      width="22"
      height="22"
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

/** Shared layout for the Gyms and Clinics pages. All words come from the content object. */
export default function IndustryLanding({
  content,
  label,
  path,
}: {
  content: IndustryContent;
  /** Name shown as the last breadcrumb, e.g. "Gyms". */
  label: string;
  path: string;
}) {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Solutions", href: "/solutions" },
          { label: label, href: path },
        ]}
      />
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1>{content.h1}</h1>
            <p className="measure mt-5 text-lg leading-relaxed text-muted-strong">
              {content.subtext}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <DemoButton
                business={content.business}
                className="inline-flex items-center justify-center rounded-full bg-brand-violet px-6 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark"
              />
              <WhatsAppButton large />
            </div>
          </div>
          <PhoneMockup
            businessName={content.mockup.businessName}
            messages={content.mockup.messages}
          />
        </div>
      </section>

      {/* The problem */}
      <section className="bg-violet-tint">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="text-center">{content.problemsTitle}</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {content.problems.map((item) => (
              <li
                key={item.title}
                className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8"
              >
                <h3>{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-strong">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we automate */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="text-center">{content.automationsTitle}</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {content.automations.map((item) => (
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

      {/* How it works */}
      <HowItWorks
        title={content.stepsTitle}
        steps={content.steps}
        background="tint"
      />

      {/* 1-month pilot */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2>{content.pilot.title}</h2>
          <p className="measure mx-auto mt-3 text-lg leading-relaxed text-muted-strong">
            {content.pilot.text}
          </p>
          <DemoButton
            business={content.business}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-violet px-6 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark"
          />
        </div>
      </section>

      <Faq items={content.faqs} background="tint" />

      <FinalCta heading={content.ctaHeading} business={content.business} />
    </>
  );
}
