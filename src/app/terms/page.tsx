import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import BrandName from "@/components/BrandName";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/config/site";

const description =
  "How the VYSON-AI website works, how we work together, and the laws of India that apply.";

export const metadata: Metadata = {
  title: "Terms",
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms | VYSON-AI", description, url: "/terms", type: "website" },
};

const updated = "10 October 2026";

const email = (
  <a href={`mailto:${siteConfig.email}`} className="link-brand">
    {siteConfig.email}
  </a>
);

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "About us",
    body: (
      <>
        <BrandName /> is an MSME-registered business (Udyam, Government of India) based in{" "}
        {siteConfig.location}. You can reach us anytime at {email}.
      </>
    ),
  },
  {
    title: "Our services and free audit",
    body: "We build AI automation for businesses, including AI receptionists, WhatsApp assistants, website chatbots, CRM, stock management, Meta ads and LinkedIn outreach. Details on this website are a general guide; the exact scope, pricing and timeline are agreed in writing before we begin. Our 30-minute business audit is free, with no obligation. Our services are intended for businesses and adults aged 18 or over.",
  },
  {
    title: "Fees and third-party costs",
    body: "Fees, payment dates, applicable taxes and any pilot terms are agreed in writing. Once work has started, fees for that work are generally non-refundable unless we agree otherwise. Some tools have their own costs, such as WhatsApp messaging, Meta ad spend, call charges or software subscriptions. These are paid directly to those providers, and we'll always explain them upfront.",
  },
  {
    title: "Working together responsibly",
    body: "We ask that the information you share with us is accurate, that our services are used lawfully, and that your customers have agreed to receive messages or calls from you. Platforms like WhatsApp, Meta and LinkedIn have their own rules, and we'll help you follow them.",
  },
  {
    title: "Platforms we rely on",
    body: "Our solutions run on trusted platforms such as WhatsApp, Meta, LinkedIn and Google. From time to time they update their rules, pricing or features, or have outages. These are outside our control, but we'll always help you find the best way forward.",
  },
  {
    title: "Our approach to results",
    body: "We're focused on getting you real, measurable results, and we'll work closely with you to improve them over time. Because every business, offer and market is different, outcomes such as sales, leads, meetings or savings can vary. Numbers on our website, including our time-saving calculator and targets like '10–20 meetings a month', are estimates and goals to show what's possible, not guaranteed results.",
  },
  {
    title: "AI and human oversight",
    body: "AI is powerful, but not perfect, and can occasionally misunderstand a question. That's why we test every setup with you before launch and make sure a person can always step in. We recommend checking key details like prices and bookings from time to time.",
  },
  {
    title: "Your data and our work",
    body: (
      <>
        We treat your business information as confidential and use it only to deliver our services.
        Your data and content always remain yours. Ownership of any systems we build is set out in
        your agreement, and we&apos;ll only feature your name, logo or results with your permission.
        Our{" "}
        <Link href="/privacy-policy" className="link-brand">
          Privacy Policy
        </Link>{" "}
        explains how we handle personal information.
      </>
    ),
  },
  {
    title: "Using this website",
    body: "Please use this website lawfully and in a way that doesn't affect its security, performance or availability, including not attempting unauthorised access or copying substantial parts of its content without permission. When you submit a form, please share accurate details; by doing so, you agree that we may contact you by WhatsApp, phone or email about your request.",
  },
  {
    title: "Liability",
    body: "To the extent the law allows, we aren't responsible for indirect losses such as lost profits or data, and our total liability for any claim is limited to the fees paid to us in the three months before the claim. If a claim arises from how our services were used, for example messaging people without their consent, the client is responsible for the reasonable costs of that claim. Neither of us is responsible for delays caused by events outside reasonable control. Nothing here limits rights that cannot be limited by law.",
  },
  {
    title: "Ending, changes and governing law",
    body: "Either of us can end our work together as set out in your written agreement; fees for work already completed remain payable. We may update these terms occasionally, and the date above shows the latest version. These terms are governed by the laws of India. If a concern ever arises, we'll always try to resolve it through conversation first; otherwise, the courts of Ahmedabad, Gujarat have jurisdiction.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Terms", href: "/terms" }]} />
      <section className="bg-white">
        <div className="site-container pb-6 pt-2 md:pb-8 md:pt-3">
          <div className="mx-auto max-w-[1120px]">
            <header>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <h1 className="text-[28px] font-bold leading-tight tracking-[-0.02em] text-charcoal md:text-[28px]">
                  Terms of Service
                </h1>
                <p className="text-sm text-muted">Last updated: {updated}</p>
              </div>
              <p className="mt-1.5 text-sm leading-snug text-muted-strong">
                Thank you for choosing <BrandName />. These terms explain how our website works and
                how we work together. If you become a client, we&apos;ll also agree a written
                proposal with you; where it differs from these terms, the proposal applies.
              </p>
            </header>

            <div className="mt-3 columns-1 [column-gap:14px] lg:columns-2">
              {sections.map((section, index) => (
                <article
                  key={section.title}
                  className="mb-[14px] inline-block w-full break-inside-avoid rounded-xl border border-brand-violet/10 bg-violet-tint p-4"
                >
                  <h2 className="flex items-baseline gap-2 text-[15px] font-semibold leading-snug tracking-normal text-charcoal">
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-heading text-[13px] font-semibold text-brand-violet"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  <p className="mt-1.5 text-[14px] leading-[1.55] text-charcoal">{section.body}</p>
                </article>
              ))}
            </div>

            <p className="mt-3 text-sm text-muted-strong">
              Questions about these terms? We&apos;re happy to help: {email}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              This page is an electronic record under India&apos;s Information Technology Act, 2000
              and does not need a physical or digital signature.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
