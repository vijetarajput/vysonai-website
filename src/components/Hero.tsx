import Link from "next/link";
import DemoButton from "@/components/lead/DemoButton";
import HeroShowcase from "@/components/showcase/HeroShowcase";

/** The hero copy and the two buttons. Rendered on the server and handed to the showcase as a slot. */
function HeroText() {
  return (
    <div>
      <h1 className="text-balance">
        <span className="block font-sans text-base font-medium leading-snug text-muted-strong md:text-xl">
          We help your business
        </span>
        <span className="mt-3 block text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-charcoal md:text-[64px]">
          <span className="inline-block">Save Time.</span>{" "}
          <span className="inline-block">Save Money.</span>
        </span>
        <span className="mt-2 block text-[32px] font-extrabold leading-[1.1] tracking-[-0.025em] text-charcoal md:text-5xl">
          <span className="inline-block">Grow Your</span>{" "}
          <span className="text-brand-violet">
            <span className="inline-block">Profit &amp;</span>{" "}
            <span className="inline-block">Productivity.</span>
          </span>
        </span>
        <span className="mt-4 block font-sans text-[17px] font-normal leading-snug text-muted-strong md:text-xl">
          with custom AI solutions built for your business.
        </span>
      </h1>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <DemoButton className="inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark" />
        <Link
          href="/#services"
          className="inline-flex items-center justify-center rounded-full border-2 border-brand-violet px-7 py-3.5 text-base font-medium text-brand-violet transition-colors hover:bg-violet-tint"
        >
          Explore Services
        </Link>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="flex bg-white lg:min-h-[90vh] lg:items-center">
      <HeroShowcase intro={<HeroText />} />
    </section>
  );
}
