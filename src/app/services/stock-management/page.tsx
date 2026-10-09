import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { FaqItem } from "@/components/Faq";
import StockScene from "@/components/StockScene";
import ChecklistColumn from "@/components/service/ChecklistColumn";
import FaqSplit from "@/components/service/FaqSplit";
import FitCard from "@/components/service/FitCard";
import ServiceHero from "@/components/service/ServiceHero";
import TwoColumnSection from "@/components/service/TwoColumnSection";
import HowItWorksStoryboard from "@/components/storyboard/HowItWorksStoryboard";
import {
  ShopIllustration,
  StockAlertPhone,
  StockDashboard,
  StockDropCard,
} from "@/components/storyboard/stock";
import type { Interest } from "@/lib/lead";

const title = "Stock Management: Never Run Out of What Sells | VYSON-AI";
const description =
  "Know what's selling, what's running low and what to reorder, with alerts before items run out and a weekly stock report.";
const path = "/services/stock-management";
const interests: Interest[] = ["Stock management"];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
};

const whatItDoes = [
  "Tracks stock for every product",
  "Shows your best and slowest sellers",
  "Alerts you before items run out",
  "Suggests how much to reorder",
  'Answers questions like "What sold most this week?"',
  "Sends a weekly stock report",
];

const worksFor = [
  "Retail shops",
  "Electronics stores",
  "Pharmacies",
  "Grocery stores",
  "Fashion boutiques",
  "Distributors",
];

const faqs: FaqItem[] = [
  {
    q: "I already use billing software. Will this work with it?",
    a: "In most cases, yes. We connect it to your billing software, or start with a simple sheet if needed.",
  },
  {
    q: "Do I have to count all my stock again?",
    a: "Only once at the start. After that, it updates as you sell.",
  },
  {
    q: "Can I check it on my phone?",
    a: "Yes, on your phone or computer, anytime.",
  },
  {
    q: "Can it handle a lot of products?",
    a: "Yes, from a small shop to a large store with thousands of items.",
  },
];

export default function StockManagementPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/#services" },
          { label: "Stock Management", href: path },
        ]}
      />

      <ServiceHero
        title="Never Run Out of What Sells"
        text="Know what's selling, what's running low and what to reorder, without counting boxes."
        interests={interests}
        scene={<StockScene />}
      />

      <HowItWorksStoryboard
        subtitle="From every sale to the right reorder, automatically."
        steps={[
          { title: "Every sale is recorded", visual: <ShopIllustration /> },
          { title: "Your stock updates on its own", visual: <StockDropCard /> },
          {
            title: "Your dashboard shows what's selling and what's running low",
            visual: <StockDashboard />,
            caption: "See your whole shop in seconds.",
          },
          {
            title: "You get an alert before it runs out",
            visual: <StockAlertPhone />,
            caption: "Restock in time. Never lose a sale.",
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
