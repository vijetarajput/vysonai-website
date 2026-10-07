import PhoneMockup from "@/components/PhoneMockup";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl text-brand-violet sm:text-6xl">VYSON AI</h1>
        <p className="measure mx-auto mt-4 text-lg text-muted lg:mx-0">
          {siteConfig.brandTagline}
        </p>
      </div>
      <PhoneMockup />
    </section>
  );
}
