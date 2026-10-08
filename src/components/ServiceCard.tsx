"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ServiceCardData } from "@/content/services";

/**
 * One small curiosity card on the home page. The whole card is a link.
 *
 * The mini-visual plays (data-play) when:
 * - a mouse hovers the card, or it has keyboard focus (desktop), or
 * - the card scrolls into view once (touch screens, which have no hover).
 * All hover styling (lift, gradient border, tint, reveal line) is plain CSS in globals.css.
 */
export default function ServiceCard({
  card,
  visual,
}: {
  card: ServiceCardData;
  visual: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.7 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={card.href}
      data-play={play}
      className="sc group"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPlay(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPlay(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setPlay(true)}
      onBlur={() => setPlay(false)}
    >
      <div className="sc-visual" aria-hidden="true">
        {visual}
      </div>

      <p className="mt-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-brand-violet">
        {card.eyebrow}
      </p>
      <h3 className="mt-1.5 line-clamp-3 text-[20px] font-bold leading-[1.25]">{card.title}</h3>
      <p className="sc-reveal mt-2 text-[13px] leading-snug text-muted-strong">{card.reveal}</p>

      <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-brand-violet">
        See how it works
        <span className="sc-arrow" aria-hidden="true">
          &rarr;
        </span>
      </span>
    </Link>
  );
}
