import Link from "next/link";
import BrandName from "@/components/BrandName";
import DemoButton from "@/components/lead/DemoButton";
import PhoneMockup from "@/components/PhoneMockup";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1>
            Your customers get automatic WhatsApp reminders. You get more
            business.
          </h1>
          <p className="measure mt-5 text-lg leading-relaxed text-muted-strong">
            <BrandName /> helps gyms, clinics and local businesses automate
            follow-ups, reminders and customer records, so nothing slips through
            the cracks.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-violet px-6 py-3 text-sm font-medium text-brand-violet transition-colors hover:bg-violet-tint"
            >
              See Solutions
            </Link>
            <DemoButton className="inline-flex items-center justify-center rounded-full bg-brand-violet px-6 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark" />
          </div>
        </div>

        <PhoneMockup />
      </div>
    </section>
  );
}
