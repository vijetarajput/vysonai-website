"use client";

import ChatbotSlide from "@/components/showcase/ChatbotSlide";
import DashboardSlide from "@/components/showcase/DashboardSlide";
import { useReducedMotion } from "@/components/showcase/hooks";
import ReceptionistSlide from "@/components/showcase/ReceptionistSlide";
import WhatsAppSlide from "@/components/showcase/WhatsAppSlide";
import type { ServiceContent } from "@/content/services";

const slides = {
  whatsapp: { Slide: WhatsAppSlide },
  dashboard: { Slide: DashboardSlide },
  chatbot: { Slide: ChatbotSlide },
  receptionist: { Slide: ReceptionistSlide },
} as const;

/**
 * Hero visual for a service page: the same sample scene as the matching slide in the
 * home hero, plays once when the page opens. With "reduce motion" it shows complete.
 */
export default function ServiceVisual({ visual }: { visual: ServiceContent["visual"] }) {
  const reduced = useReducedMotion();
  const { Slide } = slides[visual];

  return (
    <div
      className="relative min-w-0 overflow-hidden rounded-[2rem] border border-brand-violet/10 bg-violet-tint p-3 sm:px-8 sm:py-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: "radial-gradient(rgb(124 58 237 / 0.22) 1.2px, transparent 1.4px)",
          backgroundSize: "20px 20px",
          maskImage: "radial-gradient(ellipse at center, black 35%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 95%)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span
          className="absolute h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: "15%",
            top: "20%",
            backgroundImage: "radial-gradient(circle closest-side, #7c3aed59, #7c3aed00)",
          }}
        />
        <span
          className="absolute h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: "88%",
            top: "82%",
            backgroundImage: "radial-gradient(circle closest-side, #2563eb59, #2563eb00)",
          }}
        />
      </div>

      <div data-active="true" className="relative h-[500px] pt-[26px]">
        <span className="absolute right-1 top-0 text-[10px] font-medium uppercase tracking-wider text-muted">
          Sample
        </span>
        <Slide active live={!reduced} />
      </div>
    </div>
  );
}
