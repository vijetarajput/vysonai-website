import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { FaqItem } from "@/components/Faq";
import MetaAdsScene from "@/components/MetaAdsScene";
import ChecklistColumn from "@/components/service/ChecklistColumn";
import FaqSplit from "@/components/service/FaqSplit";
import FitCard from "@/components/service/FitCard";
import ServiceHero from "@/components/service/ServiceHero";
import TwoColumnSection from "@/components/service/TwoColumnSection";
import HowItWorksStoryboard from "@/components/storyboard/HowItWorksStoryboard";
import {
  AdDesignCanvas,
  AdsLeadsDashboard,
  AdsReplyPhone,
  NearbyMap,
} from "@/components/storyboard/meta-ads";
import type { Interest } from "@/lib/lead";

const title = "Facebook & Instagram Ads That Bring Customers | VYSON-AI";
const description =
  "We create and run Facebook and Instagram ads for your business, and every enquiry gets an instant reply, so no lead goes cold.";
const path = "/services/meta-ads";
const interests: Interest[] = ["Meta Ads"];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
};

const whatItDoes = [
  "Plans ads around your goal and budget",
  "Creates eye-catching ad designs and text",
  "Shows your ads to people near your business",
  "Replies to every enquiry instantly",
  "Tracks results on your dashboard",
  "Improves your ads every week",
];

const worksFor = [
  "Salons",
  "Gyms",
  "Clinics",
  "Restaurants",
  "Real estate",
  "Coaching",
  "Local shops",
];

const faqs: FaqItem[] = [
  {
    q: "How much do I need to spend?",
    a: "You choose your budget. The ad money is paid directly to Meta (Facebook and Instagram), and our fee is separate. We'll suggest a budget that fits your goal.",
  },
  {
    q: "How soon will I see results?",
    a: "Ads usually start reaching people within a day or two. We check and improve them every week.",
  },
  {
    q: "Do I need a Facebook page or Instagram account?",
    a: "Yes, a business page is needed. If you don't have one, we'll help you set it up.",
  },
  {
    q: "Can you guarantee customers?",
    a: "No one can honestly guarantee sales. We focus on real enquiries and fast replies, so more of them become customers.",
  },
];

export default function MetaAdsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/#services" },
          { label: "Meta Ads", href: path },
        ]}
      />

      <ServiceHero
        title="Ads That Bring You Customers"
        text="We create and run Facebook and Instagram ads for your business, and every enquiry gets an instant reply, so no lead goes cold."
        interests={interests}
        scene={<MetaAdsScene />}
      />

      <HowItWorksStoryboard
        subtitle="From your first ad to new customers, step by step."
        steps={[
          { title: "We plan and design your ad", visual: <AdDesignCanvas /> },
          { title: "Your ad reaches the right people nearby", visual: <NearbyMap /> },
          {
            title: "Every enquiry lands on your dashboard",
            visual: <AdsLeadsDashboard />,
            caption: "See every lead your ads bring, in one place.",
          },
          {
            title: "Your WhatsApp assistant replies in seconds",
            visual: <AdsReplyPhone />,
            caption: "Fast replies turn clicks into customers.",
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
