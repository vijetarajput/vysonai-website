import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import BrandName from "@/components/BrandName";
import { siteConfig } from "@/config/site";

const photoFile = "founder.jpg";

export default function Founder() {
  // Show a neutral placeholder until /public/founder.jpg is added.
  const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", photoFile));

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[280px_1fr] md:gap-14">
        <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-3xl bg-violet-tint shadow-soft md:w-full">
          {hasPhoto ? (
            <Image
              src={`/${photoFile}`}
              alt={siteConfig.founder}
              fill
              sizes="(min-width: 768px) 280px, 224px"
              className="object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label="Photo coming soon"
              className="flex h-full w-full items-end justify-center text-brand-violet/40"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4/5 w-4/5"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
              </svg>
            </div>
          )}
        </div>

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
