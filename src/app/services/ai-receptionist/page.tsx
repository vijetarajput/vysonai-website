import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { aiReceptionist as content } from "@/content/services";

const path = "/services/ai-receptionist";

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: path },
  openGraph: { title: content.metaTitle, description: content.metaDescription, url: path, type: "website" },
};

export default function Page() {
  return <ServicePage content={content} />;
}