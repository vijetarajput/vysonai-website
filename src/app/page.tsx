import type { Metadata } from "next";
import DemoSection from "@/components/DemoSection";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import Calculator from "@/components/Calculator";
import ServiceCards from "@/components/ServiceCards";
import { siteConfig } from "@/config/site";

const title = "Get AI Agents Working for You 24/7 | VYSON-AI";
const description =
  "VYSON-AI builds AI agents that handle your calls, customers, stock and marketing day and night, for businesses in the US, the UK and India.";

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
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <Hero />
      <ServiceCards />
      <Calculator />
      <DemoSection />
    </>
  );
}
