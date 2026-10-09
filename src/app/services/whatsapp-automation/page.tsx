import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceHero from "@/components/service/ServiceHero";
import WhatsAppExplainer from "@/components/service/WhatsAppExplainer";
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

      <WhatsAppExplainer interests={interests} />
    </>
  );
}
