import type { ReactNode } from "react";
import { StepCard } from "@/components/storyboard/client";
import {
  CallScreen,
  CallerIllustration,
  ConfirmationPhone,
  DashboardMonitor,
  Panel,
} from "@/components/storyboard/visuals";

/** Dotted violet line (used for the path between the number badges). */
const dotted = "pointer-events-none absolute hidden border-dotted border-brand-violet/60 lg:block";

function Step({
  n,
  title,
  last = false,
  caption,
  className = "",
  children,
}: {
  n: number;
  title: string;
  last?: boolean;
  caption?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <StepCard
      className={`relative flex min-w-0 flex-col rounded-3xl border border-border bg-white p-5 shadow-soft lg:p-6 ${className}`}
    >
      {/* Mobile: dotted line down the left side, from this badge to the next one */}
      {!last && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 top-[34px] h-[calc(100%+40px)] w-0 -translate-x-px border-l-2 border-dotted border-brand-violet/60 lg:hidden"
        />
      )}
      <span
        aria-hidden="true"
        className="absolute -left-[42px] top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-violet font-heading text-base font-bold text-white ring-4 ring-violet-tint lg:-top-8 lg:left-4"
      >
        {n}
      </span>
      <h3 className="text-lg font-bold leading-snug">
        <span className="sr-only">Step {n}: </span>
        {title}
      </h3>
      <div className="mt-4 flex flex-1 flex-col">
        <Panel>{children}</Panel>
        {caption && <p className="mt-3 text-center text-sm text-muted-strong">{caption}</p>}
      </div>
    </StepCard>
  );
}

/**
 * "How it works" for /services/ai-receptionist: a four-step visual storyboard.
 * Everything is HTML, CSS and inline SVG. All names, numbers and times are made up.
 */
export default function HowItWorksStoryboard() {
  return (
    <section className="bg-violet-tint">
      <div className="site-container section-y relative">
        <span className="absolute right-4 top-3 text-[10px] font-medium uppercase tracking-wider text-muted sm:right-6 lg:right-8">
          Sample
        </span>
        <h2 className="text-center">How it works</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-lg leading-snug text-muted-strong">
          From a phone call to a booked appointment, automatically.
        </p>

        <div className="section-gap pl-12 lg:pl-0 lg:pt-8">
          {/* Row 1: steps 1 and 2 */}
          <div className="relative flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-6">
            {/* Dotted path (desktop): 1 to 2, then down between the cards and back to 3 */}
            <span aria-hidden="true" className={`${dotted} -top-[15px] left-[34px] w-[calc(50%+12px)] border-t-2`} />
            <span aria-hidden="true" className={`${dotted} -top-[14px] left-[calc(50%-1px)] h-[calc(100%+46px)] border-l-2`} />
            <span aria-hidden="true" className={`${dotted} left-[34px] top-[calc(100%+31px)] w-[calc(50%-34px)] border-t-2`} />
            <span aria-hidden="true" className={`${dotted} left-[33px] top-[calc(100%+32px)] h-[18px] border-l-2`} />

            <Step n={1} title="A customer calls your business">
              <CallerIllustration />
            </Step>
            <Step n={2} title="Your AI receptionist answers and helps">
              <CallScreen />
            </Step>
          </div>

          {/* Row 2: steps 3 (wide) and 4 */}
          <div className="relative mt-10 flex flex-col gap-10 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,13fr)_minmax(0,7fr)] lg:gap-6">
            {/* Dotted path (desktop): 3 to 4 */}
            <span
              aria-hidden="true"
              className={`${dotted} -top-[15px] left-[34px] w-[calc((100%-24px)*0.65+24px)] border-t-2`}
            />

            <Step
              n={3}
              title="Appointment booked in your calendar"
              caption="See every booking on your dashboard."
            >
              <DashboardMonitor />
            </Step>
            <Step
              n={4}
              last
              title="Your customer gets a confirmation"
              caption="Fewer no-shows, without any calls from your team."
            >
              <ConfirmationPhone />
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
}
