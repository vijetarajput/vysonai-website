import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import MetaAdsScene from "@/components/MetaAdsScene";
import MetaAdsExplainer from "@/components/service/MetaAdsExplainer";
import ServiceHero from "@/components/service/ServiceHero";
import type { Interest } from "@/lib/lead";

const title = "Facebook & Instagram Ads";
const description =
  "We create and run Facebook and Instagram ads for your business, and every enquiry gets an instant reply, so no lead goes cold.";
const path = "/services/meta-ads";
const interests: Interest[] = ["Meta Ads"];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | VYSON-AI`, description, url: path, type: "website" },
};

export default function MetaAdsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/#services" },
          { label: "Meta Ads", href: path },
        ]}
      />

      <ServiceHero
        title="Ads That Bring You Customers"
        text="We create and run Facebook and Instagram ads for your business, and every enquiry gets an instant reply, so no lead goes cold."
        interests={interests}
        scene={<MetaAdsScene />}
      />

      <MetaAdsExplainer interests={interests} />
    </>
  );
}
