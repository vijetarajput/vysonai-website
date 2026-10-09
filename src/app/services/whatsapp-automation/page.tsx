import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { FaqItem } from "@/components/Faq";
import ChecklistColumn from "@/components/service/ChecklistColumn";
import FaqSplit from "@/components/service/FaqSplit";
import FitCard from "@/components/service/FitCard";
import ServiceHero from "@/components/service/ServiceHero";
import TwoColumnSection from "@/components/service/TwoColumnSection";
import HowItWorksStoryboard from "@/components/storyboard/HowItWorksStoryboard";
import {
  ChatsDashboard,
  ReminderPhone,
  SalonChat,
  TypingIllustration,
} from "@/components/storyboard/whatsapp";
import WhatsAppScene from "@/components/WhatsAppScene";
import type { Interest } from "@/lib/lead";

const title = "WhatsApp Assistant, Working 24/7 | VYSON-AI";
const description =
  "A WhatsApp assistant that replies to your customers in seconds, day or night, and sends reminders automatically.";
const path = "/services/whatsapp-automation";
const interests: Interest[] = ["WhatsApp customer service"];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
};

const whatItDoes = [
  "Replies in seconds, 24/7",
  "Answers common questions: prices, timings, location",
  "Sends reminders for appointments, renewals and payments",
  "Follows up with people who asked but didn't buy",
  "Asks happy customers for a Google review",
  "Lets you jump in and reply yourself anytime",
];

const worksFor = ["Gyms", "Salons", "Clinics", "Shops", "Coaching classes", "Restaurants"];

const faqs: FaqItem[] = [
  {
    q: "Will it use my business number?",
    a: "Yes. It runs on the official WhatsApp Business Platform, and we help you set it up with your business number.",
  },
  {
    q: "Is it allowed to message my customers?",
    a: "Yes, when customers have agreed to hear from you. They can stop messages anytime.",
  },
  {
    q: "Does WhatsApp charge anything?",
    a: "WhatsApp charges a small fee for some messages, like reminders. We explain the costs clearly before you start.",
  },
  {
    q: "Can I reply myself?",
    a: "Anytime. You can take over any chat with one tap.",
  },
];

export default function WhatsAppAutomationPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/#services" },
          { label: "WhatsApp Customer Service", href: path },
        ]}
      />

      <ServiceHero
        title="Your 24/7 WhatsApp Assistant"
        text="Replies to your customers on WhatsApp in seconds, day or night, and sends reminders so nobody forgets."
        interests={interests}
        scene={<WhatsAppScene />}
      />

      <HowItWorksStoryboard
        subtitle="From a customer's message to a booked, reminded customer, automatically."
        steps={[
          { title: "A customer messages you on WhatsApp", visual: <TypingIllustration /> },
          { title: "Your WhatsApp assistant replies instantly", visual: <SalonChat /> },
          {
            title: "Every chat is saved on your dashboard",
            visual: <ChatsDashboard />,
            caption: "See every chat and new lead on your dashboard.",
          },
          {
            title: "Reminders go out automatically",
            visual: <ReminderPhone />,
            caption: "Fewer no-shows, more repeat customers.",
          },
        ]}
      />

      <TwoColumnSection
        split="55-45"
        left={<ChecklistColumn title="What it does" items={whatItDoes} />}
        right={<FitCard chips={worksFor} interests={interests} />}
      />

      <FaqSplit items={faqs} interests={interests} />
    </>
  );
}
