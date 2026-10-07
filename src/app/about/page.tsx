import type { Metadata } from "next";
import BrandName from "@/components/BrandName";
import FinalCta from "@/components/FinalCta";
import FounderPhoto from "@/components/FounderPhoto";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

const title = `About ${siteConfig.founder}, Founder of ${siteConfig.name}`;
const description =
  "Meet the founder of VYSON-AI. Learn why we build simple WhatsApp automation for gyms, clinics and local businesses in India, and how we work with you.";

export const metadata: Metadata = {
  title: "About the Founder",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about", type: "profile" },
};

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
  worksFor: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
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

      {/* Intro */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-[280px_1fr] md:gap-14">
          <FounderPhoto className="mx-auto w-56 md:w-full" />
          <div className="text-center md:text-left">
            <h1>Hi, I&apos;m {siteConfig.founder}</h1>
            <p className="measure mt-5 text-lg leading-relaxed text-muted-strong">
              I am the founder of <BrandName />. I have worked in banking, data
              analytics and product leadership, and I now help small businesses
              in India replace repetitive manual work with simple automation.
            </p>
          </div>
        </div>
      </section>

      {/* Why VYSON-AI exists */}
      <section className="bg-violet-tint">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2>
            Why <BrandName /> exists
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-strong">
            <p>
              Many gyms, clinics and local businesses lose customers, and it is
              rarely because their service is bad. It happens because follow-up
              depends on someone remembering to call, and busy people forget.
            </p>
            <p>
              Big companies use expensive systems to solve this. Small
              businesses usually cannot. I started <BrandName /> to bring simple,
              practical automation to the businesses that need it most, without
              asking you to learn anything technical.
            </p>
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
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

      {/* Credentials */}
      <section className="bg-violet-tint">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
          <ul className="space-y-2 text-charcoal">
            <li className="font-medium">MSME Registered: {siteConfig.udyam}</li>
            <li className="text-muted-strong">Based in {siteConfig.location}</li>
          </ul>
        </div>
      </section>

      <FinalCta heading="Let's find out what we can automate for you" />
    </>
  );
}
