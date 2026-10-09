import type { Interest } from "@/lib/lead";

export type IconName =
  | "chat"
  | "clipboard"
  | "cog"
  | "bolt"
  | "bell"
  | "chart"
  | "phone"
  | "calendar"
  | "mail"
  | "dumbbell"
  | "clinic"
  | "bag"
  | "book"
  | "globe"
  | "search"
  | "megaphone"
  | "users"
  | "sparkle";

/**
 * What we offer: the 8 cards in the Home services section and the 8 entries in the header
 * "Services" dropdown. An item with `href` links to its service page ("Learn more"). An item
 * without one opens the "Book your free business audit" form with its `interest` already picked
 * ("Talk to us"). When a service page is built, add its `href` here.
 */
export type Offering = {
  title: string;
  text: string;
  icon: IconName;
  /** Service page, once it exists. */
  href?: string;
  /** Choice preselected in the form when there is no page yet. */
  interest: Interest;
};

export const offerings: Offering[] = [
  {
    title: "AI Receptionist",
    text: "Picks up every call, day or night, and books appointments for you.",
    icon: "phone",
    href: "/services/ai-receptionist",
    interest: "AI receptionist",
  },
  {
    title: "WhatsApp Customer Service",
    text: "Replies to your customers on WhatsApp instantly and sends reminders.",
    icon: "chat",
    href: "/services/whatsapp-automation",
    interest: "WhatsApp customer service",
  },
  {
    title: "Website Chatbot",
    text: "Chats with visitors on your website and collects their number.",
    icon: "globe",
    href: "/services/chatbot",
    interest: "Website chatbot",
  },
  {
    title: "CRM",
    text: "Keeps all your customers in one list and reminds you to follow up.",
    icon: "users",
    href: "/services/crm",
    interest: "CRM",
  },
  {
    title: "Stock Management",
    text: "Tells you what's selling and what's about to run out.",
    icon: "bag",
    href: "/services/stock-management",
    interest: "Stock management",
  },
  {
    title: "Meta Ads",
    text: "Runs Facebook and Instagram ads that bring you new customers.",
    icon: "megaphone",
    href: "/services/meta-ads",
    interest: "Meta Ads",
  },
  {
    title: "LinkedIn Outreach",
    text: "Sends personal messages to the right people and books meetings for you.",
    icon: "mail",
    href: "/services/linkedin-outreach",
    interest: "LinkedIn outreach",
  },
  {
    title: "Something else?",
    text: "Tell us a task you do every day. We'll automate it.",
    icon: "sparkle",
    interest: "Something else",
  },
];
