import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { FaqItem } from "@/components/Faq";
import ChatbotScene from "@/components/ChatbotScene";
import ChecklistColumn from "@/components/service/ChecklistColumn";
import FaqSplit from "@/components/service/FaqSplit";
import FitCard from "@/components/service/FitCard";
import ServiceHero from "@/components/service/ServiceHero";
import TwoColumnSection from "@/components/service/TwoColumnSection";
import HowItWorksStoryboard from "@/components/storyboard/HowItWorksStoryboard";
import {
  FollowUpPhone,
  LaptopIllustration,
  LeadsDashboard,
  WebsiteChat,
} from "@/components/storyboard/chatbot";
import type { Interest } from "@/lib/lead";

const title = "Website Assistant, Working 24/7 | VYSON-AI";
const description =
  "An AI website assistant that chats with every visitor, answers their questions and collects their number, even while you sleep.";
const path = "/services/chatbot";
const interests: Interest[] = ["Website chatbot"];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
};

const whatItDoes = [
  "Answers visitors 24/7",
  "Learns your prices, timings and services",
  "Collects name and number from interested visitors",
  "Books appointments or callbacks",
  "Sends every lead to your dashboard instantly",
  "Hands over to you when it's unsure",
];

const worksFor = [
  "Clinics",
  "Shops",
  "Real estate",
  "Coaching institutes",
  "Hotels",
  "Any business with a website",
];

const faqs: FaqItem[] = [
  {
    q: "I don't have a website. Can I still use it?",
    a: "Yes. We can build you a simple website with the assistant built in.",
  },
  {
    q: "Does it work on my existing website?",
    a: "Yes, it works on most websites, including WordPress, Wix and Shopify. We add it for you.",
  },
  {
    q: "Will it give wrong answers?",
    a: "It only answers from the information you give us. If it's unsure, it takes the visitor's number so you can reply.",
  },
  {
    q: "Can I change what it says?",
    a: "Anytime. Just tell us and we'll update it.",
  },
];

export default function ChatbotPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/#services" },
          { label: "Website Chatbot", href: path },
        ]}
      />

      <ServiceHero
        title="Your 24/7 Website Assistant"
        text="Chats with every visitor on your website, answers their questions and collects their number, even while you sleep."
        interests={interests}
        scene={<ChatbotScene />}
      />

      <HowItWorksStoryboard
        subtitle="From a website visit to a new customer, automatically."
        steps={[
          { title: "A visitor lands on your website", visual: <LaptopIllustration /> },
          { title: "Your website assistant answers their questions", visual: <WebsiteChat /> },
          {
            title: "Their name and number land on your dashboard",
            visual: <LeadsDashboard />,
            caption: "Every new lead, saved and ready to call.",
          },
          {
            title: "You follow up, or your WhatsApp assistant does it for you",
            visual: <FollowUpPhone />,
            caption: "No lead goes cold.",
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
