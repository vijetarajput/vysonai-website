"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { ServicesAccordion, ServicesDropdown } from "@/components/ServicesMenu";
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
}).props;
const compactLogo = getImageProps({
  src: "/vyson-logo-header.png",
  alt,
  width: 140,
  height: 34,
  priority: true,
}).props;

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <div className="site-container flex h-16 items-center justify-between gap-4 sm:h-[88px]">
        <Link
          href="/"
          onClick={close}
          className="flex shrink-0 items-center gap-2.5"
        >
          <picture>
            <source media="(min-width: 640px)" srcSet={fullLogo.srcSet} />
            <img {...compactLogo} alt={alt} className="h-[34px] w-auto sm:h-[72px]" />
          </picture>
        </Link>

        <nav aria-label="Main" className="relative ml-auto hidden items-center gap-3 md:flex lg:gap-8">
          {siteConfig.headerNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Fragment key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-medium underline-offset-4 transition-colors hover:text-brand-violet hover:underline hover:decoration-1 ${
                    active ? "text-brand-violet" : "text-charcoal"
                  }`}
                >
                  {item.label}
                </Link>
                {item.href === "/" && <ServicesDropdown />}
              </Fragment>
            );
          })}
        </nav>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-charcoal transition-colors hover:bg-violet-tint md:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-white px-4 pb-6 pt-4 shadow-soft md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {siteConfig.headerNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Fragment key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-xl px-3 py-3 text-base font-medium transition-colors hover:bg-violet-tint hover:text-brand-violet ${
                      active
                        ? "bg-violet-tint text-brand-violet"
                        : "text-charcoal"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.href === "/" && <ServicesAccordion onNavigate={close} />}
                </Fragment>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
