const showWhatsApp = false as boolean;
const whatsappNumber = "";
const whatsappMessage = "Hi, I want to know about AI automation for my business.";

export const siteConfig = {
  name: "VYSON-AI",
  url: "https://vysonai.com",
  tagline: "Your Business Growth Partner",
  founder: "Viijeta R",
  email: "vysonai24@gmail.com",
  location: "Gujarat, India",
  region: "Gujarat",
  countryCode: "IN",
  whatsappNumber,
  whatsappMessage,
  // Public Chat on WhatsApp CTAs (floating button, footer, contact, form). Flip to true to bring them back.
  showWhatsApp,
  udyam: "UDYAM-GJ-01-0682560",

  // Public WhatsApp chat URL. Empty while showWhatsApp is false so no wa.me link is shipped.
  whatsappUrl: "",

  // SEO (plain text only: titles and meta tags never use the BrandName component)
  seoTitle: "WhatsApp Automation, CRM & AI Receptionist",
  description:
    "VYSON-AI helps businesses grow with WhatsApp automation, CRM and an AI receptionist, so fewer customers slip through the cracks.",

  // Visible copy that follows the <BrandName /> component, e.g. "VYSON-AI automates ..."
  footerBlurb:
    "builds AI agents that handle your calls, customers, stock and marketing, 24/7.",

  // Header: Services (a dropdown) is added after Home in the Header component.
  headerNav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  // Footer
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
  cta: { label: "Book a free 30-min business audit" },
} as const;

export type SiteConfig = typeof siteConfig;
