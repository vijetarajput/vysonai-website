import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq, { type FaqItem } from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import DemoButton from "@/components/lead/DemoButton";
import ReceptionistScene from "@/components/ReceptionistScene";
import HowItWorksStoryboard from "@/components/storyboard/HowItWorksStoryboard";
import type { Interest } from "@/lib/lead";

const title = "AI Receptionist, Working 24/7 | VYSON-AI";
const description =
  "An AI receptionist that answers your calls day and night, answers questions and books appointments straight into your calendar.";
const path = "/services/ai-receptionist";
const interests: Interest[] = ["AI receptionist"];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
};

const buttonClass =
  "inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark";

const whatItDoes = [
  "Picks up 24/7, even on holidays",
  "Books appointments straight into your calendar",
  "Answers common questions: timings, prices, location",
  "Passes tricky calls to you",
  "Shows every call and booking on your dashboard",
];

const worksFor = [
  "Clinics",
  "Dentists",
  "Restaurants",
  "Salons",
  "Gyms",
  "Any business that gets calls",
];

const faqs: FaqItem[] = [
  {
    q: "Will callers know it's AI?",
    a: "Yes. It introduces itself politely. Being honest builds trust.",
  },
  {
    q: "Does it speak my customers' language?",
    a: "We set it up in the language your customers use, and test it with you before going live.",
  },
  {
    q: "What if it can't answer?",
    a: "It takes a message or passes the call to you.",
  },
];

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function AiReceptionistPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/#services" },
          { label: "AI Receptionist", href: path },
        ]}
      />

      {/* 1. Hero */}
      <section className="bg-white">
        <div className="site-container hero-y grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="inline-flex rounded-full bg-violet-tint px-3.5 py-1.5 text-sm font-semibold text-brand-violet">
              Now taking early clients
            </p>
            <h1 className="mt-4 text-[2.25rem] leading-[1.1] md:text-5xl">Your 24/7 Receptionist</h1>
            <p className="mt-4 max-w-xl text-lg leading-snug text-muted-strong md:text-xl">
              An AI receptionist picks up your calls day and night, answers questions and books
              appointments for you.
            </p>
            <div className="mt-7">
              <DemoButton interests={interests} className={buttonClass}>
                Book a free call
              </DemoButton>
            </div>
          </div>
          <ReceptionistScene />
        </div>
      </section>

      {/* 2. How it works (storyboard) */}
      <HowItWorksStoryboard />

      {/* 3. What it does */}
      <section className="bg-white">
        <div className="site-container section-y">
          <h2 className="text-center">What it does</h2>
          <ul className="section-gap mx-auto max-w-2xl space-y-3">
            {whatItDoes.map((text) => (
              <li
                key={text}
                className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-violet text-white">
                  <CheckIcon />
                </span>
                <span className="font-medium leading-snug text-charcoal">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Works well for */}
      <section className="bg-violet-tint">
        <div className="site-container section-y">
          <h2 className="text-center">Works well for</h2>
          <ul className="section-gap flex flex-wrap justify-center gap-3">
            {worksFor.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-white px-5 py-2.5 text-[15px] font-medium text-charcoal shadow-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Quick questions */}
      <Faq items={faqs} />

      {/* 6. Closing band */}
      <FinalCta heading="Never miss a call again." interests={interests} />
    </>
  );
}
