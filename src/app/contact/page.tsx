import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadFlow from "@/components/lead/LeadFlow";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteConfig } from "@/config/site";

const title = "Contact Us";
const description =
  "Tell us about your business and get a free demo of WhatsApp automation, a customer dashboard and an AI receptionist. We reply within 24 hours.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: `${title} | ${siteConfig.name}`, description, url: "/contact", type: "website" },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      <section className="bg-white">
        <div className="site-container pt-2 text-center">
          <h1 className="text-[1.75rem] sm:text-4xl lg:text-[2.5rem]">
            Let&apos;s Talk About Your Business
          </h1>
          <p className="mx-auto mt-2 max-w-4xl text-base leading-snug text-muted-strong sm:text-lg">
            Tell us what you do and where to reach you. We&apos;ll set up a free demo made for
            your business.
          </p>
        </div>

        <div className="site-container section-gap grid grid-cols-[minmax(0,1fr)] gap-6 pb-10 md:pb-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:pb-[4.5rem]">
          <div>
            <h2 className="sr-only">Request a free demo</h2>
            <div className="rounded-3xl border border-border bg-white p-5 shadow-soft sm:p-6">
              <LeadFlow layout="inline" />
            </div>
          </div>

          <aside className="rounded-3xl bg-violet-tint p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl">Prefer to reach us directly?</h2>
            <ul className="mt-4 space-y-3 text-charcoal">
              <li>
                <WhatsAppButton large label="Chat on WhatsApp" />
              </li>
              <li>
                <span className="block text-sm font-semibold text-muted-strong">Email</span>
                <a href={`mailto:${siteConfig.email}`} className="link-brand break-all">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="block text-sm font-semibold text-muted-strong">LinkedIn</span>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-brand"
                >
                  Visit our LinkedIn page
                </a>
              </li>
              <li>
                <span className="block text-sm font-semibold text-muted-strong">Based in</span>
                {siteConfig.location}
              </li>
            </ul>
            <p className="mt-4 border-t border-border pt-4 font-medium text-charcoal">
              We reply within 24 hours.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
