import ServiceExplainer, { ExplainerIcon } from "@/components/service/ServiceExplainer";
import { LeadsDashboard } from "@/components/storyboard/chatbot";
import type { Interest } from "@/lib/lead";

/**
 * Short explainer for /services/chatbot: what a website assistant is, today's leads dashboard,
 * and two honest notes. Sample visuals only.
 */
export default function ChatbotExplainer({ interests }: { interests: Interest[] }) {
  return (
    <ServiceExplainer
      title="What is a website assistant?"
      intro="A website assistant is a smart chat window on your website that talks to visitors, answers their questions and collects their details, like a salesperson who never goes home."
      blocks={[
        {
          title: "What it does",
          text: "Answers questions using your own prices, timings and services, then collects the visitor's name and number or books an appointment.",
          icon: (
            <ExplainerIcon>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </ExplainerIcon>
          ),
        },
        {
          title: "When it works for you",
          text: "Every hour of every day. Many people browse in the evening and at night, exactly when your team is offline.",
          icon: (
            <ExplainerIcon>
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l3 2" />
            </ExplainerIcon>
          ),
        },
        {
          title: "Why it helps your business",
          text: "Many visitors leave without contacting you. Your assistant starts the conversation, so more visitors turn into enquiries you can call.",
          icon: (
            <ExplainerIcon>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M19 8v6M22 11h-6" />
            </ExplainerIcon>
          ),
        },
      ]}
      worksWellFor="Works well for clinics, shops, real estate, coaching institutes, hotels and any business with a website."
      visual={<LeadsDashboard />}
      caption="Every new lead, saved and ready to call."
      notes={[
        {
          icon: (
            <ExplainerIcon>
              <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2z" />
            </ExplainerIcon>
          ),
          text: "Answers only from the information you give us. If it's unsure, it takes the visitor's number so you can reply.",
        },
        {
          icon: (
            <ExplainerIcon>
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </ExplainerIcon>
          ),
          text: "Works on most websites, including WordPress, Wix and Shopify. No website? We can build one for you.",
        },
      ]}
      interests={interests}
    />
  );
}
