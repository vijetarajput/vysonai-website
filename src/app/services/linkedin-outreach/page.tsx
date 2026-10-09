import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import LinkedInScene from "@/components/LinkedInScene";
import LinkedInExplainer from "@/components/service/LinkedInExplainer";
import ServiceHero from "@/components/service/ServiceHero";
import type { Interest } from "@/lib/lead";

const title = "LinkedIn Outreach That Books Sales Meetings | VYSON-AI";
const description =
  "Our in-house LinkedIn outreach system finds your ideal clients, starts personal conversations and books sales meetings for you, aiming for 10–20 meetings a month.";
const path = "/services/linkedin-outreach";
const interests: Interest[] = ["LinkedIn outreach"];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
};

export default function LinkedInOutreachPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/#services" },
          { label: "LinkedIn Outreach", href: path },
        ]}
      />

      <ServiceHero
        title="Meetings With Your Ideal Clients, Every Month"
        text="Our in-house LinkedIn outreach system finds the right people for your business, starts personal conversations and books sales meetings for you."
        interests={interests}
        scene={<LinkedInScene />}
      />

      <LinkedInExplainer interests={interests} />
    </>
  );
}
