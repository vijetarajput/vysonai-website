"use client";

import { useId, useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import ChatbotSlide from "@/components/showcase/ChatbotSlide";
import DashboardSlide from "@/components/showcase/DashboardSlide";
import { useDocumentHidden, useReducedMotion } from "@/components/showcase/hooks";
import type { SlideProps } from "@/components/showcase/parts";
import ReceptionistSlide from "@/components/showcase/ReceptionistSlide";
import WhatsAppSlide from "@/components/showcase/WhatsAppSlide";

const SLIDE_MS = 6000;

const slides: { tab: string; Slide: ComponentType<SlideProps> }[] = [
  { tab: "WhatsApp", Slide: WhatsAppSlide },
  { tab: "Dashboard", Slide: DashboardSlide },
  { tab: "Chatbot", Slide: ChatbotSlide },
  { tab: "Receptionist", Slide: ReceptionistSlide },
];

/**
 * Auto-rotating, pure HTML/CSS showcase of the four services.
 *
 * - The progress bar on the active tab is a CSS animation. When it finishes, we move on.
 *   Pausing (hover, keyboard focus, hidden tab) just pauses that animation.
 * - All slides sit on top of each other in a box with a fixed height, so the page never jumps.
 * - With "reduce motion" there is no auto-rotation and no typing: slide 1 shows complete.
 */
export default function HeroShowcase() {
  const uid = useId();
  const reduced = useReducedMotion();
  const tabHidden = useDocumentHidden();

  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0); // changes on every click so the progress bar restarts
  const [hovering, setHovering] = useState(false);
  const [focusing, setFocusing] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const paused = hovering || focusing || tabHidden;
  const count = slides.length;

  function select(index: number) {
    setActive(index);
    setRound((n) => n + 1);
  }

  function next() {
    setActive((i) => (i + 1) % count);
    setRound((n) => n + 1);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let target = index;
    if (event.key === "ArrowRight") target = (index + 1) % count;
    else if (event.key === "ArrowLeft") target = (index - 1 + count) % count;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = count - 1;
    else return;
    event.preventDefault();
    select(target);
    tabRefs.current[target]?.focus();
  }

  return (
    <section
      aria-label="VYSON-AI service showcase with sample screens and conversations"
      className="relative mx-auto w-full max-w-[460px]"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
      onFocus={(e) => setFocusing(e.target.matches(":focus-visible"))}
      onBlur={() => setFocusing(false)}
    >
      {/* soft brand glow behind the showcase */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[3rem] bg-brand-gradient-diagonal opacity-25 blur-3xl"
      />

      {/* Fixed-height stage: 22px for the "Sample" label + the frame */}
      <div className="relative h-[512px]">
        {slides.map(({ Slide }, index) => {
          const isActive = index === active;
          return (
            <div
              key={index}
              id={`${uid}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${index}`}
              aria-hidden={!isActive}
              inert={!isActive}
              data-active={isActive}
              className={`absolute inset-0 pt-[22px] transition-[opacity,transform,visibility] duration-500 motion-reduce:transition-none ${
                isActive ? "visible translate-x-0 opacity-100" : "invisible translate-x-4 opacity-0"
              }`}
            >
              <span className="absolute right-1 top-0 text-[10px] font-medium uppercase tracking-wider text-muted">
                Sample
              </span>
              <Slide active={isActive} live={!reduced} />
            </div>
          );
        })}
      </div>

      <div role="tablist" aria-label="Choose a service example" className="mt-3 grid grid-cols-4 gap-1">
        {slides.map(({ tab }, index) => {
          const isActive = index === active;
          return (
            <button
              key={tab}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`${uid}-panel-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={`relative rounded-lg px-1 pb-3 pt-2 text-[12px] font-semibold transition-colors sm:text-sm ${
                isActive ? "text-brand-violet" : "text-muted-strong hover:text-charcoal"
              }`}
            >
              {tab}
              <span
                aria-hidden="true"
                className="absolute inset-x-1 bottom-1 h-0.5 overflow-hidden rounded-full bg-border"
              >
                {isActive &&
                  (reduced ? (
                    <span className="block h-full w-full bg-brand-violet" />
                  ) : (
                    <span
                      key={`${active}-${round}`}
                      className="vy-progress block h-full w-full bg-brand-violet"
                      style={{
                        animationDuration: `${SLIDE_MS}ms`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                      onAnimationEnd={next}
                    />
                  ))}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
