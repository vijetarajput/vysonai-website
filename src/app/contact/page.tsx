import type { Metadata } from "next";
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
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-6 pt-14 text-center sm:px-6 sm:pt-20">
          <h1>Let&apos;s Talk About Your Business</h1>
          <p className="measure mx-auto mt-5 text-lg text-muted-strong">
            Tell us what you do and where to reach you. We&apos;ll set up a free
            demo made for your business.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-8 sm:px-6 sm:pb-24 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <h2 className="sr-only">Request a free demo</h2>
            <div className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8">
              <LeadFlow layout="inline" />
            </div>
          </div>

          <aside className="rounded-3xl bg-violet-tint p-6 sm:p-8">
            <h2 className="text-2xl">Prefer to reach us directly?</h2>
            <ul className="mt-6 space-y-4 text-charcoal">
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
            <p className="mt-6 border-t border-border pt-5 font-medium text-charcoal">
              We reply within 24 hours.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
