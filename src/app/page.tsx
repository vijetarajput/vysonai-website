import BrandName from "@/components/BrandName";
import PhoneMockup from "@/components/PhoneMockup";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl sm:text-6xl">
            <BrandName />
          </h1>
          <p className="measure mx-auto mt-5 text-lg text-muted lg:mx-0">
            {siteConfig.tagline}
          </p>
        </div>
        <PhoneMockup />
      </section>

      {/* placeholder target for the header "Get Free Demo" button (/#demo) */}
      <section id="demo" className="scroll-mt-16 bg-violet-tint">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl">Get your free demo</h2>
          <p className="measure mx-auto mt-3 text-muted-strong">
            Tell us about your business on WhatsApp and we will show you what
            automation can do.
          </p>
          <WhatsAppButton className="mt-6" />
        </div>
      </section>
    </>
  );
}
