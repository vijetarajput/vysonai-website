import type { Metadata } from "next";
import IndustryLanding from "@/components/IndustryLanding";
import { clinics } from "@/content/clinics";

const title = "WhatsApp & CRM Automation for Clinics";
const description =
  "Fewer missed appointments. Automatic WhatsApp appointment and follow-up reminders, easy booking into a patient dashboard and a weekly report for clinics in India. No medical details are ever sent on WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions/clinics" },
  openGraph: { title, description, url: "/solutions/clinics", type: "website" },
};

export default function ClinicsPage() {
  return <IndustryLanding content={clinics} label="Clinics" path="/solutions/clinics" />;
}
