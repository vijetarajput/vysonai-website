"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

/** Time between one step appearing and the next one (ms). */
const STAGGER = 400;

/** Shared across all step cards: the earliest moment the next step may appear. */
const queue = { next: 0 };

/**
 * One storyboard card. It fades in and rises a little the first time it scrolls into view.
 * If several cards come into view together, they appear one after another, 400ms apart.
 * Inside the card, the helper classes in globals.css (.ss-in, .sb-slide, .sb-wave ...) start
 * their own animations once data-active="true" is set. With "reduce motion" (or without
 * JavaScript) the CSS shows everything finished, so nothing waits and nothing moves.
 */
export function StepCard({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const reveal = () => {
      const now = performance.now();
      const wait = Math.max(0, queue.next - now);
      queue.next = now + wait + STAGGER;
      timer = setTimeout(() => setActive(true), wait);
    };

    if (typeof IntersectionObserver === "undefined") {
      timer = setTimeout(() => setActive(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          reveal();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <article ref={ref} data-active={active} className={`sb-step ${className}`}>
      {children}
    </article>
  );
}

function formatToday() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")}, ${get("day")} ${get("month")} ${get("year")}`;
}

const noopSubscribe = () => () => {};

/** Today's date, like "Friday, 9 October 2026". Empty on the server, filled in on the visitor's device. */
export function TodayDate() {
  const text = useSyncExternalStore(noopSubscribe, formatToday, () => "");
  return <span suppressHydrationWarning>{text || "\u00a0"}</span>;
}
