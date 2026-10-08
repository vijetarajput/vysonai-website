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
 * "Services" dropdown. The individual service pages were removed (to be rebuilt), so every
 * item opens the "Book your free call" form with the matching choice already picked.
 * When a page is rebuilt, add an `href` here and link to it instead.
 */
export type Offering = {
  title: string;
  text: string;
  icon: IconName;
  interest: Interest;
};

export const offerings: Offering[] = [
  {
    title: "AI Receptionist",
    text: "Picks up every call, day or night, and books appointments for you.",
    icon: "phone",
    interest: "AI receptionist",
  },
  {
    title: "WhatsApp Customer Service",
    text: "Replies to your customers on WhatsApp instantly and sends reminders.",
    icon: "chat",
    interest: "WhatsApp customer service",
  },
  {
    title: "Website Chatbot",
    text: "Chats with visitors on your website and collects their number.",
    icon: "globe",
    interest: "Website chatbot",
  },
  {
    title: "CRM",
    text: "Keeps all your customers in one list and reminds you to follow up.",
    icon: "users",
    interest: "CRM",
  },
  {
    title: "Stock Management",
    text: "Tells you what's selling and what's about to run out.",
    icon: "bag",
    interest: "Stock management",
  },
  {
    title: "Meta Ads",
    text: "Runs Facebook and Instagram ads that bring you new customers.",
    icon: "megaphone",
    interest: "Meta Ads",
  },
  {
    title: "LinkedIn Outreach",
    text: "Sends personal messages to the right people and books meetings for you.",
    icon: "mail",
    interest: "LinkedIn outreach",
  },
  {
    title: "Something else?",
    text: "Tell us a task you do every day. We'll automate it.",
    icon: "sparkle",
    interest: "Something else",
  },
];
