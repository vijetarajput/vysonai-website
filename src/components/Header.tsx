"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { ServicesAccordion, ServicesDropdown } from "@/components/ServicesMenu";
import DemoButton from "@/components/lead/DemoButton";
import { siteConfig } from "@/config/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          onClick={close}
          className="flex shrink-0 items-center gap-2.5"
        >
          <Image
            src="/vyson-logo-header.png"
            alt={siteConfig.name}
            width={901}
            height={220}
            priority
            className="h-9 w-auto lg:h-11"
          />
          <span className="hidden whitespace-nowrap text-xs text-muted min-[420px]:inline">
            by {siteConfig.founder}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-3 md:flex lg:gap-8">
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

        <div className="flex items-center gap-2">
          <DemoButton className="hidden rounded-full bg-brand-violet px-4 py-2.5 text-sm font-medium whitespace-nowrap text-white shadow-soft transition-colors hover:bg-brand-violet-dark md:inline-block lg:px-5">
            {siteConfig.cta.label}
          </DemoButton>

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
          <DemoButton
            onOpen={close}
            className="mt-4 block w-full rounded-full bg-brand-violet px-5 py-3 text-center text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark"
          >
            {siteConfig.cta.label}
          </DemoButton>
        </div>
      )}
    </header>
  );
}
