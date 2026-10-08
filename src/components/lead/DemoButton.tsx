"use client";

import type { ReactNode } from "react";
import { useLeadModal } from "@/components/lead/LeadModal";
import type { Interest } from "@/lib/lead";

/** Opens the 2-step demo form in a modal. */
export default function DemoButton({
  children = "Get Free Demo",
  className = "",
  interests,
  onOpen,
}: {
  children?: ReactNode;
  className?: string;
  /** Preselects these "What do you want to automate?" chips. */
  interests?: Interest[];
  onOpen?: () => void;
}) {
  const { open } = useLeadModal();

  return (
    <button
      type="button"
      onClick={() => {
        onOpen?.();
        open({ interests });
      }}
      className={className}
    >
      {children}
    </button>
  );
}
