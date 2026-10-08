import type { Metadata } from "next";
import BrandName from "@/components/BrandName";
import Breadcrumbs from "@/components/Breadcrumbs";
import FinalCta from "@/components/FinalCta";
import FounderPhoto from "@/components/FounderPhoto";
import JsonLd from "@/components/JsonLd";
import DemoButton from "@/components/lead/DemoButton";
import ServiceIcon from "@/components/ServiceIcon";
import { siteConfig } from "@/config/site";
import type { IconName } from "@/content/services";

const title = `About ${siteConfig.founder}, Founder of ${siteConfig.name}`;
const description =
  "Founder of VYSON-AI, University of East London alumna with product and data experience in London and Dubai, helping businesses grow with AI automation.";

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

const badges = [
  "University of East London alumna",
  "Worked in London & Dubai",
  "Speaks English, Hindi & Gujarati",
];

const journey = [
  {
    role: "MSc in Blockchain and Financial Technologies",
    where: "University of East London, London",
    years: "2022–2023",
    text: "Studied how technology and data are changing the way businesses work.",
  },
  {
    role: "Data Analyst",
    where: "London",
    years: "2024–2025",
    text: "Built dashboards and reports that turned raw business data into clear, everyday decisions.",
  },
  {
    role: "Product Lead",
    where: "Dubai",
    years: "2023–2026",
    text: "Helped build an early-stage SaaS platform from the idea stage: onboarding, dashboards, payments and growth, and helped onboard 50+ creators, small businesses and partners.",
  },
  {
    role: "Founder, VYSON-AI",
    where: "Gujarat, India",
    years: "2026 – present",
    text: "Bringing AI automation to businesses so owners can focus on growth, not repetitive work.",
  },
];

const strengths: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "clipboard",
    title: "Product thinking",
    text: "I start with your business problem, not the tool.",
  },
  {
    icon: "chart",
    title: "Data and dashboards",
    text: "Years of turning numbers into clear decisions.",
  },
  {
    icon: "cog",
    title: "AI and automation",
    text: "Practical systems that run quietly in the background.",
  },
  {
    icon: "chat",
    title: "Clear communication",
    text: "Simple explanations, in English, Hindi or Gujarati.",
  },
];

const certifications = [
  "Tableau Certified Data Analyst",
  "AI Agents & Autonomous Systems",
  "AI Product Building, Storytelling & Analytics",
  "AI Fundamentals & Ecosystem Mastery",
];

const principles = [
  {
    title: "I start with your problem, not a tool",
    text: "First we talk about what is going wrong in your business today. Only then do we decide what, if anything, to automate.",
  },
  {
    title: "You see a working demo before you pay",
    text: "I show you a demo made for your business first, so you can judge it with your own eyes.",
  },
  {
    title: "Support continues after launch",
    text: "After your system is live, we stay with you with monthly support to fix issues and make changes.",
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
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of East London" },
  sameAs: [siteConfig.founderLinkedin],
  address: {
    "@type": "PostalAddress",
    addressRegion: siteConfig.region,
    addressCountry: siteConfig.countryCode,
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <Breadcrumbs items={[{ label: "About", href: "/about" }]} />

      {/* 1. Intro */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-[300px_1fr] md:gap-14">
          <FounderPhoto className="mx-auto w-60 md:w-full" />
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
            <ul className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-border bg-violet-tint px-3.5 py-1.5 text-[13px] font-medium text-charcoal"
                >
                  {badge}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:justify-start">
              <DemoButton className="inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark">
                Book a free call
              </DemoButton>
              <a
                href={siteConfig.founderLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-brand-violet px-7 py-3.5 text-base font-medium text-brand-violet transition-colors hover:bg-violet-tint"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. My journey */}
      <section className="bg-violet-tint">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="text-center">My journey</h2>
          <ol className="relative mt-10 space-y-8 border-l-2 border-brand-violet/25 pl-8 sm:pl-10">
            {journey.map((step) => (
              <li key={step.role} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-[3px] border-violet-tint bg-brand-violet sm:-left-[49px]"
                />
                <p className="text-sm font-medium text-brand-violet">{step.years}</p>
                <h3 className="mt-1">{step.role}</h3>
                <p className="mt-0.5 text-sm text-muted-strong">{step.where}</p>
                <p className="mt-2 leading-relaxed text-muted-strong">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Why I started */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <h2>
            Why I started <BrandName />
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-strong">
            Again and again I saw good businesses lose customers and hours to the
            same problems: replies sent late, follow-ups forgotten, data scattered
            across registers and spreadsheets. Big companies solve this with
            expensive teams and software. I started <BrandName /> to give every
            business the same advantage, with simple AI automation that fits how
            they already work.
          </p>
        </div>
      </section>

      {/* 4. What I bring */}
      <section className="bg-violet-tint">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="text-center">What I bring</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-border bg-white p-5 shadow-soft"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-tint text-brand-violet">
                  <ServiceIcon name={item.icon} size={22} />
                </span>
                <h3 className="mt-3 text-lg">{item.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-strong">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Certifications */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <h2>Certifications</h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
            {certifications.map((cert) => (
              <li
                key={cert}
                className="rounded-full border border-border bg-violet-tint px-4 py-2 text-sm font-medium text-charcoal"
              >
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. How I work */}
      <section className="bg-violet-tint">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="text-center">How I work</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {principles.map((item) => (
              <li
                key={item.title}
                className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8"
              >
                <h3>{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-strong">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. CTA band */}
      <FinalCta
        heading="Let's make your business run smarter."
        buttonLabel="Book a free call"
        footnote={`MSME Registered: ${siteConfig.udyam} · Based in ${siteConfig.location}`}
      />
    </>
  );
}
