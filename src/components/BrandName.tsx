import { siteConfig } from "@/config/site";

/**
 * Company name for visible page text: semibold with a decorative 3px
 * brand-gradient underline. Not a link. Do NOT use inside titles, meta tags,
 * alt text or logo images (use siteConfig.name as plain text there).
 */
export default function BrandName({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-block whitespace-nowrap mb-[calc(-1*max(5px,0.12em))] pb-[max(5px,0.12em)] font-semibold ${className}`}
    >
      {siteConfig.name}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-brand-gradient"
      />
    </span>
  );
}
