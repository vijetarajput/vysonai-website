import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const photoFile = "founder.jpg";

/** Founder photo from /public/founder.jpg. Shows a neutral placeholder until the file is added. */
export default function FounderPhoto({ className = "" }: { className?: string }) {
  const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", photoFile));

  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-3xl bg-white shadow-soft ${className}`}
    >
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
          className="flex h-full w-full items-end justify-center bg-violet-tint text-brand-violet/40"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4/5 w-4/5" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
          </svg>
        </div>
      )}
    </div>
  );
}
