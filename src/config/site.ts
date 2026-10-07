const whatsappNumber = "91XXXXXXXXXX";

export const siteConfig = {
  name: "VYSON AI",
  url: "https://vysonai.com",
  description:
    "VYSON AI helps businesses grow with WhatsApp automation, CRM and an AI receptionist that never misses a lead.",
  tagline: "WhatsApp Automation, CRM & AI Receptionist",
  aboutShort:
    "VYSON AI helps businesses automate WhatsApp, manage customers and never miss a lead.",
  contact: {
    whatsappNumber,
    whatsappUrl: `https://wa.me/${whatsappNumber}`,
    email: "hello@vysonai.com", // placeholder - replace with the real email
    city: "Ahmedabad, Gujarat, India",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/vysonai",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
  cta: { label: "Get Free Demo", href: "/contact" },
} as const;

export type SiteConfig = typeof siteConfig;
