import DemoButton from "@/components/lead/DemoButton";
import type { Interest } from "@/lib/lead";

/** Closing band for service pages: brand gradient, white text, one white button. */
export default function FinalCta({
  heading,
  interests,
  buttonLabel = "Book a free call",
}: {
  heading: string;
  /** Preselected in the form when the button opens it. */
  interests?: Interest[];
  buttonLabel?: string;
}) {
  return (
    <section className="on-dark bg-brand-gradient-diagonal">
      <div className="site-container section-y text-center">
        <h2 className="mx-auto max-w-3xl text-white">{heading}</h2>
        <DemoButton
          interests={interests}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-medium text-brand-violet shadow-soft transition-colors hover:bg-violet-tint md:mt-8"
        >
          {buttonLabel}
        </DemoButton>
      </div>
    </section>
  );
}
