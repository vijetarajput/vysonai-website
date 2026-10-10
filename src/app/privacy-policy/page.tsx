import type { Metadata } from "next";
import type { ReactNode } from "react";
import BrandName from "@/components/BrandName";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/config/site";

const description =
  "How VYSON-AI collects, uses, shares and protects the details you send us, in simple English, and how you can ask us to see, correct or delete them.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { title: "Privacy Policy | VYSON-AI", description, url: "/privacy-policy", type: "website" },
};

const updated = "10 October 2026";

const email = (
  <a href={`mailto:${siteConfig.email}`} className="link-brand">
    {siteConfig.email}
  </a>
);

const sections: { id: string; extraIds?: string[]; title: string; body: ReactNode }[] = [
  {
    id: "who-we-are",
    title: "About us",
    body: (
      <>
        <BrandName /> is an MSME-registered business (Udyam, Government of India) based in{" "}
        {siteConfig.location}. Registration details are available on request, and you can reach us
        anytime at {email}.
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: "When you fill in a form, we receive the details you share: your name, WhatsApp number, email address, the services you're interested in, and any message you write. We also note which page you contacted us from. Like most websites, our hosting provider automatically records basic technical information, such as your IP address and browser type, to keep the site secure. We never collect payment details on this website.",
  },
  {
    id: "why-we-use-it",
    title: "How we use it",
    body: "We use your details only to reply to your enquiry, arrange your free business audit or demo, and send you information you've asked for. We never sell your data or use it for unrelated marketing.",
  },
  {
    id: "legal-basis",
    title: "Your consent",
    body: "We use your information with your consent, which you give using the checkbox on our form, and to respond to your request. We follow India's Digital Personal Data Protection Act, 2023, and, for visitors in the UK, the UK GDPR.",
  },
  {
    id: "who-we-share-it-with",
    title: "Who helps us",
    body: "We work with a small number of trusted service providers who help us run this website and receive your enquiry, such as our website hosting provider and secure email and messaging tools. Some of them may process data outside your country, and we only choose providers with strong security measures.",
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    body: "We keep enquiry details for up to 12 months after our last conversation, and then delete them. If you become a client, we keep only what's needed for our work together and our legal obligations.",
  },
  {
    id: "how-we-protect-it",
    title: "How we keep it safe",
    body: "Your details travel over secure (HTTPS) connections, access is limited to the people who need it, and our private keys are kept securely, never in the website code.",
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    body: (
      <>
        You can ask to see, correct or delete your information, or withdraw your consent, at any
        time by emailing {email}. We&apos;ll respond within 30 days. If you&apos;re in the UK and
        feel we haven&apos;t handled your concern well, you also have the right to contact the
        Information Commissioner&apos;s Office (ICO).
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: "We don't use advertising or tracking cookies, and we don't store anything in your browser to track you. If this ever changes, for example if we add analytics, we'll update this policy first.",
  },
  {
    id: "children",
    extraIds: ["changes"],
    title: "Children and updates",
    body: "Our services are designed for businesses and adults, and are not intended for anyone under 18. We may update this policy from time to time; the date at the top always shows the latest version.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy-policy" }]} />
      <section className="bg-white">
        <div className="site-container pb-6 pt-2 md:pb-8 md:pt-3">
          <div className="mx-auto max-w-[1120px]">
            <header>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <h1 className="text-[28px] font-bold leading-tight tracking-[-0.02em] text-charcoal md:text-[28px]">
                  Privacy Policy
                </h1>
                <p className="text-sm text-muted">Last updated: {updated}</p>
              </div>
              <p className="mt-1.5 text-sm leading-snug text-muted-strong">
                Your privacy matters to us. This policy explains, in simple words, what information
                we collect when you contact <BrandName />, how we use it, and the choices you always
                have.
              </p>
            </header>

            <div className="mt-3 columns-1 [column-gap:14px] lg:columns-2">
              {sections.map((section, index) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="mb-[14px] inline-block w-full break-inside-avoid rounded-xl border border-brand-violet/10 bg-violet-tint p-4"
                >
                  {section.extraIds?.map((extraId) => (
                    <span key={extraId} id={extraId} className="sr-only" />
                  ))}
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

            <p id="contact" className="mt-3 text-sm text-muted-strong">
              Have a question about your privacy? We&apos;re happy to help: {email}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
