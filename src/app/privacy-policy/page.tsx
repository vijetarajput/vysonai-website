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

const updated = "8 October 2026";

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
      <>
        <p>
          <BrandName /> is an MSME-registered business ({siteConfig.udyam}) based
          in {siteConfig.location}.
        </p>
        <p>Contact: {email}</p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <p>What you enter in our forms:</p>
        <ul>
          <li>your name</li>
          <li>your WhatsApp number</li>
          <li>your email, if you give one</li>
          <li>the services you select</li>
          <li>any message you write</li>
        </ul>
        <p>
          We also record the page you sent the form from. Our website hosting provider records some
          basic technical information automatically for security, such as your IP address and
          browser type.
        </p>
        <p>We do not collect payment details on this website.</p>
      </>
    ),
  },
  {
    id: "why-we-use-it",
    title: "Why we use it",
    body: (
      <>
        <p>
          We use your details only to reply to your enquiry, arrange and hold a call or demo, and
          send you information you asked for.
        </p>
        <p>We do not sell your data or use it for unrelated marketing.</p>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "Legal basis and consent",
    body: (
      <p>
        We process your data with your consent (the checkbox on our form) and to respond to your
        request. This follows India&apos;s Digital Personal Data Protection Act, 2023, and, for
        visitors in the UK, the UK GDPR.
      </p>
    ),
  },
  {
    id: "who-we-share-it-with",
    title: "Who we share it with",
    body: (
      <>
        <p>
          Only trusted service providers that help us run this website and reply to you: our website
          hosting provider, and secure messaging and automation tools that deliver your enquiry to
          us.
        </p>
        <p>
          They may process data outside your country. We only use providers with appropriate
          security measures.
        </p>
      </>
    ),
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    body: (
      <>
        <p>
          We keep enquiry details for up to 12 months after our last contact. Then we delete them.
        </p>
        <p>
          If you become a client, we keep what is needed for our work and our legal obligations.
        </p>
      </>
    ),
  },
  {
    id: "how-we-protect-it",
    title: "How we protect it",
    body: (
      <p>
        We use secure (HTTPS) connections, we restrict who can access your details, and we keep
        secret keys out of the website code.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>
          You can ask to see, correct or delete your data, or withdraw your consent at any time, by
          emailing {email}. We reply within 30 days.
        </p>
        <p>
          If you are in the UK, you can also complain to the Information Commissioner&apos;s Office
          (ICO).
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    body: (
      <>
        <p>We do not use advertising or tracking cookies.</p>
        <p>
          We only store a small preference in your browser, for example if you close the
          announcement bar. If we add analytics in future, we will update this policy.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: <p>Our services are for businesses and are not intended for people under 18.</p>,
  },
  {
    id: "changes",
    title: "Changes",
    body: (
      <p>
        We may update this policy. The date at the top of this page shows the latest version.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: <p>{email}</p>,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy-policy" }]} width="narrow" />
      <section className="bg-white">
        <div className="site-container section-y">
          <div className="mx-auto max-w-3xl">
            <div className="max-w-[720px] text-[17px] leading-[1.75] text-muted-strong">
              <h1 className="text-charcoal">Privacy Policy</h1>
              <p className="mt-3 text-sm">Last updated: {updated}</p>

              <nav
                aria-label="Contents"
                className="mt-8 rounded-2xl border border-border bg-violet-tint p-5"
              >
                <p className="font-heading text-base font-semibold text-charcoal">Contents</p>
                <ol className="mt-3 grid list-decimal gap-x-8 gap-y-1.5 pl-5 text-[15px] leading-snug marker:text-brand-violet sm:grid-cols-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="link-brand">
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {sections.map((section, index) => (
                <section key={section.id} id={section.id} className="mt-10 scroll-mt-24">
                  <h2 className="text-2xl text-charcoal">
                    {index + 1}. {section.title}
                  </h2>
                  <div className="mt-3 space-y-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 [&_ul]:marker:text-brand-violet">
                    {section.body}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
