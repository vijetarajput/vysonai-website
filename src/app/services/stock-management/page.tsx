import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import StockScene from "@/components/StockScene";
import ServiceHero from "@/components/service/ServiceHero";
import StockExplainer from "@/components/service/StockExplainer";
import type { Interest } from "@/lib/lead";

const title = "Stock Management: Never Run Out of What Sells | VYSON-AI";
const description =
  "Know what's selling, what's running low and what to reorder, with alerts before items run out and a weekly stock report.";
const path = "/services/stock-management";
const interests: Interest[] = ["Stock management"];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
};

export default function StockManagementPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/#services" },
          { label: "Stock Management", href: path },
        ]}
      />

      <ServiceHero
        title="Never Run Out of What Sells"
        text="Know what's selling, what's running low and what to reorder, without counting boxes."
        interests={interests}
        scene={<StockScene />}
      />

      <StockExplainer interests={interests} />
    </>
  );
}
