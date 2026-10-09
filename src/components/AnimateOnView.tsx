"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Sets data-active="true" once when it scrolls into view, so storyboard helper classes
 * (.ss-in, .sb-slide, .sb-ping) can run. Until then the CSS first frame stays still.
 */
export function AnimateOnView({ children, className = "" }: { children: ReactNode; className?: string }) {
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
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-active={active} className={className}>
      {children}
    </div>
  );
}
