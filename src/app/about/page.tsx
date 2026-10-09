import type { Metadata } from "next";
import BrandName from "@/components/BrandName";
import Breadcrumbs from "@/components/Breadcrumbs";
import FounderPhoto from "@/components/FounderPhoto";
import JsonLd from "@/components/JsonLd";
import DemoButton from "@/components/lead/DemoButton";
import { siteConfig } from "@/config/site";

const title = `About ${siteConfig.founder}, Founder`;
const description =
  "Viijeta R is the founder of VYSON-AI, bringing product and data experience from London and Dubai to build AI automation that works 24/7 for businesses.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: "/about",
    type: "profile",
    images: [{ url: "/founder.jpg", width: 720, height: 720, alt: "Viijeta R, founder of VYSON-AI" }],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.founder,
  jobTitle: "Founder",
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of East London" },
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

      {/* 1. Intro */}
      <section className="bg-white">
        <div className="site-container hero-y grid grid-cols-[minmax(0,1fr)] items-center gap-6 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-10">
          <FounderPhoto />
          <div className="text-center md:text-left">
            <h1>Hi, I&apos;m {siteConfig.founder}</h1>
            <p className="measure mt-5 text-lg leading-relaxed text-muted-strong">
              I help businesses save time, save money and grow with practical AI
              automation. Before starting <BrandName />, I completed my master&apos;s in
              FinTech at the University of East London and spent years building
              products and turning business data into decisions in London and
              Dubai. Now I bring that experience to business owners who want
              their work to run smarter.
            </p>
            <div className="mt-8">
              <DemoButton className={buttonClass} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. What I'm building */}
      <section className="bg-violet-tint">
        <div className="site-container section-y">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-violet">
              The <BrandName /> mission
            </p>
            <h2 className="mt-3">An AI team that works for your business, 24/7.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-strong">
              I took everything I learned in London and Dubai and turned it into one
              simple mission: give every business an AI team that never sleeps.{" "}
              <BrandName /> builds AI agents and automations for businesses in
              the US, the UK and India, so the repetitive work gets done
              automatically, day and night, while owners and their teams focus on
              customers and growth.
            </p>
          </div>

          <div className="section-gap text-center">
            <DemoButton className={buttonClass} />
          </div>
        </div>
      </section>
    </>
  );
}
