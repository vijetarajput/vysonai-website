import Link from "next/link";
import ServiceIcon from "@/components/ServiceIcon";
import DemoButton from "@/components/lead/DemoButton";
import { offerings, type Offering } from "@/content/services";

const cardClass =
  "group flex h-full w-full flex-col rounded-2xl border border-border bg-white p-4 text-left shadow-soft transition-all duration-200 hover:border-brand-violet motion-safe:hover:-translate-y-1 hover:shadow-md focus-visible:border-brand-violet sm:p-5";

function CardBody({ offering }: { offering: Offering }) {
  const cta = offering.href ? "Learn more" : "Talk to us";
  return (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-tint text-brand-violet">
        <ServiceIcon name={offering.icon} size={24} />
      </span>
      <span className="mt-4 block font-heading text-base font-bold leading-snug text-charcoal sm:text-lg">
        {offering.title}
      </span>
      <span className="mt-1.5 block flex-1 text-sm leading-relaxed text-muted-strong">
        {offering.text}
      </span>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-violet">
        {cta}
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
        >
          →
        </span>
      </span>
    </>
  );
}

/**
 * Home services section: 8 simple cards. 4 columns on desktop, 2 on tablet and mobile.
 * The whole card is a link. Cards 6 to 8 open the "Book your free call" form instead.
 */
export default function ServiceCards() {
  return (
    <section id="services" className="scroll-mt-16 bg-violet-tint">
      <div className="site-container section-y">
        <div className="text-center">
          <h2>What we can do for your business</h2>
          <p className="measure mx-auto mt-3 text-lg text-muted-strong">
            Pick what you need. We set it up and make it work for you.
          </p>
        </div>

        <ul className="section-gap grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {offerings.map((offering) => (
            <li key={offering.title}>
              {offering.href ? (
                <Link href={offering.href} className={cardClass}>
                  <CardBody offering={offering} />
                </Link>
              ) : (
                <DemoButton interests={offering.interest ? [offering.interest] : undefined} className={cardClass}>
                  <CardBody offering={offering} />
                </DemoButton>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
