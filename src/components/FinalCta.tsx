import type { ReactNode } from "react";
import DemoButton from "@/components/lead/DemoButton";
import type { Interest } from "@/lib/lead";

export default function FinalCta({
  heading = "Ready to stop missing customers?",
  interests,
  buttonLabel,
  footnote,
}: {
  heading?: string;
  interests?: Interest[];
  /** Defaults to "Get Free Demo". */
  buttonLabel?: string;
  /** Small line shown under the button. */
  footnote?: ReactNode;
}) {
  return (
    <section className="on-dark bg-brand-gradient-diagonal">
      <div className="site-container section-y text-center">
        <h2 className="mx-auto max-w-3xl text-white">{heading}</h2>
        <DemoButton
          interests={interests}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium text-brand-violet shadow-soft transition-colors hover:bg-violet-tint"
        >
          {buttonLabel}
        </DemoButton>
        {footnote && <p className="mt-6 text-sm text-white/85">{footnote}</p>}
      </div>
    </section>
  );
}