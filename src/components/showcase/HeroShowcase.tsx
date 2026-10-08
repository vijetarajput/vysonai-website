"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import ChatbotSlide from "@/components/showcase/ChatbotSlide";
import DashboardSlide from "@/components/showcase/DashboardSlide";
import { useDocumentHidden, useReducedMotion } from "@/components/showcase/hooks";
import type { SlideProps } from "@/components/showcase/parts";
import ReceptionistSlide from "@/components/showcase/ReceptionistSlide";
import WhatsAppSlide from "@/components/showcase/WhatsAppSlide";

const SLIDE_MS = 6000;

const BLUE = "#2563eb";
const VIOLET = "#7c3aed";
const MAGENTA = "#c026d3";

type Glow = { color: string; left: number; top: number };

const slides: {
  Slide: ComponentType<SlideProps>;
  title: string;
  line: string;
  glows: [Glow, Glow, Glow];
}[] = [
  {
    Slide: WhatsAppSlide,
    title: "WhatsApp on autopilot",
    line: "Every customer gets an instant reply, even at midnight.",
    glows: [
      { color: VIOLET, left: 15, top: 20 },
      { color: BLUE, left: 88, top: 82 },
      { color: MAGENTA, left: 82, top: 14 },
    ],
  },
  {
    Slide: DashboardSlide,
    title: "Your whole business, one screen",
    line: "Sales, stock and reports in seconds.",
    glows: [
      { color: BLUE, left: 12, top: 78 },
      { color: VIOLET, left: 85, top: 18 },
      { color: MAGENTA, left: 55, top: 105 },
    ],
  },
  {
    Slide: ChatbotSlide,
    title: "A website that catches leads while you sleep",
    line: "Your AI chatbot answers and collects every enquiry.",
    glows: [
      { color: MAGENTA, left: 10, top: 22 },
      { color: VIOLET, left: 75, top: 85 },
      { color: BLUE, left: 92, top: 15 },
    ],
  },
  {
    Slide: ReceptionistSlide,
    title: "Never miss a call again",
    line: "A 24/7 AI receptionist that books clients for you.",
    glows: [
      { color: VIOLET, left: 50, top: 5 },
      { color: BLUE, left: 8, top: 88 },
      { color: MAGENTA, left: 92, top: 78 },
    ],
  },
];

/**
 * The whole hero: intro text on the left, an auto-rotating showcase of the four
 * services on the right, and four large tab cards underneath that also control it.
 *
 * - Each card's progress bar is a CSS animation; when it finishes we move on.
 *   Pausing (hover, keyboard focus, hidden tab) just pauses that animation.
 * - All slides sit on top of each other in a box with a fixed height, so the page never jumps.
 * - With "reduce motion" there is no auto-rotation and nothing animates: slide 1 shows complete.
 */
export default function HeroShowcase({ intro }: { intro: ReactNode }) {
  const uid = useId();
  const reduced = useReducedMotion();
  const tabHidden = useDocumentHidden();

  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0); // changes on every click so the progress bar restarts
  const [hovering, setHovering] = useState(false);
  const [focusing, setFocusing] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

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

  // On phones the cards are a swipeable row: keep the active card in view (scrolls only that row)
  useEffect(() => {
    const box = listRef.current;
    const card = tabRefs.current[active];
    if (!box || !card || box.scrollWidth <= box.clientWidth + 1) return;
    box.scrollTo({
      left: card.offsetLeft - (box.clientWidth - card.offsetWidth) / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, reduced]);

  const hoverProps = {
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setHovering(true),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && setHovering(false),
  };

  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-6">
      <div className="grid items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-12">
        {intro}

        <section
          aria-label="VYSON-AI service showcase with sample screens and conversations"
          className="relative min-w-0 overflow-hidden rounded-[2rem] border border-brand-violet/10 bg-violet-tint p-3 sm:p-6 lg:p-5"
          onFocus={(e) => setFocusing(e.target.matches(":focus-visible"))}
          onBlur={() => setFocusing(false)}
          {...hoverProps}
        >
          {/* Decorative background: dot grid + blurred brand glows that drift with the active slide */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage: "radial-gradient(rgb(124 58 237 / 0.22) 1.2px, transparent 1.4px)",
              backgroundSize: "20px 20px",
              maskImage: "radial-gradient(ellipse at center, black 35%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 95%)",
            }}
          />
          {slides.map(({ glows }, slideIndex) => (
            <div
              key={slideIndex}
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none ${
                slideIndex === active ? "opacity-100" : "opacity-0"
              }`}
            >
              {glows.map((glow, i) => (
                <span
                  key={i}
                  className="absolute h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    left: `${glow.left}%`,
                    top: `${glow.top}%`,
                    backgroundImage: `radial-gradient(circle closest-side, ${glow.color}59, ${glow.color}00)`,
                  }}
                />
              ))}
            </div>
          ))}

          {/* Fixed-height stage: room for the "Sample" label plus the device */}
          <div className="relative h-[500px] lg:h-[452px]">
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
                  className={`absolute inset-0 pt-[26px] transition-[opacity,transform,visibility] duration-[600ms] ease-out motion-reduce:transition-none ${
                    isActive
                      ? "visible translate-x-0 scale-100 opacity-100"
                      : "invisible translate-x-8 scale-[0.96] opacity-0"
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
        </section>
      </div>

      {/* Tab cards: the slider controls */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="Choose a service example"
        className="relative -mx-4 mt-4 flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 pb-3 pt-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-pl-6 sm:px-6 lg:mx-0 lg:mt-4 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-1 [&::-webkit-scrollbar]:hidden"
        {...hoverProps}
      >
        {slides.map(({ title, line }, index) => {
          const isActive = index === active;
          return (
            <button
              key={title}
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
              className={`relative flex w-[268px] shrink-0 snap-start flex-col items-start justify-start gap-1 self-stretch overflow-hidden rounded-2xl border-2 px-3.5 pb-3.5 pt-3 text-left transition-[transform,box-shadow,border-color,background-color] duration-300 lg:w-auto ${
                isActive
                  ? "-translate-y-1 border-brand-violet bg-white shadow-[0_18px_40px_-14px_rgb(124_58_237/0.5)]"
                  : "border-border bg-white/70 hover:border-brand-violet/40 hover:bg-white"
              }`}
            >
              <span className="font-heading text-base font-bold leading-tight text-charcoal">{title}</span>
              <span className="line-clamp-2 text-[13px] leading-[1.3] text-muted-strong">{line}</span>

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden bg-border/70"
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
    </div>
  );
}
