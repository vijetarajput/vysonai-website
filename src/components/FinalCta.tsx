import DemoButton from "@/components/lead/DemoButton";
import type { Interest } from "@/lib/lead";

export default function FinalCta({
  heading = "Ready to stop missing customers?",
  interests,
  buttonLabel,
}: {
  heading?: string;
  interests?: Interest[];
  /** Defaults to "Get Free Demo". */
  buttonLabel?: string;
}) {
  return (
    <section className="on-dark bg-brand-gradient-diagonal">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="text-white">{heading}</h2>
        <DemoButton
          interests={interests}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium text-brand-violet shadow-soft transition-colors hover:bg-violet-tint"
        >
          {buttonLabel}
        </DemoButton>
      </div>
    </section>
  );
}