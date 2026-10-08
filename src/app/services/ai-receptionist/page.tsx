import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq, { type FaqItem } from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import DemoButton from "@/components/lead/DemoButton";
import ReceptionistScene from "@/components/ReceptionistScene";
import ServiceIcon from "@/components/ServiceIcon";
import { SparkleIcon } from "@/components/showcase/parts";
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

function ArrowIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Small picture above each step title. */
function RingingPhone() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-violet-tint text-brand-violet"
    >
      <ServiceIcon name="phone" size={30} />
      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-brand-magenta ring-4 ring-white" />
    </div>
  );
}

function HelpfulChat() {
  return (
    <div aria-hidden="true" className="flex w-full max-w-[220px] flex-col gap-1.5">
      <span className="w-[70%] rounded-2xl rounded-bl-md border border-border bg-white px-3 py-1.5 text-left text-[11px] text-muted-strong">
        Hi, can I book?
      </span>
      <span className="ml-auto flex w-[80%] items-center gap-1.5 rounded-2xl rounded-br-md bg-brand-violet px-3 py-1.5 text-left text-[11px] text-white">
        <SparkleIcon size={11} /> Yes, of course!
      </span>
    </div>
  );
}

function TodaysBookings() {
  const rows = [
    ["10:00", "Rahul"],
    ["11:30", "Sarah"],
    ["4:15", "Priya"],
  ];
  return (
    <div
      aria-label="Example dashboard card: today's bookings"
      role="img"
      className="w-full max-w-[220px] rounded-2xl border border-border bg-white p-3 text-left shadow-soft"
    >
      <p className="text-[11px] font-bold text-charcoal">Today&apos;s bookings</p>
      <ul className="mt-1.5 space-y-1" aria-hidden="true">
        {rows.map(([time, name]) => (
          <li
            key={time}
            className="flex items-center gap-2 rounded-lg bg-violet-tint px-2 py-1 text-[11px] text-charcoal"
          >
            <span className="w-9 shrink-0 font-semibold tabular-nums text-brand-violet">{time}</span>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

const steps = [
  { title: "A customer calls", visual: <RingingPhone /> },
  { title: "Your AI receptionist answers and helps", visual: <HelpfulChat /> },
  {
    title: "Appointment booked in your calendar",
    visual: <TodaysBookings />,
    note: "See every booking on your dashboard.",
  },
];

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

      {/* 2. How it works */}
      <section className="bg-violet-tint">
        <div className="site-container section-y">
          <h2 className="text-center">How it works</h2>
          <ol className="section-gap grid grid-cols-[minmax(0,1fr)] gap-12 md:grid-cols-3 md:gap-14">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="relative flex flex-col items-center rounded-3xl border border-border bg-white p-6 text-center shadow-soft"
              >
                <span className="font-heading text-sm font-bold text-brand-violet">
                  Step {index + 1}
                </span>
                <h3 className="mt-3 text-lg md:min-h-[3.5rem]">{step.title}</h3>
                <div className="mt-4 flex min-h-[96px] w-full items-center justify-center">
                  {step.visual}
                </div>
                {step.note && <p className="mt-3 text-sm text-muted-strong">{step.note}</p>}
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[38px] left-1/2 -translate-x-1/2 rotate-90 text-brand-violet md:-right-[42px] md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:rotate-0"
                  >
                    <ArrowIcon />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

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
