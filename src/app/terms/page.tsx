import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import BrandName from "@/components/BrandName";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/config/site";

const description =
  "How you can use the VYSON-AI website, how our free business audit and paid work are agreed, and the laws of India that apply.";

export const metadata: Metadata = {
  title: "Terms",
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms | VYSON-AI", description, url: "/terms", type: "website" },
};

const updated = "9 October 2026";

const email = (
  <a href={`mailto:${siteConfig.email}`} className="link-brand">
    {siteConfig.email}
  </a>
);

type PolicySection = { id: string; title: string; body: ReactNode };

const sections: PolicySection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        <BrandName /> is an MSME-registered business (Udyam, Government of India) based in{" "}
        {siteConfig.location}. You can contact us at {email}.
      </p>
    ),
  },
  {
    id: "our-services",
    title: "Our services",
    body: (
      <p>
        We build AI automation for businesses, including AI receptionists, WhatsApp assistants,
        website chatbots, CRM, stock management, Meta ads and LinkedIn outreach. Information on
        this website is general. The exact scope, price and timeline of any work are agreed in
        writing before we start.
      </p>
    ),
  },
  {
    id: "free-business-audit",
    title: "Free business audit",
    body: (
      <>
        <p>
          Our 30-minute business audit is free and without obligation. We may reschedule or decline
          a request if we are unable to help.
        </p>
        <p>Our services are for businesses and people aged 18 or over.</p>
      </>
    ),
  },
  {
    id: "pilots-fees-and-payments",
    title: "Pilots, fees and payments",
    body: (
      <p>
        Pilot terms, fees, payment dates and any applicable taxes are agreed in writing. Unless
        agreed otherwise, fees for work already started are non-refundable. Some costs are paid by
        you directly to third parties and are not part of our fees, for example WhatsApp messaging
        charges, Meta advertising spend, phone call charges and software subscriptions. We will
        explain these before you start.
      </p>
    ),
  },
  {
    id: "your-responsibilities",
    title: "Your responsibilities",
    body: (
      <p>
        You agree to give us accurate information, use our services only for lawful purposes, and
        have your customers&apos; permission (consent) before we message or call them for you. You
        also agree to follow the rules of the platforms we use for you, such as WhatsApp, Meta and
        LinkedIn. You may not use our services to send spam or to promote anything illegal or
        harmful.
      </p>
    ),
  },
  {
    id: "third-party-platforms",
    title: "Third-party platforms",
    body: (
      <p>
        Our services run on platforms owned by other companies, such as WhatsApp, Meta (Facebook
        and Instagram), LinkedIn, Google, phone networks and hosting providers. They may change
        their rules, prices or features, have outages, or restrict accounts. These things are
        outside our control, but we will always help you find the best way forward.
      </p>
    ),
  },
  {
    id: "no-guarantee-of-results",
    title: "No guarantee of results",
    body: (
      <p>
        We work hard to get you real results, but we cannot guarantee specific outcomes such as
        sales, leads, meetings or savings. Numbers on our website, including our time-saving
        calculator and targets like &ldquo;10–20 meetings a month&rdquo;, are estimates or goals,
        not promises. Results depend on your business, offer, market and how you use our services.
      </p>
    ),
  },
  {
    id: "about-ai",
    title: "About AI",
    body: (
      <p>
        AI tools can sometimes make mistakes or misunderstand a question. That&apos;s why we test
        every setup with you before it goes live and keep a person able to step in. Please review
        important information, such as prices and bookings, regularly.
      </p>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body: (
      <p>
        We keep your business information private and only use it to deliver our services. We will
        not share it with others, except service providers who help us deliver the work, or where
        the law requires it.
      </p>
    ),
  },
  {
    id: "ownership",
    title: "Ownership",
    body: (
      <p>
        Our website, brand, designs and content belong to <BrandName />. Your business data and
        content always belong to you. Ownership of systems we build for you is set out in your
        written agreement. We will only mention your business name, logo or results in our
        marketing with your permission.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        How we handle personal information is explained in our{" "}
        <Link href="/privacy-policy" className="link-brand">
          Privacy Policy
        </Link>
        .
      </p>
    ),
  },
  {
    id: "using-this-website",
    title: "Using this website",
    body: (
      <p>
        Please don&apos;t misuse this website, for example by trying to hack it, overload it, copy
        large parts of it, or submit false information through our forms. By submitting a form, you
        agree that we may contact you by WhatsApp, phone or email about your request.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the extent the law allows, <BrandName /> is not responsible for indirect losses, such as
        lost profits or lost data, and our total responsibility for any claim is limited to the
        fees you paid us in the 3 months before the claim. Nothing in these terms limits
        responsibilities that cannot be limited by law.
      </p>
    ),
  },
  {
    id: "your-responsibility-to-us",
    title: "Your responsibility to us",
    body: (
      <p>
        If someone makes a claim against us because of how you used our services, for example
        messaging people without their consent or breaking a platform&apos;s rules, you agree to
        cover the reasonable costs of that claim.
      </p>
    ),
  },
  {
    id: "events-outside-our-control",
    title: "Events outside our control",
    body: (
      <p>
        We are not responsible for delays or failures caused by events outside our reasonable
        control, such as internet or platform outages, natural events or government actions.
      </p>
    ),
  },
  {
    id: "ending-our-work-together",
    title: "Ending our work together",
    body: (
      <p>
        Either of us can end our work together as set out in your written agreement. Fees for work
        already completed remain payable.
      </p>
    ),
  },
  {
    id: "changes-to-these-terms",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. The date at the top shows the latest version.
      </p>
    ),
  },
  {
    id: "law-and-disputes",
    title: "Law and disputes",
    body: (
      <p>
        These terms are governed by the laws of India. If we disagree, we will first try to resolve
        it by talking. If that doesn&apos;t work, the courts of Ahmedabad, Gujarat will have
        jurisdiction.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: <p>Questions about these terms? Email {email}.</p>,
  },
];

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Terms", href: "/terms" }]} width="narrow" />
      <section className="bg-white">
        <div className="site-container section-y">
          <div className="mx-auto max-w-3xl">
            <div className="max-w-[720px] text-[17px] leading-[1.75] text-muted-strong">
              <h1 className="text-charcoal">Terms of Service</h1>
              <p className="mt-3 text-sm">Last updated: {updated}</p>

              <p className="mt-6">
                These terms explain how you can use our website and how we work with clients. By
                using this website or booking a free business audit, you agree to them. If you
                become a client, we will also agree a written proposal or agreement with you; if
                anything in it differs from these terms, the written agreement wins.
              </p>
              <p className="mt-3 text-sm text-muted">
                This page is an electronic record under India&apos;s Information Technology Act,
                2000 and does not need a physical or digital signature.
              </p>

              <nav
                aria-label="Contents"
                className="mt-8 rounded-2xl border border-border bg-violet-tint p-5"
              >
                <p className="font-heading text-base font-semibold text-charcoal">Contents</p>
                <ol className="mt-3 grid list-decimal gap-x-8 gap-y-1.5 pl-5 text-[15px] leading-snug marker:text-brand-violet sm:grid-cols-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <Link href={`#${section.id}`} className="link-brand">
                        {section.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>

              {sections.map((section, index) => (
                <section key={section.id} id={section.id} className="mt-10">
                  <h2 className="text-2xl text-charcoal">
                    {index + 1}. {section.title}
                  </h2>
                  <div className="mt-3 space-y-3">{section.body}</div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
