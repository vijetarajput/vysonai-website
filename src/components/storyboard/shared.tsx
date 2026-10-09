import type { ReactNode } from "react";
import { TodayDate } from "@/components/storyboard/client";
import { DoubleTick, cssVars } from "@/components/showcase/parts";

/** Delay (ms) after the card appears, as a CSS variable for .ss-in / .sb-slide / .sb-wave / .sb-pop. */
export const at = (ms: number) => cssVars({ "--d": `${ms}ms` });

/** Soft violet panel that holds each picture. */
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col items-center justify-center rounded-2xl bg-violet-tint p-2 sm:p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />
    </svg>
  );
}

/** Small white chip with a moon icon, for example "Sarah · 11:02 PM". */
export function MoonChip({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-[13px] font-semibold text-charcoal shadow-soft">
      <span className="text-brand-violet">
        <MoonIcon />
      </span>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop monitor with a light dashboard app                          */
/* ------------------------------------------------------------------ */

const icons = {
  Dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  Appointments: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  Calls: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  Chats: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  Leads: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0M16 8v6M13 11h6" />
    </>
  ),
  Customers: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
    </>
  ),
  Reminders: <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16zM10 21h4" />,
  "Follow-ups": (
    <>
      <path d="M9 11l3 3 5-6" />
      <rect x="3" y="3" width="18" height="18" rx="3" />
    </>
  ),
  Reports: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-8M20 20H4" />
    </>
  ),
  Products: (
    <>
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 7v10l9 4 9-4V7" />
    </>
  ),
  Stock: (
    <>
      <path d="M4 8l8-4 8 4-8 4-8-4z" />
      <path d="M4 12l8 4 8-4M4 16l8 4 8-4" />
    </>
  ),
  Orders: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  Campaigns: (
    <>
      <path d="M4 10v4M4 10l13-5v14L4 14" />
      <path d="M17 8.5a3.5 3.5 0 0 1 0 7" />
    </>
  ),
  Settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
    </>
  ),
} as const;

export type MenuName = keyof typeof icons;

function MenuIcon({ name }: { name: MenuName }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {icons[name]}
    </svg>
  );
}

/**
 * Monitor (thin dark bezel, small stand) with a light app: icon sidebar, today's date, a heading
 * and a small pill on the right. The table or list goes in `children`. It adapts to the width of
 * its own box (container queries), so it scales down cleanly on phones.
 */
export function MonitorFrame({
  label,
  menu,
  active,
  heading,
  pill,
  children,
}: {
  label: string;
  menu: MenuName[];
  active: MenuName;
  heading: string;
  pill: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure aria-label={label} className="@container mx-auto w-full max-w-[720px]">
      <div className="rounded-xl bg-charcoal p-1.5 shadow-[0_24px_50px_-22px_rgb(31_41_55/0.5)]">
        <div className="flex overflow-hidden rounded-md bg-white">
          {/* Sidebar */}
          <aside
            aria-label="Menu"
            className="flex w-[32px] shrink-0 flex-col gap-1 border-r border-border p-[3px] @xl:w-[124px] @xl:p-2"
          >
            <span
              aria-hidden="true"
              className="mb-1 flex h-6 w-6 items-center justify-center rounded-md bg-brand-gradient-diagonal text-white @xl:mx-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 6 7 13L19 6" />
              </svg>
            </span>
            {menu.map((name) => (
              <span
                key={name}
                className={`flex items-center justify-center gap-2 rounded-md p-1.5 text-[11px] @xl:justify-start ${
                  name === active ? "bg-violet-tint font-semibold text-brand-violet" : "text-muted-strong"
                }`}
              >
                <MenuIcon name={name} />
                <span className="sr-only @xl:not-sr-only">{name}</span>
              </span>
            ))}
          </aside>

          {/* Main area */}
          <div className="min-w-0 flex-1 p-1.5 @lg:p-3.5">
            <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
              <div>
                <p className="text-[10px] text-muted">
                  <TodayDate />
                </p>
                <p className="font-heading text-[13px] font-bold leading-tight text-charcoal @lg:text-[15px]">
                  {heading}
                </p>
              </div>
              {pill}
            </div>
            <div className="mt-2.5">{children}</div>
          </div>
        </div>
      </div>
      {/* Stand */}
      <div aria-hidden="true" className="mx-auto h-3 w-10 bg-[#d1d5db]" />
      <div aria-hidden="true" className="mx-auto h-1.5 w-24 rounded-full bg-[#d1d5db]" />
    </figure>
  );
}

/** Small violet pill used in the top right of the dashboard header. */
export function HeaderPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-violet-tint px-2.5 py-1 text-[10px] font-semibold text-brand-violet">
      {children}
    </span>
  );
}

const pillTone = {
  violet: "bg-brand-violet/10 text-brand-violet",
  solid: "bg-brand-violet text-white",
  grey: "bg-gray-100 text-muted-strong",
  red: "bg-red-50 text-red-600",
  amber: "bg-amber-50 text-amber-700",
} as const;

/** Status pill used in dashboard rows. "violet" can show a pulsing dot. */
export function StatusPill({
  tone,
  dot = false,
  children,
}: {
  tone: keyof typeof pillTone;
  dot?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[10px] font-semibold @lg:justify-self-start ${pillTone[tone]}`}
    >
      {dot && (
        <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
          <span className="sb-ping absolute inline-flex h-full w-full rounded-full bg-brand-violet opacity-60" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-brand-violet" />
        </span>
      )}
      {children}
    </span>
  );
}

/** Soft highlight for the row that slides in last. */
export const freshRow = "sb-slide rounded-md bg-violet-tint ring-1 ring-brand-violet/25";

/* ------------------------------------------------------------------ */
/* Phone with a chat from a business                                   */
/* ------------------------------------------------------------------ */

export type PhoneMessage = { text: ReactNode; time: string; from?: "them" | "us" };

/** Phone mockup with a chat (brand colors, no app logo). Messages appear one by one. */
export function ChatPhone({
  label,
  name,
  initial,
  status = "Online",
  chip = "Today",
  messages,
  extra,
}: {
  label: string;
  name: string;
  initial: string;
  status?: string;
  chip?: string;
  messages: PhoneMessage[];
  extra?: ReactNode;
}) {
  return (
    <figure
      aria-label={label}
      className="relative flex h-[380px] w-full max-w-[256px] flex-col overflow-hidden rounded-[2.25rem] border-[7px] border-[#d1d5db] bg-white shadow-[0_24px_60px_-20px_rgb(31_41_55/0.35)]"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-2 z-10 h-3.5 w-16 -translate-x-1/2 rounded-full bg-[#d1d5db]"
      />
      <div className="flex items-center gap-2 bg-brand-violet px-3 pb-2.5 pt-8 text-white">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-brand-violet"
        >
          {initial}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[13px] font-bold">{name}</span>
          <span className="block text-[10px] text-white/80">{status}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 bg-violet-tint/70 px-3 py-3">
        <p className="mx-auto rounded-full bg-white px-2.5 py-0.5 text-[10px] font-medium text-muted-strong shadow-soft">
          {chip}
        </p>
        {messages.map((m, i) => {
          const us = m.from === "us";
          return (
            <div key={i} className={`ss-in max-w-[90%] ${us ? "ml-auto" : ""}`} style={at(700 + i * 800)}>
              <div
                className={`px-3 pb-1.5 pt-2 text-[12.5px] leading-snug shadow-soft ${
                  us
                    ? "rounded-2xl rounded-tr-md bg-brand-violet text-white"
                    : "rounded-2xl rounded-tl-md border border-border bg-white text-charcoal"
                }`}
              >
                {m.text}
                <span className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${us ? "text-white/75" : "text-muted"}`}>
                  {m.time}
                  <span className={us ? "text-white/90" : "text-brand-blue"}>
                    <DoubleTick />
                  </span>
                </span>
              </div>
            </div>
          );
        })}
        {extra}
      </div>
      <div aria-hidden="true" className="border-t border-border bg-white px-3 py-2">
        <div className="rounded-full bg-gray-100 px-3 py-1.5 text-[11px] text-muted">Type a message</div>
      </div>
    </figure>
  );
}