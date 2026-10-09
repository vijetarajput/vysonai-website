import { getImageProps } from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import MobileNav from "@/components/MobileNav";
import NavLink from "@/components/NavLink";
import { ServicesDropdown } from "@/components/ServicesMenu";
import { siteConfig } from "@/config/site";

// Two logos, one <picture>: the full stacked logo (with tagline) from 640px up, the compact
// horizontal logo on phones where the tagline would be too small to read. Only one is downloaded.
const alt = `${siteConfig.name}, ${siteConfig.tagline}`;
const fullLogo = getImageProps({
  src: "/vyson-logo-full.png",
  alt,
  width: 129,
  height: 72,
  priority: true,
  sizes: "129px",
}).props;
const compactLogo = getImageProps({
  src: "/vyson-logo-header.png",
  alt,
  width: 140,
  height: 34,
  priority: true,
  sizes: "140px",
}).props;

export default function Header() {
  const logo = (
    <Link href="/" className="flex shrink-0 items-center gap-2.5">
      <picture>
        <source media="(min-width: 640px)" srcSet={fullLogo.srcSet} />
        <img {...compactLogo} alt={alt} className="h-[34px] w-auto sm:h-[72px]" />
      </picture>
    </Link>
  );

  const desktopNav = (
    <nav aria-label="Main" className="relative ml-auto hidden items-center gap-3 md:flex lg:gap-8">
      {siteConfig.headerNav.map((item) => (
        <Fragment key={item.href}>
          <NavLink
            href={item.href}
            className="text-sm font-medium underline-offset-4 transition-colors hover:text-brand-violet hover:underline hover:decoration-1"
            activeClassName="text-brand-violet"
            idleClassName="text-charcoal"
          >
            {item.label}
          </NavLink>
          {item.href === "/" && <ServicesDropdown />}
        </Fragment>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <MobileNav logo={logo} desktopNav={desktopNav} />
    </header>
  );
}
