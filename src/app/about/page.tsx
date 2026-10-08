import type { Metadata } from "next";
import BrandName from "@/components/BrandName";
import Breadcrumbs from "@/components/Breadcrumbs";
import FounderPhoto from "@/components/FounderPhoto";
import JsonLd from "@/components/JsonLd";
import DemoButton from "@/components/lead/DemoButton";
import ServiceIcon from "@/components/ServiceIcon";
import { siteConfig } from "@/config/site";
import type { IconName } from "@/content/services";

const title = `About ${siteConfig.founder}, Founder of ${siteConfig.name}`;
const description =
  "Viijeta R is the founder of VYSON-AI, bringing product and data experience from London and Dubai to build AI automation that works 24/7 for businesses.";

export const metadata: Metadata = {
  // `absolute` skips the "| VYSON-AI" suffix, because the brand is already in this title.
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title,
    description,
    url: "/about",
    type: "profile",
    images: [{ url: "/founder.jpg", width: 720, height: 720, alt: "Viijeta R, founder of VYSON-AI" }],
  },
};

const tiles: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "phone",
    title: "AI Receptionist",
    text: "Answers every call and books appointments for clinics, dental practices and restaurants.",
  },
  {
    icon: "chat",
    title: "WhatsApp Customer Service",
    text: "Instant replies, reminders and follow-ups for gyms and stores.",
  },
  {
    icon: "clipboard",
    title: "CRM",
    text: "Every customer, lead and follow-up in one place, so nobody slips through.",
  },
  {
    icon: "bag",
    title: "Inventory & Stock Management",
    text: "Know what's selling and what's running low, before it runs out.",
  },
  {
    icon: "chart",
    title: "Meta Ads",
    text: "Ads that reach the right customers and build your brand.",
  },
  {
    icon: "mail",
    title: "LinkedIn Outreach Automation",
    text: "Personalised outreach that turns prospects into booked meetings.",
  },
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.founder,
  jobTitle: "Founder",
  image: `${siteConfig.url}/founder.jpg`,
  url: `${siteConfig.url}/about`,
  worksFor: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
};

const buttonClass =
  "inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark";

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <Breadcrumbs items={[{ label: "About", href: "/about" }]} />

      {/* 1. Intro (overflow-x-clip keeps the halo glow from widening the page on mobile) */}
      <section className="overflow-x-clip bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-[400px_1fr] md:gap-10">
          <FounderPhoto />
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-violet">
              Founder, <BrandName />
            </p>
            <h1 className="mt-3">Hi, I&apos;m {siteConfig.founder}</h1>
            <p className="measure mt-5 text-lg leading-relaxed text-muted-strong">
              I help businesses save time, save money and grow with practical AI
              automation. Before starting <BrandName />, I studied FinTech in
              London and spent years building products and turning business data
              into decisions in London and Dubai. Now I bring that experience to
              business owners who want their work to run smarter.
            </p>
            <div className="mt-8">
              <DemoButton className={buttonClass}>Book a free call</DemoButton>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What I'm building */}
      <section className="bg-violet-tint">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-violet">
              The <BrandName /> mission
            </p>
            <h2 className="mt-3">An AI team that works for your business, 24/7.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-strong">
              I took everything I learned in London and Dubai and turned it into one
              simple mission: give every business an AI team that never sleeps.{" "}
              <BrandName /> builds AI agents and automations for businesses in
              India, the UK and the US, so the repetitive work gets done
              automatically, day and night, while owners and their teams focus on
              customers and growth.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {tiles.map((tile) => (
              <li
                key={tile.title}
                className="rounded-2xl border border-border bg-white p-5 shadow-soft transition-all duration-200 hover:border-brand-violet/60 hover:shadow-md motion-safe:hover:-translate-y-1"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-tint text-brand-violet">
                  <ServiceIcon name={tile.icon} size={22} />
                </span>
                <h3 className="mt-3 text-lg font-bold">{tile.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-strong">
                  {tile.text}
                </p>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-12 max-w-3xl text-center font-heading text-2xl font-bold leading-snug text-charcoal sm:text-3xl">
            One partner. One system. Your business, growing while you sleep.
          </p>
          <div className="mt-8 text-center">
            <DemoButton className={buttonClass}>Book a free call</DemoButton>
          </div>
        </div>
      </section>
    </>
  );
}
