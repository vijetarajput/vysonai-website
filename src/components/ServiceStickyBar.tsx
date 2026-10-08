"use client";

import { useEffect, useState } from "react";
import DemoButton from "@/components/lead/DemoButton";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import type { Interest } from "@/lib/lead";

/**
 * Mobile-only bar with "Book Free Demo" and a WhatsApp button. It slides in once the
 * visitor has scrolled past the hero (the element with id="service-hero").
 * While it exists, the floating WhatsApp button is hidden on mobile (see globals.css).
 */
export default function ServiceStickyBar({ interests }: { interests: Interest[] }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("service-hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      // Past the hero = hero is off screen and above the viewport
      setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-sticky-bar
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-white/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgb(31_41_55/0.25)] backdrop-blur transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <DemoButton
        interests={interests}
        className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-brand-violet px-5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark"
      >
        Book Free Demo
      </DemoButton>
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-whatsapp text-charcoal shadow-soft transition-colors hover:bg-whatsapp-dark"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
