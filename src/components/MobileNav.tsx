"use client";

import { Fragment, useState, type ReactNode } from "react";
import NavLink from "@/components/NavLink";
import { ServicesAccordion } from "@/components/ServicesMenu";
import { siteConfig } from "@/config/site";

/**
 * Hamburger, mobile sheet, and the header row shell. Logo and desktop nav stay server
 * children so this island is only the interactive menu.
 */
export default function MobileNav({
  logo,
  desktopNav,
}: {
  logo: ReactNode;
  desktopNav: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <div className="site-container flex h-16 items-center justify-between gap-4 sm:h-[88px]">
        <div onClick={close} className="flex shrink-0 items-center">
          {logo}
        </div>

        {desktopNav}

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
            {siteConfig.headerNav.map((item) => (
              <Fragment key={item.href}>
                <NavLink
                  href={item.href}
                  onClick={close}
                  className="rounded-xl px-3 py-3 text-base font-medium transition-colors hover:bg-violet-tint hover:text-brand-violet"
                  activeClassName="bg-violet-tint text-brand-violet"
                  idleClassName="text-charcoal"
                >
                  {item.label}
                </NavLink>
                {item.href === "/" && <ServicesAccordion onNavigate={close} />}
              </Fragment>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
