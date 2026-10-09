import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import LinkedInScene from "@/components/LinkedInScene";
import LinkedInExplainer from "@/components/service/LinkedInExplainer";
import ServiceHero from "@/components/service/ServiceHero";
import type { Interest } from "@/lib/lead";

const title = "Get 10–20 Sales Meetings Every Month | VYSON-AI";
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
        title={
          <>
            Get <span className="text-brand-violet">10–20</span> Sales Meetings Every Month
          </>
        }
        text="Our in-house LinkedIn outreach system finds your ideal clients, starts personal conversations and books meetings straight into your calendar."
        interests={interests}
        note="Our monthly target. Results depend on your offer and market."
        scene={<LinkedInScene />}
      />

      <LinkedInExplainer interests={interests} />
    </>
  );
}
