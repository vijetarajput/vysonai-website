import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { FaqItem } from "@/components/Faq";
import ReceptionistScene from "@/components/ReceptionistScene";
import ChecklistColumn from "@/components/service/ChecklistColumn";
import FaqSplit from "@/components/service/FaqSplit";
import FitCard from "@/components/service/FitCard";
import TwoColumnSection from "@/components/service/TwoColumnSection";
import ServiceHero from "@/components/service/ServiceHero";
import HowItWorksStoryboard from "@/components/storyboard/HowItWorksStoryboard";
import {
  CallScreen,
  CallerIllustration,
  ConfirmationPhone,
  ReceptionistDashboard,
} from "@/components/storyboard/receptionist";
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
    a: "It passes the call to you, or books a callback for the next day so the customer is never left waiting.",
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

      <ServiceHero
        title="Your 24/7 Receptionist"
        text="An AI receptionist picks up your calls day and night, answers questions and books appointments for you."
        interests={interests}
        scene={<ReceptionistScene />}
      />

      <HowItWorksStoryboard
        subtitle="From a phone call to a booked appointment, automatically."
        steps={[
          { title: "A customer calls your business", visual: <CallerIllustration /> },
          { title: "Your AI receptionist answers and helps", visual: <CallScreen /> },
          {
            title: "Appointment booked in your calendar",
            visual: <ReceptionistDashboard />,
            caption: "See every booking on your dashboard.",
          },
          {
            title: "Your customer gets a confirmation",
            visual: <ConfirmationPhone />,
            caption: "Fewer no-shows, without any calls from your team.",
          },
        ]}
      />
      {/* What it does + Works well for */}
      <TwoColumnSection
        split="55-45"
        left={<ChecklistColumn title="What it does" items={whatItDoes} />}
        right={<FitCard chips={worksFor} interests={interests} />}
      />

      {/* Quick questions */}
      <FaqSplit items={faqs} interests={interests} />
    </>
  );
}
