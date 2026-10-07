export type Card = { title: string; text: string };
export type FaqItem = { q: string; a: string };
export type ChatMessage = { text: string; time: string };

export type IndustryContent = {
  /** Preselected in the demo form when opened from this page. */
  business: "Gym" | "Clinic";
  h1: string;
  subtext: string;
  /** Fictional business shown in the phone mockup. Never use real business names. */
  mockup: { businessName: string; messages: ChatMessage[] };
  problemsTitle: string;
  problems: Card[];
  automationsTitle: string;
  automations: Card[];
  report: Card;
  stepsTitle: string;
  steps: Card[];
  pilot: { title: string; text: string };
  faqs: FaqItem[];
  ctaHeading: string;
};
