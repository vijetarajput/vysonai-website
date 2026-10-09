import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { FaqItem } from "@/components/Faq";
import CrmScene from "@/components/CrmScene";
import ChecklistColumn from "@/components/service/ChecklistColumn";
import FaqSplit from "@/components/service/FaqSplit";
import FitCard from "@/components/service/FitCard";
import ServiceHero from "@/components/service/ServiceHero";
import TwoColumnSection from "@/components/service/TwoColumnSection";
import HowItWorksStoryboard from "@/components/storyboard/HowItWorksStoryboard";
import {
  FollowUpsDashboard,
  ProfileCard,
  SourcesIllustration,
  WeeklyReport,
} from "@/components/storyboard/crm";
import type { Interest } from "@/lib/lead";

const title = "CRM: All Your Customers in One Place | VYSON-AI";
const description =
  "A simple CRM that saves every customer, call and chat in one list and reminds you who to follow up, with a report every Monday.";
const path = "/services/crm";
const interests: Interest[] = ["CRM"];

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website" },
};

const whatItDoes = [
  "Saves every customer from calls, WhatsApp, website and walk-ins",
  "Shows each customer's full history",
  "Reminds you who to follow up, and when",
  "Tags customers: new, regular, inactive",
  "Finds customers who haven't come back in a while",
  "Sends a simple report every Monday",
];

const worksFor = [
  "Clinics",
  "Gyms",
  "Salons",
  "Real estate",
  "Coaching",
  "Agencies",
  "Any business with repeat customers",
];

const faqs: FaqItem[] = [
  {
    q: "I already use Excel. Do I need this?",
    a: "We can bring your Excel list in, so you start with all your customers on day one.",
  },
  {
    q: "Is my customer data private?",
    a: "Yes. Only you and the people you allow can see it.",
  },
  {
    q: "Can my team use it too?",
    a: "Yes, your staff can use it too.",
  },
  {
    q: "Does it work with my WhatsApp and website?",
    a: "Yes. Customers from your WhatsApp and website assistants are saved automatically.",
  },
];

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

      <HowItWorksStoryboard
        subtitle="From a new customer to a loyal one, without forgetting anyone."
        steps={[
          { title: "Customers reach you from everywhere", visual: <SourcesIllustration /> },
          { title: "Everyone is saved in one list, automatically", visual: <ProfileCard /> },
          {
            title: "Your dashboard tells you who to follow up today",
            visual: <FollowUpsDashboard />,
            caption: "Know exactly who to call, every morning.",
          },
          {
            title: "A report lands in your inbox every Monday",
            visual: <WeeklyReport />,
            caption: "Your business, summed up in one email.",
          },
        ]}
      />

      <TwoColumnSection
        split="55-45"
        left={<ChecklistColumn title="What it does" items={whatItDoes} />}
        right={<FitCard chips={worksFor} interests={interests} />}
      />

      <FaqSplit items={faqs} interests={interests} />
    </>
  );
}
