"use client";

import type { ReactNode } from "react";
import { useLeadModal } from "@/components/lead/LeadModal";
import type { Interest } from "@/lib/lead";

/** Long CTA from 640px up; short label on smaller screens so the button never wraps. */
export function CtaLabel({ suffix = "" }: { suffix?: string }) {
  return (
    <>
      <span className="whitespace-nowrap sm:hidden">Book free audit{suffix}</span>
      <span className="hidden whitespace-nowrap sm:inline">
        Book a free 30-min business audit{suffix}
      </span>
    </>
  );
}

/** Opens the 2-step demo form in a modal. */
export default function DemoButton({
  children = <CtaLabel />,
  className = "",
  interests,
  message,
  onOpen,
}: {
  children?: ReactNode;
  className?: string;
  /** Preselects these "What do you want to automate?" chips. */
  interests?: Interest[];
  /** Prefills the optional "What would you like to solve?" note. */
  message?: string;
  onOpen?: () => void;
}) {
  const { open } = useLeadModal();

  return (
    <button
      type="button"
      onClick={() => {
        onOpen?.();
        open({ interests, message });
      }}
      className={className}
    >
      {children}
    </button>
  );
}
