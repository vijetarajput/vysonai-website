import type { Metadata } from "next";
import IndustryLanding from "@/components/IndustryLanding";
import { gyms } from "@/content/gyms";

const title = "WhatsApp & CRM Automation for Gyms";
const description =
  "Bring back members who stop coming. Automatic WhatsApp reminders for absent members, renewals, birthdays and enquiries, plus a simple member dashboard and weekly report for gym owners in India.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/solutions/gyms" },
  openGraph: { title, description, url: "/solutions/gyms", type: "website" },
};

export default function GymsPage() {
  return <IndustryLanding content={gyms} label="Gyms" path="/solutions/gyms" />;
}
