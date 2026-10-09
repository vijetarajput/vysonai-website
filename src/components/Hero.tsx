import Link from "next/link";
import DemoButton from "@/components/lead/DemoButton";
import HeroShowcase from "@/components/showcase/HeroShowcase";

/**
 * The hero copy and the two buttons. Rendered on the server and handed to the showcase as a slot.
 * The wrapper is a size container: the headline is sized from the column width (68px at most)
 * so each line always fits on one line, from 375px phones to wide desktops.
 */
function HeroText() {
  return (
    <div className="[container-type:inline-size]">
      <h1 className="font-extrabold leading-[1.04] tracking-[-0.03em] [font-size:min(68px,calc(100cqw/16.2))]">
        <span className="block whitespace-nowrap text-charcoal">Get AI Employees Working for You.</span>
        <span className="block whitespace-nowrap text-brand-violet">24/7.</span>
      </h1>

      <p className="mt-5 max-w-[34rem] text-lg leading-snug text-muted-strong md:text-xl">
        We build AI agents that handle your calls, WhatsApp chats, customers, stock and marketing,
        day and night, so you can focus on growth.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <DemoButton className="inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark" />
        <Link
          href="/#services"
          className="inline-flex items-center justify-center rounded-full border-2 border-brand-violet px-7 py-3.5 text-base font-medium text-brand-violet transition-colors hover:bg-violet-tint"
        >
          See what they can do <span aria-hidden="true">&nbsp;&darr;</span>
        </Link>
      </div>

      <p className="mt-7 border-t border-border pt-4 text-sm leading-relaxed text-muted-strong">
        Built on product and data experience from London and Dubai · For businesses in the US,
        the UK and India
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-white">
      <HeroShowcase intro={<HeroText />} />
    </section>
  );
}