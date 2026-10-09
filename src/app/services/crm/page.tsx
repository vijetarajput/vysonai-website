import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CrmScene from "@/components/CrmScene";
import CrmExplainer from "@/components/service/CrmExplainer";
import ServiceHero from "@/components/service/ServiceHero";
import type { Interest } from "@/lib/lead";

const title = "Simple CRM for Your Business";
const description =
  "A simple CRM that saves every customer, call and chat in one list and reminds you who to follow up, with a report every Monday.";
const path = "/services/crm";
const interests: Interest[] = ["CRM"];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | VYSON-AI`, description, url: path, type: "website" },
};

export default function CrmPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/#services" },
          { label: "CRM", href: path },
        ]}
      />

      <ServiceHero
        title="All Your Customers in One Place"
        text="Every customer, call and chat saved in one simple list, with reminders so you never forget to follow up."
        interests={interests}
        scene={<CrmScene />}
      />

      <CrmExplainer interests={interests} />
    </>
  );
}
