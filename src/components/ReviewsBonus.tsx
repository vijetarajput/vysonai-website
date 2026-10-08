"use client";

import { useEffect, useRef, useState } from "react";
import { useChatSequence, useReducedMotion } from "@/components/showcase/hooks";
import { ChatRow, DoubleTick, FloatCard, PhoneShell } from "@/components/showcase/parts";

// Sample content. "FitZone Gym" and "Rahul" are fictional.
const typingMs = [600, 800, 600];

const steps = [
  "Visit ends",
  "Customer gets a thank-you message with your review link",
  "If someone had a problem, you get notified to fix it personally",
];

/**
 * "Bonus: More Google reviews, on autopilot" block for the WhatsApp Automation page.
 * The chat plays once, when the section scrolls into view (static with reduced motion).
 * Every customer gets the same message and link.
 */
export default function ReviewsBonus({ tone = "tint" }: { tone?: "white" | "tint" }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const { shown, typingIndex } = useChatSequence(inView, !reduced, typingMs);
  const live = !reduced;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const row = (i: number) => ({
    visible: !live || i < shown,
    typing: live && typingIndex === i,
  });

  return (
    <section className={tone === "tint" ? "bg-violet-tint" : "bg-white"}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-center">Bonus: More Google reviews, on autopilot</h2>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: short text and 3 steps on a thin line */}
          <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <h3 className="text-2xl">Happy customers are your best advertising.</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted-strong">
              After every visit, customers get a friendly WhatsApp message with your Google review
              link. Leaving a review takes one tap.
            </p>

            <ol className="mt-8">
              {steps.map((text, i) => (
                <li key={text} className="relative pb-7 pl-8 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[7px] h-3 w-3 rounded-full bg-brand-violet ring-4 ring-brand-violet/15"
                  />
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-[5.5px] top-[19px] w-px bg-brand-violet/30"
                    />
                  )}
                  <p className="font-medium leading-snug text-charcoal">{text}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: phone mockup */}
          <div ref={ref} data-active={inView} className="relative mx-auto h-[440px] w-full max-w-[470px]">
            <PhoneShell label="Example WhatsApp review request from FitZone Gym">
              <div className="flex items-center gap-3 border-b border-border bg-white px-4 pb-3 pt-8">
                <div
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-violet text-xs font-semibold text-white"
                >
                  FG
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold leading-tight text-charcoal">FitZone Gym</p>
                  <p className="text-xs text-muted">Business account</p>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-2 bg-violet-tint px-3 py-3">
                <ChatRow
                  side="left"
                  {...row(0)}
                  maxWidth="max-w-[92%]"
                  bubbleClass="rounded-2xl rounded-tl-sm bg-white px-3 py-1.5 shadow-sm"
                  typingClass="bg-white shadow-sm"
                >
                  <p className="text-[12px] leading-[1.4] text-charcoal xl:text-[12.5px]">
                    Thanks for visiting FitZone Gym today, Rahul! 🙏 How was your experience?
                  </p>
                  <p className="mt-0.5 text-right text-[10px] text-muted">6:15 PM</p>
                </ChatRow>

                <ChatRow
                  side="left"
                  {...row(1)}
                  maxWidth="max-w-[92%]"
                  bubbleClass="rounded-2xl rounded-tl-sm bg-white px-3 py-1.5 shadow-sm"
                  typingClass="bg-white shadow-sm"
                >
                  <p className="text-[12px] leading-[1.4] text-charcoal xl:text-[12.5px]">
                    If you have a minute, we&apos;d love a Google review: ⭐
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-1.5 flex items-center justify-center gap-1 rounded-lg bg-brand-violet px-3 py-1.5 text-[12px] font-semibold text-white"
                  >
                    Leave a review
                  </span>
                  <p className="mt-0.5 text-right text-[10px] text-muted">6:15 PM</p>
                </ChatRow>

                <ChatRow
                  side="right"
                  {...row(2)}
                  maxWidth="max-w-[70%]"
                  bubbleClass="rounded-2xl rounded-tr-sm bg-[#ede9fe] px-3 py-1.5 shadow-sm"
                  typingClass="bg-[#ede9fe]"
                >
                  <p className="text-[12px] leading-[1.4] text-charcoal xl:text-[12.5px]">
                    Done! Great trainers 💪
                  </p>
                  <div className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-muted">
                    <span>6:17 PM</span>
                    <DoubleTick className="text-brand-blue" />
                  </div>
                </ChatRow>
              </div>

              <div
                aria-hidden="true"
                className="flex shrink-0 items-center gap-2 border-t border-border bg-white px-3 py-2.5"
              >
                <div className="h-7 flex-1 rounded-full bg-violet-tint" />
                <div className="h-7 w-7 rounded-full bg-brand-violet" />
              </div>
            </PhoneShell>

            <FloatCard
              delay={3300}
              bob={400}
              className="bottom-3 left-0 sm:bottom-6 sm:left-auto sm:right-[calc(100%-127px)] xl:right-[calc(100%-107px)]"
            >
              <span aria-hidden="true">⭐</span> New 5-star review on Google
            </FloatCard>
          </div>
        </div>
      </div>
    </section>
  );
}
