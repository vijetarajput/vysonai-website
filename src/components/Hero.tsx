import Link from "next/link";
import type { ReactNode } from "react";
import DemoButton from "@/components/lead/DemoButton";
import PhoneMockup from "@/components/PhoneMockup";

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
    label: "Reminders",
    icon: (
      <ChipIcon>
        <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 01-3.4 0" />
      </ChipIcon>
    ),
  },
  {
    label: "Follow-ups",
    icon: (
      <ChipIcon>
        <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.4A8 8 0 1121 12z" />
        <path d="M9 11h6M9 14h4" />
      </ChipIcon>
    ),
  },
  {
    label: "Customer dashboard",
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
    label: "Weekly report",
    icon: (
      <ChipIcon>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </ChipIcon>
    ),
  },
];

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div>
          <h1 className="text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[72px]">
            Never Miss a Customer Again
          </h1>
          <p className="mt-6 max-w-2xl text-2xl leading-snug text-muted-strong sm:text-[28px]">
            Automatic WhatsApp reminders, follow-ups and a simple customer
            dashboard.
          </p>

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

        <PhoneMockup />
      </div>
    </section>
  );
}
