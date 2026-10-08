"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ServiceIcon from "@/components/ServiceIcon";
import DemoButton from "@/components/lead/DemoButton";
import { serviceMenu } from "@/content/services";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`transition-transform duration-200 motion-reduce:transition-none ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/**
 * Desktop "Services" dropdown (disclosure pattern).
 * Opens on hover (mouse only) or click / Enter / Space. Closes on Escape (focus returns
 * to the button), on a click outside, when Tab leaves it, or shortly after the mouse leaves.
 */
export function ServicesDropdown() {
  const pathname = usePathname();
  const active = pathname.startsWith("/services");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // True when opened by click or keyboard: it then stays open when the mouse leaves.
  const pinned = useRef(false);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const close = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    pinned.current = false;
    setOpen(false);
  }, []);

  // Click or tap outside closes it.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  useEffect(() => cancelClose, []);

  const items = () =>
    Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      close();
      buttonRef.current?.focus();
      return;
    }

    const list = items();
    if (list.length === 0) return;
    const fromButton = event.target === buttonRef.current;
    const index = list.indexOf(event.target as HTMLElement);

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      if (!open) {
        pinned.current = true;
        setOpen(true);
        requestAnimationFrame(() => items()[0]?.focus());
      } else if (fromButton) {
        list[0].focus();
      } else if (index >= 0) {
        list[Math.min(index + 1, list.length - 1)].focus();
      }
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      if (!open) return;
      event.preventDefault();
      if (index > 0) list[index - 1].focus();
      else buttonRef.current?.focus();
    } else if (event.key === "Home" && index >= 0) {
      event.preventDefault();
      list[0].focus();
    } else if (event.key === "End" && index >= 0) {
      event.preventDefault();
      list[list.length - 1].focus();
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse" || pinned.current) return;
        cancelClose();
        closeTimer.current = setTimeout(close, 180);
      }}
      onKeyDown={onKeyDown}
      onBlur={(event) => {
        // Tabbing out of the dropdown closes it.
        const next = event.relatedTarget as Node | null;
        if (next && !wrapRef.current?.contains(next)) close();
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => {
          cancelClose();
          if (open && pinned.current) {
            close();
          } else {
            pinned.current = true;
            setOpen(true);
          }
        }}
        className={`inline-flex items-center gap-1 text-sm font-medium underline-offset-4 transition-colors hover:text-brand-violet ${
          active || open ? "text-brand-violet" : "text-charcoal"
        }`}
      >
        Services
        <Chevron open={open} />
      </button>

      {/* The outer box has no display class so the hidden attribute works. */}
      <div id="services-menu" hidden={!open}>
        {/* pt-3 keeps the hover area continuous between the button and the panel */}
        <div className="dd-panel absolute left-1/2 top-full z-50 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 pt-3">
          <div
            ref={panelRef}
            className="rounded-2xl border border-border bg-white p-3 shadow-[0_18px_44px_-14px_rgba(17,24,39,0.22)]"
          >
            <ul className="grid grid-cols-2 gap-1">
              {serviceMenu.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex h-full items-start gap-3 rounded-xl p-3 transition-colors hover:bg-violet-tint focus-visible:bg-violet-tint"
                  >
                    <span className="mt-0.5 shrink-0 text-brand-violet">
                      <ServiceIcon name={item.icon} size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-charcoal">{item.title}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-muted-strong">
                        {item.text}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 border-t border-border px-3 pb-1 pt-3 text-[13px] text-muted-strong">
              Not sure what you need?{" "}
              <DemoButton
                onOpen={close}
                className="font-medium text-brand-violet underline-offset-4 hover:underline"
              >
                Book a free call →
              </DemoButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile menu: "Services" as an accordion with the same four items. */
export function ServicesAccordion({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const active = pathname.startsWith("/services");
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-services"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium transition-colors hover:bg-violet-tint hover:text-brand-violet ${
          active ? "bg-violet-tint text-brand-violet" : "text-charcoal"
        }`}
      >
        Services
        <Chevron open={open} />
      </button>
      <ul id="mobile-services" hidden={!open} className="mt-1 space-y-1 pl-3">
        {serviceMenu.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={pathname === item.href ? "page" : undefined}
              className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-violet-tint"
            >
              <span className="mt-0.5 shrink-0 text-brand-violet">
                <ServiceIcon name={item.icon} size={20} />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-bold text-charcoal">{item.title}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-muted-strong">
                  {item.text}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
