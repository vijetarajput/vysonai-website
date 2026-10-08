import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

const description =
  "How VYSON-AI collects, uses and protects the details you share with us, in simple English. Your details are used only to contact you about a demo.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { title: "Privacy Policy | VYSON-AI", description, url: "/privacy-policy", type: "website" },
};

const sections: LegalSection[] = [
  {
    heading: "What we collect",
    paragraphs: ["When you fill in our demo form, we collect:"],
    items: [
      "Your name",
      "Your WhatsApp number",
      "Your business type (for example gym or clinic)",
      "The things you told us you want to automate, if you chose any",
    ],
  },
  {
    heading: "Why we collect it",
    paragraphs: [
      "We use these details only to contact you about a demo of {brand} services. We contact you on WhatsApp.",
    ],
  },
  {
    heading: "Who we share it with",
    paragraphs: [
      "We do not sell your details. We do not share them for marketing.",
      "We use trusted tools to store your details and to send WhatsApp messages. These tools handle your details only to help us provide this service.",
      "Your enquiry is delivered to us through secure messaging and service providers, only so that we can respond to you.",
    ],
  },
  {
    heading: "Stopping messages",
    paragraphs: [
      "You agree to receive WhatsApp messages from us when you tick the box on the demo form. You can ask us to stop at any time by replying to a message or by writing to us.",
    ],
  },
  {
    heading: "How long we keep your details",
    paragraphs: [
      "We keep your details only for as long as we need them to follow up on your demo request.",
    ],
  },
  {
    heading: "Deleting your details",
    paragraphs: [
      "You can ask us to delete your details at any time. Write to us at the email address below and tell us the name and WhatsApp number you used. We will delete your details and let you know.",
    ],
  },
  {
    heading: "Your rights in India",
    paragraphs: [
      "We follow India's Digital Personal Data Protection Act, 2023. Under this law, you can ask us what details we hold about you, ask us to correct them, ask us to delete them, and withdraw your consent.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2026"
      intro="This page explains, in simple words, what details {brand} collects when you ask for a demo, and what we do with them."
      sections={sections}
      contactText="For any question about your details, or to ask us to delete them, write to us at"
    />
  );
}
