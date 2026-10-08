import type { FaqItem } from "@/content/industry";
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
  | "search";

export type ServiceSlug =
  | "whatsapp-automation"
  | "chatbot"
  | "ai-dashboard"
  | "ai-receptionist";

export type ServiceStep = { icon: IconName; title: string; text: string };
export type ServiceIndustry = { name: string; icon: IconName; text: string };

export type ServiceContent = {
  slug: ServiceSlug;
  /** Shows an "Early Access" badge next to the page heading. */
  earlyAccess?: boolean;
  metaTitle: string;
  metaDescription: string;
  /** The home-card question, shown as a small eyebrow above the H1. */
  question: string;
  h1: string;
  subtext: string;
  /** Hero visual: the same scene as the matching home hero slide. */
  visual: "whatsapp" | "dashboard" | "chatbot" | "receptionist";
  /** Preselected in the demo form when opened from this page. */
  interests: Interest[];
  before: string[];
  after: string[];
  /** Adds the "Bonus: More Google reviews" block after "How it works" (WhatsApp page only). */
  reviewsBonus?: boolean;
  /** Optional "normal vs AI" comparison (AI Dashboard only). */
  comparison?: { title: string; normalLabel: string; aiLabel: string; rows: { normal: string; ai: string }[] };
  steps: ServiceStep[];
  industries: ServiceIndustry[];
  deliverables: string[];
  faqs: FaqItem[];
  ctaHeading: string;
};

const earlyAccessNote =
  "Early Access means we are opening this service to a small number of businesses first, so we can set it up with you and improve it together.";

export const whatsappAutomation: ServiceContent = {
  slug: "whatsapp-automation",
  metaTitle: "WhatsApp Automation: Reminders, Renewals & Follow-ups",
  metaDescription:
    "Instant replies, reminders, renewals and follow-ups on WhatsApp, sent automatically through the official WhatsApp Business API. Built for gyms, clinics and local businesses in India.",
  question: "What if every customer got a reply in 2 seconds?",
  h1: "Your customers get instant replies, reminders and follow-ups, automatically.",
  subtext:
    "Built on the official WhatsApp Business API, so reminders, renewals and follow-ups go out on time without you or your staff typing them one by one.",
  visual: "whatsapp",
  reviewsBonus: true,
  interests: ["Reminders", "Follow-ups"],
  before: [
    "You or your staff type reminders one by one, whenever you remember.",
    "Renewals and follow-ups slip through the cracks on busy days.",
    "Customers who message after closing time wait until morning for a reply.",
  ],
  after: [
    "Reminders and renewal messages go out on schedule, on their own.",
    "Every new enquiry gets a welcome message and a follow-up, so nobody is forgotten.",
    "Customers get an instant first reply, even late at night.",
  ],
  steps: [
    {
      icon: "clipboard",
      title: "Tell us your routine",
      text: "Share who you message, when, and what you usually say today.",
    },
    {
      icon: "cog",
      title: "We set up your messages",
      text: "We connect the official WhatsApp Business API and prepare your message templates for approval.",
    },
    {
      icon: "bolt",
      title: "Messages run themselves",
      text: "Reminders, renewals and follow-ups go out automatically. You can see what was sent.",
    },
  ],
  industries: [
    {
      name: "Gym",
      icon: "dumbbell",
      text: "A renewal reminder goes out a few days before a membership ends, with an easy way to reply.",
    },
    {
      name: "Clinic",
      icon: "clinic",
      text: "Patients get an appointment reminder the day before, so they remember to come.",
    },
    {
      name: "Retail store",
      icon: "bag",
      text: "Customers who opted in hear about a new arrival or a festival offer.",
    },
    {
      name: "Coaching",
      icon: "book",
      text: "Fee reminders and class timing changes reach every parent at once.",
    },
  ],
  deliverables: [
    "Setup on the official WhatsApp Business API",
    "Reminders and renewal messages on your schedule",
    "Follow-up messages for every new enquiry",
    "A welcome message for every new customer",
    "Broadcasts, only to customers who opted in",
    "Review requests: every customer gets your review link",
  ],
  faqs: [
    {
      q: "Is this the official WhatsApp Business API?",
      a: "Yes. We use the official WhatsApp Business API. Message templates are approved by WhatsApp before we use them.",
    },
    {
      q: "Will my customers get messages they did not ask for?",
      a: "No. Broadcasts go only to customers who agreed to receive messages (opt-in), and they can ask to stop at any time.",
    },
    {
      q: "Can customers reply to the messages?",
      a: "Yes. Customers can reply whenever they like. During setup we decide together what is answered automatically and what comes to you.",
    },
    {
      q: "Do I have to change my WhatsApp number?",
      a: "We confirm the best setup for your number during the demo. A number on the Business API works differently from the normal WhatsApp app, and we explain your options before anything changes.",
    },
    {
      q: "How do review requests work?",
      a: "After a visit or purchase, every customer receives the same message with your review link.",
    },
  ],
  ctaHeading: "Ready for WhatsApp that runs itself?",
};

export const chatbot: ServiceContent = {
  slug: "chatbot",
  earlyAccess: true,
  metaTitle: "AI Chatbot for Your Website: Answers & Captures Leads 24/7",
  metaDescription:
    "An AI chatbot that answers customers from your own prices, timings and services in Hindi or English, saves every lead and hands over to you when unsure. Early Access.",
  question: "Is your website losing customers at 11 PM?",
  h1: "A website that answers customers and captures leads, even at midnight.",
  subtext:
    "An AI assistant that replies from your own prices, timings and services, in Hindi or English, and saves every lead for you.",
  visual: "chatbot",
  interests: ["Chatbot"],
  before: [
    "Visitors with a question leave when nobody is around to answer.",
    "You repeat the same price and timing answers all day.",
    "Enquiries arrive as scattered messages, and some are never noted down.",
  ],
  after: [
    "The chatbot answers from your own prices, timings and services, day and night.",
    "It replies in Hindi or English, whichever the visitor uses.",
    "It asks for a name and number, saves the lead, and hands over to you when it is unsure.",
  ],
  steps: [
    {
      icon: "clipboard",
      title: "Share your business details",
      text: "Send us your prices, timings, services and the questions customers ask most.",
    },
    {
      icon: "globe",
      title: "We build and test it with you",
      text: "We set up the answers, add the chatbot to your website, and you check it before it goes live.",
    },
    {
      icon: "chat",
      title: "It talks, you follow up",
      text: "Leads are saved for you. When it is unsure, it tells the visitor you will reply personally.",
    },
  ],
  industries: [
    {
      name: "Gym",
      icon: "dumbbell",
      text: "Answers questions about plans, timings and trial classes, and takes the visitor's number.",
    },
    {
      name: "Clinic",
      icon: "clinic",
      text: "Shares doctor timings and the clinic address, and collects appointment requests.",
    },
    {
      name: "Retail store",
      icon: "bag",
      text: "Answers price and availability questions from the product list you share.",
    },
    {
      name: "Coaching",
      icon: "book",
      text: "Explains batches and fees, and saves every parent's enquiry.",
    },
  ],
  deliverables: [
    "An AI chatbot on your website",
    "Answers from your own prices, timings and services",
    "Replies in Hindi and English",
    "Collects name and number and saves each lead",
    "Hands over to you when it is unsure",
    "Help updating the answers when your offers change",
  ],
  faqs: [
    {
      q: "What if the chatbot does not know the answer?",
      a: "It does not guess. It tells the visitor you will get back to them, and saves their name and number so you can follow up.",
    },
    {
      q: "Which languages does it speak?",
      a: "Hindi and English. We test the answers in both languages with you before the chatbot goes live.",
    },
    {
      q: "Will visitors know it is a chatbot?",
      a: "Yes. It introduces itself as an assistant for your business, so nobody is misled.",
    },
    {
      q: "Can I change the answers later?",
      a: "Yes. When your prices, timings or services change, tell us and we update the answers.",
    },
    {
      q: "What does Early Access mean?",
      a: earlyAccessNote,
    },
  ],
  ctaHeading: "Want a website that answers while you sleep?",
};

export const aiDashboard: ServiceContent = {
  slug: "ai-dashboard",
  metaTitle: "AI Dashboard: Ask Your Business a Question, Get the Answer",
  metaDescription:
    "Sales, stock, customers and payments in one place. Ask in Hindi or English, get low-stock and payment alerts, and a weekly report every Monday. Built for small businesses in India.",
  question: "What if you could just ask your business a question?",
  h1: "Ask your business a question. Get the answer in seconds.",
  subtext:
    "Sales, stock, customers and payments in one place. Ask in Hindi or English, and get alerts and a Monday report without having to check.",
  visual: "dashboard",
  interests: ["Customer dashboard", "Weekly report"],
  before: [
    "Sales are in one register, stock in another, and payments in your head.",
    "To find your best-selling product, you add up bills by hand.",
    "You find out an item is out of stock when a customer asks for it.",
  ],
  after: [
    "Sales, stock, customers and payments sit together in one dashboard.",
    "You type \"Which product sold most this week?\" and get the answer.",
    "Low-stock and pending-payment alerts reach you before they become a problem.",
  ],
  comparison: {
    title: "How is it different from a normal dashboard?",
    normalLabel: "Normal dashboard",
    aiLabel: "AI dashboard",
    rows: [
      {
        normal: "You search through charts to find what you need.",
        ai: "You just ask, and get the answer.",
      },
      {
        normal: "It shows you numbers only.",
        ai: "It also tells you what needs attention, like low stock and pending payments.",
      },
      {
        normal: "You check it when you remember.",
        ai: "A weekly report and alerts come to you.",
      },
    ],
  },
  steps: [
    {
      icon: "clipboard",
      title: "Share what you track today",
      text: "Excel sheets, registers or a billing app. Whatever you use now is the starting point.",
    },
    {
      icon: "chart",
      title: "We build your dashboard",
      text: "We bring your sales, stock, customers and payments into one place and test the questions you care about.",
    },
    {
      icon: "search",
      title: "Ask, get alerts, read the report",
      text: "Ask questions any time. Alerts and a Monday report arrive without you checking.",
    },
  ],
  industries: [
    {
      name: "Gym",
      icon: "dumbbell",
      text: "See who is due to renew and how many new members joined this week.",
    },
    {
      name: "Clinic",
      icon: "clinic",
      text: "Track appointments and pending payments in one view.",
    },
    {
      name: "Retail store",
      icon: "bag",
      text: "Ask which product sold most this week and which items are running low.",
    },
    {
      name: "Coaching",
      icon: "book",
      text: "See whose fees are pending and which batches are full.",
    },
  ],
  deliverables: [
    "One dashboard for sales, stock, customers and payments",
    "Ask questions in Hindi or English",
    "Low-stock alerts",
    "Pending-payment alerts",
    "A report by email every Monday",
    "Help moving your existing sheets and records in",
  ],
  faqs: [
    {
      q: "Do I need any technical knowledge?",
      a: "No. If you can send a WhatsApp message, you can ask the dashboard a question. We do the setup for you.",
    },
    {
      q: "Can I bring my existing Excel sheets?",
      a: "Yes. We help you move your current sheets and records into the dashboard, so you do not have to start over.",
    },
    {
      q: "Is the AI always right?",
      a: "It answers from your own data. We test the questions you care about with you before launch, and you can always check the numbers on the dashboard itself.",
    },
    {
      q: "What is in the Monday report?",
      a: "A short summary of the week: sales, what sold most, low stock and pending payments. We shape it with you during setup.",
    },
    {
      q: "Who can see my business data?",
      a: "Only the people you choose. We explain how your data is stored and who has access during the demo.",
    },
  ],
  ctaHeading: "Want to see your whole business on one screen?",
};

export const aiReceptionist: ServiceContent = {
  slug: "ai-receptionist",
  earlyAccess: true,
  metaTitle: "AI Receptionist: Answer Every Call and Book Appointments",
  metaDescription:
    "An AI receptionist that answers calls 24/7, answers common questions, books appointments, sends you a call summary and transfers to a person when needed. Early Access.",
  question: "How many calls did you miss last week?",
  h1: "Every call answered. Every appointment booked.",
  subtext:
    "An AI receptionist that picks up 24/7, answers common questions, books the appointment and tells you what happened.",
  visual: "receptionist",
  interests: ["AI receptionist"],
  before: [
    "Calls go unanswered when you are with a customer or the office is closed.",
    "Callers who cannot get through often call someone else.",
    "Booking by phone means writing it down and hoping nothing is missed.",
  ],
  after: [
    "Every call is picked up, day or night.",
    "Common questions are answered and the appointment is booked on the call.",
    "You get a short summary of each call, and a person can take over when needed.",
  ],
  steps: [
    {
      icon: "clipboard",
      title: "Tell us how you take calls",
      text: "Share your timings, services, booking rules and the questions callers usually ask.",
    },
    {
      icon: "cog",
      title: "We set up and test it with you",
      text: "We prepare the receptionist, and you call it yourself to check it before it goes live.",
    },
    {
      icon: "phone",
      title: "It answers, books and reports",
      text: "Calls are answered, appointments are booked, and you receive a summary of each call.",
    },
  ],
  industries: [
    {
      name: "Gym",
      icon: "dumbbell",
      text: "Answers questions about plans and timings, and books a trial visit.",
    },
    {
      name: "Clinic",
      icon: "clinic",
      text: "Books appointments and shares doctor timings while the front desk is busy.",
    },
    {
      name: "Retail store",
      icon: "bag",
      text: "Shares opening hours and the address, and takes a message for the owner.",
    },
    {
      name: "Coaching",
      icon: "book",
      text: "Handles admission enquiries and books a counselling call.",
    },
  ],
  deliverables: [
    "Calls answered 24/7",
    "Answers to common questions, from your own information",
    "Appointment booking",
    "A call summary sent to you",
    "Transfer to a person when needed",
    "Help updating the receptionist when things change",
  ],
  faqs: [
    {
      q: "Which languages does the AI receptionist speak?",
      a: "We confirm language support for your business during the demo.",
    },
    {
      q: "Will callers know they are speaking to an AI?",
      a: "Yes. The receptionist introduces itself as an assistant for your business, so nobody is misled.",
    },
    {
      q: "What if a caller needs a real person?",
      a: "We set this up with you. The call can be transferred to you or your staff, or the receptionist can take a message.",
    },
    {
      q: "Does it replace my staff?",
      a: "No. It handles the routine calls and bookings so your team can focus on the customers in front of them.",
    },
    {
      q: "What does Early Access mean?",
      a: earlyAccessNote,
    },
  ],
  ctaHeading: "Want to stop missing calls?",
};

/** Cards on the home page that lead to each service page. */
export type ServiceCardData = {
  slug: ServiceSlug;
  href: string;
  eyebrow: string;
  title: string;
  reveal: string;
};

export const serviceCards: ServiceCardData[] = [
  {
    slug: "whatsapp-automation",
    href: "/services/whatsapp-automation",
    eyebrow: "WhatsApp Automation",
    title: whatsappAutomation.question,
    reveal: "Reminders, follow-ups and renewals that run themselves.",
  },
  {
    slug: "chatbot",
    href: "/services/chatbot",
    eyebrow: "AI Chatbot",
    title: chatbot.question,
    reveal: "An AI assistant that replies in Hindi or English and saves every lead.",
  },
  {
    slug: "ai-dashboard",
    href: "/services/ai-dashboard",
    eyebrow: "AI Dashboard",
    title: aiDashboard.question,
    reveal: "\"Which product sold most this week?\" Answer in seconds, plus stock alerts.",
  },
  {
    slug: "ai-receptionist",
    href: "/services/ai-receptionist",
    eyebrow: "AI Receptionist",
    title: aiReceptionist.question,
    reveal: "An AI receptionist that answers 24/7 and books the appointment.",
  },
];

/** Menu entries for the header "Services" dropdown and the mobile accordion. */
export const serviceMenu: { href: string; title: string; text: string; icon: IconName }[] = [
  {
    href: "/services/whatsapp-automation",
    title: "WhatsApp Automation",
    text: "Instant replies and reminders on WhatsApp",
    icon: "chat",
  },
  {
    href: "/services/chatbot",
    title: "AI Chatbot",
    text: "Answer website visitors and capture leads 24/7",
    icon: "globe",
  },
  {
    href: "/services/ai-dashboard",
    title: "AI Dashboard",
    text: "Ask your business questions, get answers in seconds",
    icon: "chart",
  },
  {
    href: "/services/ai-receptionist",
    title: "AI Receptionist",
    text: "Every call answered, appointments booked",
    icon: "phone",
  },
];