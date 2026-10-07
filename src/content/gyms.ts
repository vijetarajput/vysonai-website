import type { IndustryContent } from "@/content/industry";

export const gyms: IndustryContent = {
  business: "Gym",
  h1: "Stop Losing Gym Members. Automate Reminders on WhatsApp.",
  subtext:
    "Members who stop coming get a friendly WhatsApp reminder automatically. You get notified too, so you know who needs a personal call.",
  mockup: {
    businessName: "FitZone Gym",
    messages: [
      {
        text: "Hi Rahul, we missed you at the gym this week! 💪 Your next workout is waiting.",
        time: "10:42 AM",
      },
      {
        text: "Your membership renews in 5 days. Reply YES to renew.",
        time: "10:42 AM",
      },
    ],
  },

  problemsTitle: "Sound familiar?",
  problems: [
    {
      title: "Members join, then stop coming",
      text: "Many people start strong and quietly disappear after a few weeks. You only find out when they don't renew.",
    },
    {
      title: "Renewals get missed",
      text: "A membership ends and nobody reminds the member. You lose money without even noticing.",
    },
    {
      title: "No time to call every member",
      text: "You are busy running the gym. Calling every member one by one is not possible.",
    },
  ],

  automationsTitle: "What we automate for your gym",
  automations: [
    {
      title: "7-day absence reminder",
      text: "If a member has not come for 7 days, they get a friendly WhatsApp message. You get a notification too.",
    },
    {
      title: "Renewal reminder",
      text: "Members get a reminder 5 to 7 days before their membership ends.",
    },
    {
      title: "Welcome message",
      text: "New members get a welcome message with a diet and workout plan as soon as they join.",
    },
    {
      title: "Birthday wishes",
      text: "Every member gets a birthday message from your gym, automatically.",
    },
    {
      title: "Enquiry follow-up",
      text: "People who asked about your gym but did not join get a gentle follow-up message.",
    },
  ],

  report: {
    title: "A simple report every Monday",
    text: "Every Monday, you get a simple email: who joined, who stopped coming, and whose membership is ending.",
  },

  stepsTitle: "How it works",
  steps: [
    {
      title: "Attendance is shared",
      text: "Attendance data from your biometric machine is shared with us every day.",
    },
    {
      title: "We check who has not come",
      text: "The system checks which members have not visited.",
    },
    {
      title: "Reminders go out on WhatsApp",
      text: "Friendly reminders are sent automatically. You don't have to do anything.",
    },
    {
      title: "You see everything in one place",
      text: "A simple dashboard shows all your members and what is happening.",
    },
  ],

  pilot: {
    title: "Try it for one month first",
    text: "Start with a 1-month pilot and see results before you commit.",
  },

  faqs: [
    {
      q: "Do I need technical knowledge?",
      a: "No. We set up everything for you. You only use a simple dashboard.",
    },
    {
      q: "Does it work with my biometric machine?",
      a: "Most machines can export attendance data. We check your machine during the demo.",
    },
    {
      q: "Is my members' data safe?",
      a: "We only use the member's name, phone number and attendance date and time. We never use fingerprint data.",
    },
    {
      q: "Is this official WhatsApp?",
      a: "Yes. We use the official WhatsApp Business API. Meta charges a small per-message fee, which is billed to the gym.",
    },
    {
      q: "Can members stop the messages?",
      a: "Yes. Members can stop the messages at any time.",
    },
  ],

  ctaHeading: "See it working for your gym",
};
