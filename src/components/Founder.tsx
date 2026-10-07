import Link from "next/link";
import BrandName from "@/components/BrandName";
import FounderPhoto from "@/components/FounderPhoto";
import { siteConfig } from "@/config/site";

export default function Founder() {
  return (
    <section className="bg-violet-tint">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[280px_1fr] md:gap-14">
        <FounderPhoto className="mx-auto w-56 md:w-full" />

        <div className="text-center md:text-left">
          <h2>Hi, I&apos;m {siteConfig.founder}</h2>
          <p className="measure mt-4 text-lg leading-relaxed text-muted-strong">
            Founder of <BrandName />. With a background in banking, data
            analytics and product leadership, I help businesses replace
            repetitive manual work with simple automation.
          </p>
          <Link href="/about" className="link-brand mt-5 inline-block font-semibold">
            More about me &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
