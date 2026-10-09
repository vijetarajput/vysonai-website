import ServiceExplainer, { ExplainerIcon } from "@/components/service/ServiceExplainer";
import { ReceptionistDashboard } from "@/components/storyboard/receptionist";
import type { Interest } from "@/lib/lead";

/**
 * Short explainer for /services/ai-receptionist: what an AI receptionist is, the appointments
 * dashboard, and two honest notes. Sample visuals only.
 */
export default function ReceptionistExplainer({ interests }: { interests: Interest[] }) {
  return (
    <ServiceExplainer
      title="What is an AI receptionist?"
      intro="An AI receptionist is a smart assistant that answers your business phone, talks to callers like a real receptionist, and books appointments for you."
      blocks={[
        {
          title: "What it does",
          text: "Picks up every call, answers common questions like timings, prices and location, and books appointments straight into your calendar.",
          icon: (
            <ExplainerIcon>
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </ExplainerIcon>
          ),
        },
        {
          title: "When it works for you",
          text: "Day and night, weekends and holidays. When you're busy, closed or on another call, it picks up, so no customer hears 'no answer'.",
          icon: (
            <ExplainerIcon>
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l3 2" />
            </ExplainerIcon>
          ),
        },
        {
          title: "Why it helps your business",
          text: "Every missed call can be a missed customer. With every call answered and every booking on your dashboard, you get more appointments without hiring extra staff.",
          icon: (
            <ExplainerIcon>
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </ExplainerIcon>
          ),
        },
      ]}
      worksWellFor="Works well for clinics, dentists, restaurants, salons and gyms."
      visual={<ReceptionistDashboard />}
      caption="Every booking, right on your dashboard."
      notes={[
        {
          icon: (
            <ExplainerIcon>
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
            </ExplainerIcon>
          ),
          text: "Sounds natural and warm, and politely mentions it's an AI assistant.",
        },
        {
          icon: (
            <ExplainerIcon>
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </ExplainerIcon>
          ),
          text: "If it can't help, it passes the call to you or books a callback for the next day.",
        },
      ]}
      interests={interests}
    />
  );
}
