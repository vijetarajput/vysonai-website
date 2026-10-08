import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { FaqItem } from "@/components/Faq";
import DemoButton from "@/components/lead/DemoButton";
import ReceptionistScene from "@/components/ReceptionistScene";
import ChecklistColumn from "@/components/service/ChecklistColumn";
import FaqSplit from "@/components/service/FaqSplit";
import FitCard from "@/components/service/FitCard";
import TwoColumnSection from "@/components/service/TwoColumnSection";
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
    a: "It sounds remarkably human: a warm, natural voice with a local accent, so callers find it easy to talk to. We recommend it mentions it's an AI assistant at the start of the call. In many places this is required, and customers appreciate the honesty.",
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

      {/* 3. What it does + Works well for */}
      <TwoColumnSection
        split="55-45"
        left={<ChecklistColumn title="What it does" items={whatItDoes} />}
        right={<FitCard chips={worksFor} interests={interests} />}
      />

      {/* 4. Quick questions */}
      <FaqSplit items={faqs} interests={interests} />
    </>
  );
}
