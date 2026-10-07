import { siteConfig } from "@/config/site";

/**
 * Company name for visible page text: brand violet, semibold, with a 3px
 * violet underline and a small gap. Not a link (default cursor).
 *
 * On dark or colored backgrounds it turns white. Either pass `onDark`, or put
 * the `on-dark` class on any parent (the final CTA band does this).
 *
 * Do NOT use inside titles, meta tags, alt text or logo images
 * (use siteConfig.name as plain text there).
 */
export default function BrandName({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const text = onDark ? "text-white" : "text-brand-violet in-[.on-dark]:text-white";
  const line = onDark ? "bg-white" : "bg-brand-violet in-[.on-dark]:bg-white";

  return (
    <span
      className={`relative inline-block cursor-default whitespace-nowrap mb-[calc(-1*max(5px,0.12em))] pb-[max(5px,0.12em)] font-heading font-semibold ${text} ${className}`}
    >
      {siteConfig.name}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-[3px] rounded-full ${line}`}
      />
    </span>
  );
}
