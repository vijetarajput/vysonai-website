"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FloatCard } from "@/components/showcase/parts";

export type SceneBadge = {
  content: ReactNode;
  /** Absolute position classes, for example "bottom-2 left-3". */
  className: string;
  /** Pop-in delay in ms after the scene scrolls into view. */
  delay: number;
  /** Delay of the gentle floating motion in ms. */
  bob?: number;
};

/**
 * Reusable picture panel for service pages. HTML and CSS only (no images, no logos).
 *
 * - Rounded panel on the violet tint with a soft dot grid
 * - Put one main "device" in `children` (it is centred)
 * - Up to two small floating badge cards that overlap the device a little
 * - A muted "Sample" label in the top-left corner
 * - Fixed height, never wider than its column (overflow is clipped)
 *
 * The scene sets data-active="true" once, when it first scrolls into view. Children animate
 * from that moment with the helper classes in globals.css (.ss-in, .ss-fill, .ss-ring, and
 * the .vy-pop / .vy-float used by the badges). With "reduce motion" everything is shown
 * finished and nothing moves.
 */
export default function ServiceScene({
  children,
  badges = [],
  label = "Sample",
  className = "",
}: {
  children: ReactNode;
  badges?: SceneBadge[];
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setActive(true), 0);
      return () => clearTimeout(t);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-active={active}
      className={`relative h-[480px] w-full min-w-0 max-w-full overflow-hidden rounded-[2rem] border border-brand-violet/10 bg-violet-tint ${className}`}
    >
      {/* Soft dot grid, fading out towards the edges */}
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

      <span className="absolute left-4 top-3 z-30 text-[10px] font-medium uppercase tracking-wider text-muted">
        {label}
      </span>

      <div className="absolute inset-0 flex items-center justify-center px-3 py-[35px]">
        {children}
      </div>

      {badges.slice(0, 2).map((badge, index) => (
        <FloatCard key={index} wide delay={badge.delay} bob={badge.bob ?? index * 700} className={badge.className}>
          {badge.content}
        </FloatCard>
      ))}
    </div>
  );
}
