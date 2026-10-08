import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

export type Crumb = {
  label: string;
  /** Path on this site, for example "/contact" or "/#services". Used for the link and for the JSON-LD. */
  href: string;
};

// Left edge of the bar matches the page content below it.
const widths = {
  default: "",
  narrow: "mx-auto max-w-3xl",
  wide: "",
} as const;

/**
 * Breadcrumb bar placed just below the header on every page except Home.
 * "Home" is added automatically. The last item is the current page: plain text,
 * not a link. On narrow screens the bar stays on one line and scrolls sideways
 * inside its own container.
 */
export default function Breadcrumbs({
  items,
  width = "default",
}: {
  items: Crumb[];
  width?: keyof typeof widths;
}) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${siteConfig.url}${crumb.href}`,
    })),
  };

  return (
    <div className="bg-white">
      <div className="site-container">
       <div className={widths[width]}>
        <nav
          aria-label="Breadcrumb"
          className="overflow-x-auto overscroll-x-contain pb-1 pt-3 text-[13px] leading-5 text-muted sm:text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ol className="flex w-max min-w-full flex-nowrap items-center whitespace-nowrap">
            {trail.map((crumb, index) => {
              const isCurrent = index === trail.length - 1;
              return (
                <li key={crumb.href} className="flex items-center">
                  {index > 0 && (
                    <span aria-hidden="true" className="px-2 text-muted">
                      ›
                    </span>
                  )}
                  {isCurrent ? (
                    <span aria-current="page" className="font-medium text-charcoal">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="py-1 text-brand-blue underline-offset-2 hover:underline"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
       </div>
      </div>
      <JsonLd data={jsonLd} />
    </div>
  );
}
