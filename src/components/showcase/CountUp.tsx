"use client";

import { useLayoutEffect, useRef } from "react";

function format(value: number, prefix: string) {
  return `${prefix}${Math.round(value).toLocaleString("en-IN")}`;
}

/**
 * A number that counts up from 0 when its slide becomes active.
 *
 * The final value is what the server renders (and what reduced-motion visitors see).
 * While counting, the text is written straight into the element, so React does not
 * re-render on every animation frame.
 */
export default function CountUp({
  to,
  active,
  live,
  prefix = "",
  delay = 350,
  duration = 1200,
}: {
  to: number;
  active: boolean;
  live: boolean;
  prefix?: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = format(to, prefix);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || !live || !active) return;

    let frame = 0;
    const startAt = performance.now() + delay;
    element.textContent = format(0, prefix);

    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - startAt) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      element.textContent = format(to * eased, prefix);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      element.textContent = final;
    };
  }, [active, live, to, prefix, delay, duration, final]);

  return (
    <span ref={ref} className="tabular-nums">
      {final}
    </span>
  );
}
