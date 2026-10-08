import type { Metadata } from "next";
import ComparisonTable from "@/components/ComparisonTable";
import DemoSection from "@/components/DemoSection";
import FinalCta from "@/components/FinalCta";
import Founder from "@/components/Founder";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import JsonLd from "@/components/JsonLd";
import ServiceCards from "@/components/ServiceCards";
import { siteConfig } from "@/config/site";

const title = "AI for Your Business | WhatsApp Automation, AI Dashboard & AI Receptionist";
const description =
  "Automatic WhatsApp reminders, a 24/7 chatbot, customer records and an AI receptionist for gyms, clinics and local businesses in India. Get a free demo.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", type: "website" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/vyson-logo-full.png`,
  founder: { "@type": "Person", name: siteConfig.founder },
  address: {
    "@type": "PostalAddress",
    addressRegion: siteConfig.region,
    addressCountry: siteConfig.countryCode,
  },
  email: siteConfig.email,
  sameAs: [siteConfig.linkedin],
};

const reviewSteps = [
  {
    title: "Ask after the visit",
    text: "After a visit, your customer gets a WhatsApp message asking how it was.",
  },
  {
    title: "Share your review link",
    text: "Every customer gets your Google review link, so leaving a review takes one tap.",
  },
  {
    title: "Fix problems personally",
    text: "If someone is unhappy, you are notified so you can make it right yourself.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <Hero />
      <ServiceCards />
      <ComparisonTable />
      <HowItWorks
        title="Get More Google Reviews"
        intro="Happy customers are your best advertising. We make it easy for them to say so."
        steps={reviewSteps}
        note="We never filter or hide unhappy customers. Every customer gets the same message."
        background="tint"
      />
      <HowItWorks background="white" />
      <Founder />
      <DemoSection />
      <FinalCta />
    </>
  );
}
