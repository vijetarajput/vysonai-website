"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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

/** A number that counts up when its storyboard card becomes active. */
export function CountUp({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    const host = node.closest("[data-active]");

    const play = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setN(to);
        return;
      }
      setN(0);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1100);
        setN(Math.round((1 - (1 - t) ** 3) * to));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (!host || host.getAttribute("data-active") === "true") {
      play();
      return () => cancelAnimationFrame(raf);
    }

    const observer = new MutationObserver(() => {
      if (host.getAttribute("data-active") === "true") {
        observer.disconnect();
        play();
      }
    });
    observer.observe(host, { attributes: true, attributeFilter: ["data-active"] });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n.toLocaleString("en-GB")}
    </span>
  );
}
