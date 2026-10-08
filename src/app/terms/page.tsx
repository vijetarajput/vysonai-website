import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

const description =
  "The terms for using the VYSON-AI website and services: services agreed in writing, pilot terms per client, no guarantee of specific results, and the laws of India.";

export const metadata: Metadata = {
  title: "Terms",
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms | VYSON-AI", description, url: "/terms", type: "website" },
};

const sections: LegalSection[] = [
  {
    heading: "Our services",
    paragraphs: [
      "{brand} provides services such as WhatsApp automation, customer dashboards and reports, chatbots and AI receptionists. The exact services we provide to your business are the ones we agree with you in writing.",
      "The descriptions on this website are general. They are not an offer until we agree the details with you.",
    ],
  },
  {
    heading: "Pilot",
    paragraphs: [
      "We offer a 1-month pilot so you can try our service before you commit. The terms of each pilot, such as what is included and what happens after it ends, are agreed in writing with each client.",
    ],
  },
  {
    heading: "No guarantee of results",
    paragraphs: [
      "We work hard to build useful tools, but we cannot guarantee any specific business result, such as more customers, more sales or more reviews. Results depend on many things outside our control.",
    ],
  },
  {
    heading: "WhatsApp messages",
    paragraphs: [
      "We send WhatsApp messages through the official WhatsApp Business API. Meta charges a small fee per message, which is billed to the client. You are responsible for making sure your customers have agreed to receive messages from your business.",
    ],
  },
  {
    heading: "Using this website",
    paragraphs: [
      "Please use this website only for lawful purposes and do not try to disrupt it. All content on this site belongs to {brand} unless stated otherwise.",
    ],
  },
  {
    heading: "Your details",
    paragraphs: [
      "How we handle the details you share with us is explained in our Privacy Policy.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: ["These terms are governed by the laws of India."],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time. The latest version is always on this page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      path="/terms"
      updated="October 2026"
      intro="These terms apply when you use the {brand} website or ask us about our services."
      sections={sections}
      contactText="If you have any question about these terms, write to us at"
    />
  );
}
