import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { whatsappAutomation as content } from "@/content/services";

const path = "/services/whatsapp-automation";

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: path },
  openGraph: { title: content.metaTitle, description: content.metaDescription, url: path, type: "website" },
};

export default function Page() {
  return <ServicePage content={content} label="WhatsApp Automation" />;
}