"use client";

import type { ReactNode } from "react";
import { useLeadModal } from "@/components/lead/LeadModal";
import type { BusinessType, Interest } from "@/lib/lead";

/** Opens the 2-step demo form in a modal. Pass `business` to preselect it and start on step 2. */
export default function DemoButton({
  children = "Get Free Demo",
  className = "",
  business,
  interests,
  onOpen,
}: {
  children?: ReactNode;
  className?: string;
  business?: BusinessType;
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
        open({ business, interests });
      }}
      className={className}
    >
      {children}
    </button>
  );
}
