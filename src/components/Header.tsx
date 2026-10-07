"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
          className="flex min-w-0 items-center gap-2.5"
        >
          <Image
            src="/vyson-logo-header.png"
            alt={siteConfig.name}
            width={901}
            height={220}
            priority
            className="h-9 w-auto md:h-11"
          />
          <span className="hidden whitespace-nowrap text-xs text-muted min-[420px]:inline">
            by {siteConfig.founder}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium underline-offset-4 transition-colors hover:text-brand-violet hover:underline hover:decoration-1 ${
                  active ? "text-brand-violet" : "text-charcoal"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={siteConfig.cta.href}
            className="hidden rounded-full bg-brand-violet px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-violet-dark md:inline-block"
          >
            {siteConfig.cta.label}
          </Link>

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
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
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
              );
            })}
          </nav>
          <Link
            href={siteConfig.cta.href}
            onClick={close}
            className="mt-4 block rounded-full bg-brand-violet px-5 py-3 text-center text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-violet-dark"
          >
            {siteConfig.cta.label}
          </Link>
        </div>
      )}
    </header>
  );
}
