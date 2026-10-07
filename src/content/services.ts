import type { Card, FaqItem } from "@/content/industry";

export type ServiceContent = {
  slug: "crm" | "chatbot" | "ai-receptionist";
  /** Shows an "Early Access" badge next to the page heading. */
  earlyAccess?: boolean;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtext: string;
  problem: Card;
  includedTitle: string;
  included: Card[];
  stepsTitle: string;
  steps: Card[];
  bestFor: string[];
  faqs: FaqItem[];
  ctaHeading: string;
};

const earlyAccessNote =
  "Early Access means we are opening this service to a small number of businesses first, so we can set it up with you and improve it together.";

export const crm: ServiceContent = {
  slug: "crm",
  metaTitle: "Customer Dashboard & Weekly Report for Small Businesses",
  metaDescription:
    "Keep all your customers in one simple dashboard and get a weekly report in your email every Monday. Built for gyms, clinics and local businesses in India.",
  h1: "All Your Customers in One Place, Plus a Weekly Report in Your Email",
  subtext:
    "No more registers, phone contacts and Excel sheets. See who your customers are and who needs a follow-up, in one simple dashboard.",
  problem: {
    title: "Customer details are scattered everywhere",
    text: "Names are in a register, numbers are in your phone and dates are in Excel. It is hard to know who is due for a visit, who stopped coming and who needs a call. So follow-ups get missed.",
  },
  includedTitle: "What is included",
  included: [
    {
      title: "Simple customer dashboard",
      text: "Every customer in one place, with their name, contact and visit or membership dates.",
    },
    {
      title: "Reminders and follow-ups connected",
      text: "WhatsApp reminders use the same dashboard, so the right customer gets the right message at the right time.",
    },
    {
      title: "Weekly report every Monday",
      text: "A short email with what happened last week and who needs your attention.",
    },
    {
      title: "We move your old records",
      text: "Share your Excel sheet or register and we set up your first list for you.",
    },
    {
      title: "Monthly support",
      text: "After launch, we stay available to fix issues and make small changes.",
    },
  ],
  stepsTitle: "How it works",
  steps: [
    {
      title: "Share your customer list",
      text: "Send us your Excel sheet, or photos of your register.",
    },
    {
      title: "We set up your dashboard",
      text: "We organise your records and build a dashboard made for your business.",
    },
    {
      title: "You use it every day",
      text: "Add or update customers in a few taps. Reminders and follow-ups use the same data.",
    },
    {
      title: "Report arrives on Monday",
      text: "You get a simple weekly email, so you always know where your business stands.",
    },
  ],
  bestFor: [
    "Gyms and fitness studios",
    "Clinics and small hospitals",
    "Salons and spas",
    "Coaching classes and tuition centres",
    "Any business with repeat customers",
  ],
  faqs: [
    {
      q: "Do I need technical knowledge?",
      a: "No. We set everything up for you. You only use a simple dashboard.",
    },
    {
      q: "Can I bring my existing Excel data?",
      a: "Yes. Share your sheet and we import it for you during setup.",
    },
    {
      q: "Who can see my customer data?",
      a: "Only the people you choose. We use customer details only to run the service you ask for.",
    },
    {
      q: "What does the weekly report include?",
      a: "It is a short email with the main numbers for your business. We agree on what to include with you during the demo.",
    },
  ],
  ctaHeading: "See a demo with your own kind of customers",
};

export const chatbot: ServiceContent = {
  slug: "chatbot",
  earlyAccess: true,
  metaTitle: "24/7 Website & WhatsApp Chatbot for Your Business",
  metaDescription:
    "A chatbot that answers your customers' questions day and night, using your own prices, timings and services. Early Access for small businesses in India.",
  h1: "A Chatbot That Answers Your Customers 24/7",
  subtext:
    "Customers ask about prices, timings and services at all hours. The chatbot replies using the information you give us, and passes real conversations to you.",
  problem: {
    title: "Customers ask, and nobody answers in time",
    text: "People message late at night or while you are busy. The same questions come again and again. If nobody replies quickly, many of them go to someone else.",
  },
  includedTitle: "What is included",
  included: [
    {
      title: "Answers from your own information",
      text: "Your prices, timings, services and location, set up by us with you.",
    },
    {
      title: "On your website and WhatsApp",
      text: "Customers can ask questions where it is easiest for them.",
    },
    {
      title: "Collects customer details",
      text: "When someone is interested, the chatbot asks for their name and number and saves it in your dashboard.",
    },
    {
      title: "Hands over to you",
      text: "When a question needs a person, you are notified and can reply yourself.",
    },
    {
      title: "Monthly support",
      text: "We update answers when your prices or timings change.",
    },
  ],
  stepsTitle: "How it works",
  steps: [
    {
      title: "You tell us about your business",
      text: "Share your prices, timings, services and common questions.",
    },
    {
      title: "We set up the chatbot",
      text: "We prepare the answers and test them with you before it goes live.",
    },
    {
      title: "It replies to your customers",
      text: "Customers get quick answers, day and night.",
    },
    {
      title: "You follow up on interested people",
      text: "New enquiries land in your dashboard so you can contact them.",
    },
  ],
  bestFor: [
    "Gyms with questions about plans and timings",
    "Clinics with questions about doctors and appointments",
    "Salons and coaching classes",
    "Businesses that get many repeat questions",
  ],
  faqs: [
    {
      q: "What if it doesn't know the answer?",
      a: "It only answers from the information you give us. If it is not sure, it tells the customer that the team will reply, and you are notified so you can answer personally.",
    },
    {
      q: "Will customers know it is a chatbot?",
      a: "Yes. We do not pretend it is a person.",
    },
    {
      q: "Can I change the answers later?",
      a: "Yes. Tell us what changed and we update it, or we show you how to do it yourself.",
    },
    {
      q: "What does Early Access mean?",
      a: earlyAccessNote,
    },
  ],
  ctaHeading: "Want to try the chatbot for your business?",
};

export const aiReceptionist: ServiceContent = {
  slug: "ai-receptionist",
  earlyAccess: true,
  metaTitle: "24/7 AI Receptionist That Answers Your Calls",
  metaDescription:
    "An AI receptionist that picks up calls, answers common questions and books appointments for your business. Early Access for small businesses in India.",
  h1: "Never Miss a Call Again",
  subtext:
    "When you are busy or the office is closed, our AI receptionist picks up, answers common questions and books appointments for you.",
  problem: {
    title: "Missed calls are missed customers",
    text: "Your team cannot answer every call. Callers who do not get an answer often call someone else, and you may never know they tried.",
  },
  includedTitle: "What is included",
  included: [
    {
      title: "Answers your calls",
      text: "It picks up when you are busy or the office is closed.",
    },
    {
      title: "Answers common questions",
      text: "Prices, timings, location and services, from the information you give us.",
    },
    {
      title: "Books appointments",
      text: "Bookings go into your dashboard, and the caller gets a WhatsApp confirmation.",
    },
    {
      title: "Tells you what happened",
      text: "You get a short summary of each call, so you can follow up when needed.",
    },
    {
      title: "Monthly support",
      text: "We adjust answers and fix issues after launch.",
    },
  ],
  stepsTitle: "How it works",
  steps: [
    {
      title: "You tell us how you take calls",
      text: "Share your timings, services and the questions callers ask most.",
    },
    {
      title: "We set up your receptionist",
      text: "We prepare it and test it with you before any real caller hears it.",
    },
    {
      title: "It answers and books",
      text: "Callers get answers and can book a time right away.",
    },
    {
      title: "You see every call",
      text: "A summary of each call is saved in your dashboard.",
    },
  ],
  bestFor: [
    "Clinics that get many appointment calls",
    "Salons and spas that are busy with customers",
    "Gyms and coaching classes with enquiry calls",
    "Any business that misses calls after hours",
  ],
  faqs: [
    {
      q: "Which languages does it support?",
      a: "We confirm language support for your business during the demo.",
    },
    {
      q: "Does it replace my staff?",
      a: "No. It helps when your staff cannot pick up. Your team still handles the conversations that need a person.",
    },
    {
      q: "What if the caller wants to talk to a person?",
      a: "We set up what should happen in that case, for example taking a message so you can call back.",
    },
    {
      q: "What does Early Access mean?",
      a: earlyAccessNote,
    },
  ],
  ctaHeading: "Want to try the AI receptionist?",
};
