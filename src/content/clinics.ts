import type { IndustryContent } from "@/content/industry";

export const clinics: IndustryContent = {
  h1: "Fewer No-Shows. Automatic Appointment Reminders on WhatsApp.",
  subtext:
    "Patients get a friendly WhatsApp reminder before every visit. Fewer people forget, and your day runs smoothly.",
  mockup: {
    businessName: "Greenleaf Family Clinic",
    messages: [
      {
        text: "Hi Priya, this is a reminder about your appointment tomorrow at 5:30 PM. Reply YES to confirm.",
        time: "9:15 AM",
      },
      {
        text: "Your appointment is in 3 hours. We look forward to seeing you!",
        time: "2:30 PM",
      },
    ],
  },

  problemsTitle: "Sound familiar?",
  problems: [
    {
      title: "Patients forget appointments",
      text: "People get busy and forget. The doctor waits, and that time is lost.",
    },
    {
      title: "Follow-up visits are missed",
      text: "Patients who should come back for a follow-up visit often never return.",
    },
    {
      title: "No time to call every patient",
      text: "Your staff is busy at the front desk. Calling every patient is not possible.",
    },
  ],

  automationsTitle: "What we automate for your clinic",
  automations: [
    {
      title: "Easy booking",
      text: "Patients book from your website or on WhatsApp. Every booking goes into one patient dashboard.",
    },
    {
      title: "Appointment reminders",
      text: "Patients get a WhatsApp reminder 1 day before and again a few hours before.",
    },
    {
      title: "Missed appointment follow-up",
      text: "If a patient misses a visit, they get a message to book a new time.",
    },
    {
      title: "Follow-up visit reminders",
      text: "Patients who need a follow-up visit get a reminder at the right time.",
    },
    {
      title: "Weekly report email",
      text: "A simple email once a week with your appointments, missed visits and follow-ups.",
    },
  ],

  report: {
    title: "A simple report every Monday",
    text: "Every Monday, you get a simple email: how many patients booked, who missed their visit, and who is due for a follow-up.",
  },

  stepsTitle: "How it works",
  steps: [
    {
      title: "Patients book",
      text: "Patients book from your website or on WhatsApp.",
    },
    {
      title: "Bookings go into a dashboard",
      text: "Every appointment is saved in one simple patient dashboard.",
    },
    {
      title: "Reminders go out on WhatsApp",
      text: "Reminders are sent automatically, 1 day before and a few hours before.",
    },
    {
      title: "You see everything in one place",
      text: "See appointments, missed visits and follow-ups, and get a weekly email.",
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
      q: "Is patient data safe?",
      a: "We only use the patient's name, phone number and appointment date and time. No medical or treatment details are ever sent on WhatsApp.",
    },
    {
      q: "Can patients book on WhatsApp?",
      a: "Yes. Patients can book from your website or by messaging you on WhatsApp. Every booking goes into your dashboard.",
    },
    {
      q: "Is this official WhatsApp?",
      a: "Yes. We use the official WhatsApp Business API. Meta charges a small per-message fee, which is billed to the clinic.",
    },
    {
      q: "Can patients stop the messages?",
      a: "Yes. Patients can stop the messages at any time.",
    },
  ],

  ctaHeading: "See it working for your clinic",
};
