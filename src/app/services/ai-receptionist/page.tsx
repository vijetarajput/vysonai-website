import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReceptionistScene from "@/components/ReceptionistScene";
import ReceptionistExplainer from "@/components/service/ReceptionistExplainer";
import ServiceHero from "@/components/service/ServiceHero";
import type { Interest } from "@/lib/lead";

const title = "AI Receptionist, 24/7";
const description =
  "An AI receptionist that answers your calls day and night, answers questions and books appointments straight into your calendar.";
const path = "/services/ai-receptionist";
const interests: Interest[] = ["AI receptionist"];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | VYSON-AI`, description, url: path, type: "website" },
};

export default function AiReceptionistPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/#services" },
          { label: "AI Receptionist", href: path },
        ]}
      />

      <ServiceHero
        title="Your 24/7 Receptionist"
        text="An AI receptionist picks up your calls day and night, answers questions and books appointments for you."
        interests={interests}
        scene={<ReceptionistScene />}
      />

      <ReceptionistExplainer interests={interests} />
    </>
  );
}
