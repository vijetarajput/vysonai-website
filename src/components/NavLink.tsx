"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

/**
 * Prefetching internal link that marks the current page. Class names are strings so this
 * island can be composed from a server Header without passing functions across the boundary.
 */
export default function NavLink({
  href,
  className,
  activeClassName,
  idleClassName,
  onClick,
  children,
}: {
  href: string;
  className: string;
  activeClassName: string;
  idleClassName: string;
  onClick?: ComponentProps<typeof Link>["onClick"];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`${className} ${active ? activeClassName : idleClassName}`}
    >
      {children}
    </Link>
  );
}
