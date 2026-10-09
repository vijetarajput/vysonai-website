import ServiceExplainer, { ExplainerIcon } from "@/components/service/ServiceExplainer";
import { ChatsDashboard } from "@/components/storyboard/whatsapp";
import type { Interest } from "@/lib/lead";

/**
 * Short explainer for /services/whatsapp-automation: what a WhatsApp assistant is, today's chats
 * dashboard, and two honest notes. Sample visuals only. No WhatsApp logo.
 */
export default function WhatsAppExplainer({ interests }: { interests: Interest[] }) {
  return (
    <ServiceExplainer
      title="What is a WhatsApp assistant?"
      intro="A WhatsApp assistant is a smart helper that replies to your customers on WhatsApp for you, books them in and reminds them, just like your best staff member would."
      blocks={[
        {
          title: "What it does",
          text: "Replies instantly to questions about prices, timings and services, books appointments, and sends reminders for bookings, renewals and payments.",
          icon: (
            <ExplainerIcon>
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
            </ExplainerIcon>
          ),
        },
        {
          title: "When it works for you",
          text: "Day and night. Even when you're busy with customers, closed for the day or on holiday, every message gets a reply in seconds.",
          icon: (
            <ExplainerIcon>
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l3 2" />
            </ExplainerIcon>
          ),
        },
        {
          title: "Why it helps your business",
          text: "Customers often book with whoever replies first. Fast replies and timely reminders mean more bookings, fewer no-shows and more repeat customers.",
          icon: (
            <ExplainerIcon>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </ExplainerIcon>
          ),
        },
      ]}
      worksWellFor="Works well for gyms, salons, clinics, shops, coaching classes and restaurants."
      visual={<ChatsDashboard />}
      caption="Every chat and new lead, on your dashboard."
      notes={[
        {
          icon: (
            <ExplainerIcon>
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <path d="M9 18h6" />
            </ExplainerIcon>
          ),
          text: "Runs on the official WhatsApp Business Platform with your business number.",
        },
        {
          icon: (
            <ExplainerIcon>
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
            </ExplainerIcon>
          ),
          text: "WhatsApp charges a small fee for some messages, like reminders. We explain the costs before you start.",
        },
      ]}
      interests={interests}
    />
  );
}
