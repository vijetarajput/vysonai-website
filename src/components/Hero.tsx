import Link from "next/link";
import type { ReactNode } from "react";
import DemoButton from "@/components/lead/DemoButton";
import HeroShowcase from "@/components/showcase/HeroShowcase";

function ChipIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const chips = [
  {
    label: "WhatsApp Automation",
    icon: (
      <ChipIcon>
        <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.4A8 8 0 1121 12z" />
        <path d="M9 11h6M9 14h4" />
      </ChipIcon>
    ),
  },
  {
    label: "Customer Dashboard",
    icon: (
      <ChipIcon>
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </ChipIcon>
    ),
  },
  {
    label: "AI Chatbot",
    icon: (
      <ChipIcon>
        <rect x="4" y="8" width="16" height="12" rx="3" />
        <path d="M12 8V4M9 13h.01M15 13h.01M9.5 16.5h5" />
      </ChipIcon>
    ),
  },
  {
    label: "AI Receptionist",
    icon: (
      <ChipIcon>
        <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
      </ChipIcon>
    ),
  },
];
export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div>
          <h1 className="text-balance">
            <span className="block font-sans text-base font-medium leading-snug text-muted-strong md:text-xl">
              We help your business
            </span>
            <span className="mt-3 block text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-charcoal md:text-[64px]">
              <span className="inline-block">Save Time.</span>{" "}
              <span className="inline-block">Save Money.</span>
            </span>
            <span className="mt-2 block text-[32px] font-extrabold leading-[1.1] tracking-[-0.025em] text-charcoal md:text-5xl">
              <span className="inline-block">Grow Your</span>{" "}
              <span className="text-brand-violet">
                <span className="inline-block">Profit &amp;</span>{" "}
                <span className="inline-block">Productivity.</span>
              </span>
            </span>
            <span className="mt-4 block font-sans text-[17px] font-normal leading-snug text-muted-strong md:text-xl">
              with custom AI solutions built for your business.
            </span>
          </h1>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {chips.map((chip) => (
              <li
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full bg-violet-tint px-4 py-2 text-sm font-medium text-charcoal"
              >
                <span className="text-brand-violet">{chip.icon}</span>
                {chip.label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <DemoButton className="inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark" />
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-violet px-7 py-3.5 text-base font-medium text-brand-violet transition-colors hover:bg-violet-tint"
            >
              See Solutions
            </Link>
          </div>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}
