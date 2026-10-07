import type { Metadata } from "next";
import Link from "next/link";

const title = "WhatsApp Automation & CRM by Industry";
const description =
  "Pick your business to see how automatic WhatsApp reminders, a simple customer dashboard and weekly reports can work for gyms, clinics and other local businesses in India.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions" },
  openGraph: { title, description, url: "/solutions", type: "website" },
};

const solutions = [
  {
    label: "Gym",
    benefit: "Bring members back. Never miss a renewal.",
    features: [
      "Member dashboard",
      "7-day absence reminder on WhatsApp",
      "Membership renewal reminders",
    ],
    href: "/solutions/gyms",
    linkText: "See how it works",
  },
  {
    label: "Clinic",
    benefit: "Fewer missed appointments. Happier patients.",
    features: [
      "Patient booking dashboard",
      "Appointment reminders on WhatsApp",
      "Follow-up visit reminders",
    ],
    href: "/solutions/clinics",
    linkText: "See how it works",
  },
  {
    label: "Other Business",
    benefit: "Don't see your business? We'll build it for you.",
    features: [],
    href: "/#demo",
    linkText: "Get a free demo",
  },
];

function Tick() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1 shrink-0 text-brand-violet"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-14 text-center sm:px-6 sm:pt-20">
          <h1 className="mx-auto max-w-4xl">
            Automatic WhatsApp Reminders for Your Business
          </h1>
          <p className="measure mx-auto mt-5 text-lg text-muted-strong">
            Pick your business to see how it works.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24">
          <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
            {solutions.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-violet sm:p-8"
                >
                  <span className="inline-block self-start rounded-full bg-violet-tint px-3 py-1 text-xs font-semibold text-brand-violet">
                    {item.label}
                  </span>
                  <h2 className="mt-5 text-2xl leading-tight">{item.benefit}</h2>

                  {item.features.length > 0 && (
                    <ul className="mt-5 space-y-2.5 text-sm text-muted-strong">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex gap-2.5">
                          <Tick />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-brand-blue group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                    {item.linkText}
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
