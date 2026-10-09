import ServiceExplainer, { ExplainerIcon } from "@/components/service/ServiceExplainer";
import { FollowUpsDashboard } from "@/components/storyboard/crm";
import type { Interest } from "@/lib/lead";

/**
 * Short explainer for /services/crm: what a CRM is, today's follow-ups dashboard, and two honest
 * notes. Sample visuals only.
 */
export default function CrmExplainer({ interests }: { interests: Interest[] }) {
  return (
    <ServiceExplainer
      title="What is a CRM?"
      intro="A CRM is one simple list of all your customers, with everything you need to remember about them, and reminders telling you who to contact next."
      blocks={[
        {
          title: "What it does",
          text: "Saves every customer from calls, WhatsApp, your website and walk-ins, keeps their full history, and reminds you who to follow up and when.",
          icon: (
            <ExplainerIcon>
              <circle cx="9" cy="8" r="3.5" />
              <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
            </ExplainerIcon>
          ),
        },
        {
          title: "When it works for you",
          text: "Every morning it shows who to call today, and every Monday it sends a simple report to your email.",
          icon: (
            <ExplainerIcon>
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l3 2" />
            </ExplainerIcon>
          ),
        },
        {
          title: "Why it helps your business",
          text: "Customers who don't hear back often go elsewhere. When nobody is forgotten, more enquiries become sales and more customers come back.",
          icon: (
            <ExplainerIcon>
              <path d="M4 20V10M10 20V4M16 20v-8M20 20H4" />
            </ExplainerIcon>
          ),
        },
      ]}
      worksWellFor="Works well for clinics, gyms, salons, real estate, coaching and agencies."
      visual={<FollowUpsDashboard />}
      caption="Know exactly who to call, every morning."
      notes={[
        {
          icon: (
            <ExplainerIcon>
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M8 9h8M8 13h5" />
            </ExplainerIcon>
          ),
          text: "Already using Excel? We bring your list in, so you start with every customer on day one.",
        },
        {
          icon: (
            <ExplainerIcon>
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </ExplainerIcon>
          ),
          text: "Private: only you and the people you allow can see your customers.",
        },
      ]}
      interests={interests}
    />
  );
}
