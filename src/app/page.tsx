import type { Metadata } from "next";
import DemoSection from "@/components/DemoSection";
import FinalCta from "@/components/FinalCta";
import Founder from "@/components/Founder";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ServiceCards from "@/components/ServiceCards";

const title = "AI for Your Business | WhatsApp Automation, CRM & AI Receptionist";
const description =
  "Automatic WhatsApp reminders, a 24/7 chatbot, customer records and an AI receptionist for gyms, clinics and local businesses in India. Get a free demo.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", type: "website" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <HowItWorks />
      <Founder />
      <DemoSection />
      <FinalCta />
    </>
  );
}
