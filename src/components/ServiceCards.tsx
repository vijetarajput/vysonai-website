import ServiceCard from "@/components/ServiceCard";
import ServiceMiniVisual from "@/components/ServiceMiniVisuals";
import DemoButton from "@/components/lead/DemoButton";
import { serviceCards } from "@/content/services";

/**
 * Home page services section: four small, curiosity-driven cards that lead to the
 * service pages, plus a slim strip for visitors who are not sure which one fits.
 * Desktop: one row of 4. Tablet: 2x2. Mobile: a swipeable row with the next card peeking.
 */
export default function ServiceCards() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6 sm:pt-20 sm:pb-12">
          <div className="text-center">
            <h2>Where is your business losing time and money?</h2>
            <p className="measure mx-auto mt-3 text-muted-strong">
              Tap a card to see how it works for a business like yours.
            </p>
          </div>

          <ul className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 pb-6 pt-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-2 cards:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {serviceCards.map((card) => (
              <li key={card.slug} className="w-[272px] shrink-0 snap-start sm:w-auto">
                <ServiceCard card={card} visual={<ServiceMiniVisual slug={card.slug} />} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Slim strip for visitors who are not sure */}
      <section className="border-y border-brand-violet/10 bg-violet-tint">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-4 py-5 text-center sm:flex-row sm:gap-6 sm:px-6">
          <p className="font-heading text-lg font-bold text-charcoal">
            Not sure which one fits your business?
          </p>
          <DemoButton className="inline-flex items-center justify-center rounded-full bg-brand-violet px-6 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark">
            Book a free 15-minute call
          </DemoButton>
        </div>
      </section>
    </>
  );
}
