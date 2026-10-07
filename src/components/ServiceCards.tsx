import Link from "next/link";
import type { ReactNode } from "react";

type Service = {
  title: string;
  benefit: string;
  href: string;
  icon: ReactNode;
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="26"
      height="26"
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

const services: Service[] = [
  {
    title: "Automatic WhatsApp Reminders",
    benefit:
      "Your customers get reminders on WhatsApp automatically. No calls, no follow-up stress.",
    href: "/solutions",
    icon: (
      <Icon>
        <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 01-3.4 0" />
      </Icon>
    ),
  },
  {
    title: "Website + 24/7 Chatbot",
    benefit:
      "A chatbot that answers your customers day and night, using your own prices, timings and services.",
    href: "/services/chatbot",
    icon: (
      <Icon>
        <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.4A8 8 0 1121 12z" />
        <path d="M9 11h6M9 14h4" />
      </Icon>
    ),
  },
  {
    title: "Customer Dashboard + Weekly Report",
    benefit:
      "All your customers in one place, and a simple report in your email every Monday.",
    href: "/services/crm",
    icon: (
      <Icon>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </Icon>
    ),
  },
  {
    title: "24/7 AI Receptionist",
    benefit:
      "Never miss a call. Our AI picks up, answers questions and books appointments.",
    href: "/services/ai-receptionist",
    icon: (
      <Icon>
        <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
      </Icon>
    ),
  },
];

export default function ServiceCards() {
  return (
    <section className="bg-violet-tint">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <h2>How we can help your business</h2>
          <p className="measure mx-auto mt-3 text-muted-strong">
            Simple tools that save you time and bring customers back.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {services.map((service) => (
            <li key={service.title}>
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-3xl border border-border bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-violet sm:p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-tint text-brand-violet">
                  {service.icon}
                </span>
                <h3 className="mt-5">{service.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted-strong">
                  {service.benefit}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                  Learn more
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-muted-strong">
          Want to automate something else?{" "}
          <Link href="/contact" className="link-brand font-semibold">
            Talk to us
          </Link>
        </p>
      </div>
    </section>
  );
}
