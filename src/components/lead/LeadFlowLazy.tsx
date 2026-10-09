"use client";

import dynamic from "next/dynamic";

const LeadFlowLazy = dynamic(() => import("@/components/lead/LeadFlow"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[28rem] animate-pulse rounded-2xl bg-violet-tint" aria-hidden="true" />
  ),
});

export default LeadFlowLazy;
