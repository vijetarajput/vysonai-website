"use client";

import dynamic from "next/dynamic";

const CalculatorClient = dynamic(() => import("@/components/CalculatorClient"), {
  ssr: false,
  loading: () => (
    <div
      className="section-gap h-[28rem] animate-pulse rounded-3xl bg-violet-tint lg:h-[22rem]"
      aria-hidden="true"
    />
  ),
});

export default CalculatorClient;
