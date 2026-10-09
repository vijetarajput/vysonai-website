import type { ReactNode } from "react";
import DemoButton from "@/components/lead/DemoButton";
import type { Interest } from "@/lib/lead";

const buttonClass =
  "inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark";

/**
 * Hero for service pages: text on the left, a <ServiceScene> on the right (stacked on mobile).
 * The page must render exactly one of these (it holds the only H1).
 */
export default function ServiceHero({
  pill = "Now taking early clients",
  title,
  text,
  interests,
  buttonLabel,
  note,
  scene,
}: {
  pill?: string;
  title: ReactNode;
  text: string;
  interests: Interest[];
  buttonLabel?: ReactNode;
  /** Small muted line under the button, for example a target caveat. */
  note?: string;
  scene: ReactNode;
}) {
  return (
    <section className="bg-white">
      <div className="site-container hero-y grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="inline-flex rounded-full bg-violet-tint px-3.5 py-1.5 text-sm font-semibold text-brand-violet">
            {pill}
          </p>
          <h1 className="mt-4 text-[2.25rem] leading-[1.1] md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-lg leading-snug text-muted-strong md:text-xl">{text}</p>
          <div className="mt-7">
            <DemoButton interests={interests} className={buttonClass}>
              {buttonLabel}
            </DemoButton>
          </div>
          {note ? <p className="mt-3 max-w-xl text-sm text-muted">{note}</p> : null}
        </div>
        {scene}
      </div>
    </section>
  );
}