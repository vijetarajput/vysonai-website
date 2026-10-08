"use client";

import { useSyncExternalStore } from "react";
import DemoButton from "@/components/lead/DemoButton";

const STORAGE_KEY = "vyson-announcement-hidden";
const EVENT = "vyson-announcement-change";

function readHidden() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

/**
 * Static announcement bar above the header. The "×" button hides it and remembers the
 * choice in localStorage. A tiny script in the layout hides it before the first paint for
 * people who already closed it, so it never flashes.
 */
export default function AnnouncementBar() {
  const hidden = useSyncExternalStore(subscribe, readHidden, () => false);

  if (hidden) return null;

  function hide() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage can be blocked. The bar still closes for this visit.
    }
    document.documentElement.setAttribute("data-announcement-hidden", "");
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="announcement-bar relative border-b border-border bg-violet-tint"
    >
      <div className="mx-auto flex min-h-9 max-w-6xl items-center justify-center py-1.5 pl-4 pr-11 text-center text-[12px] leading-tight text-charcoal sm:text-[13px]">
        <p>
          <span className="hidden sm:inline">
            Free 15-minute call: find out how many hours AI can save your business.
          </span>
          <span className="sm:hidden">Free 15-min call: see how much time AI can save you.</span>{" "}
          <DemoButton className="whitespace-nowrap font-medium text-brand-violet underline-offset-2 hover:underline focus-visible:rounded-sm">
            Book now →
          </DemoButton>
        </p>
      </div>
      <button
        type="button"
        onClick={hide}
        aria-label="Hide this message"
        className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-white focus-visible:bg-white"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
