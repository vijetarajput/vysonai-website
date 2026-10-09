import {
  HeaderPill,
  MonitorFrame,
  StatusPill,
  at,
  freshRow,
} from "@/components/storyboard/shared";
import type { ReactNode } from "react";

function SourcePill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex whitespace-nowrap rounded-full bg-violet-tint px-2 py-0.5 text-[10px] font-semibold text-brand-violet">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1: customers arrive from everywhere                            */
/* ------------------------------------------------------------------ */

const sources = [
  { y: 28, label: "Call", icon: "M6 4h4l2 5-2.5 1.5a10 10 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2z" },
  { y: 74, label: "Chat", icon: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" },
  { y: 120, label: "Website", icon: "M4 6h16v12H4zM4 10h16M9 6v12" },
  { y: 166, label: "Walk-in", icon: "M4 20V9l8-5 8 5v11H4zM10 20v-6h4v6" },
];

export function SourcesIllustration() {
  return (
    <svg
      viewBox="0 0 280 200"
      role="img"
      aria-label="Illustration of calls, chats, website visits and walk-ins flowing into one customer list"
      className="h-auto w-full max-w-[360px]"
    >
      {sources.map((s) => (
        <g key={s.label}>
          <rect x="8" y={s.y - 18} width="86" height="36" rx="12" fill="#fff" stroke="#E5E7EB" />
          <g transform={`translate(16 ${s.y - 9})`} fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={s.icon} transform="scale(0.75)" />
          </g>
          <text x="42" y={s.y + 4} fontSize="11" fontWeight="600" fill="#1F2937">
            {s.label}
          </text>
          <path
            className="sb-flow"
            d={`M96 ${s.y} C130 ${s.y}, 150 100, 176 100`}
            fill="none"
            stroke="#7C3AED"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ))}
      <rect x="176" y="58" width="96" height="84" rx="16" fill="#7C3AED" />
      <text x="224" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
        Customer
      </text>
      <text x="224" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
        list
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2: one customer, saved                                         */
/* ------------------------------------------------------------------ */

export function ProfileCard() {
  return (
    <div className="w-full max-w-[320px] rounded-2xl border border-border bg-white p-4 text-left shadow-soft">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-violet text-sm font-bold text-white"
        >
          AK
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-[15px] font-bold text-charcoal">Amit Kumar</p>
          <p className="text-[12px] tabular-nums text-muted-strong">+91 98XXX 56XXX</p>
          <p className="mt-1.5 flex flex-wrap gap-1.5">
            <SourcePill>WhatsApp</SourcePill>
            <span className="rounded-full bg-brand-violet/10 px-2 py-0.5 text-[10px] font-semibold text-brand-violet">
              New
            </span>
          </p>
        </div>
      </div>
      <ul className="relative mt-4 space-y-2.5 border-l-2 border-brand-violet/25 pl-4">
        {[
          "2 Oct · Called about prices",
          "5 Oct · Asked for a quote on WhatsApp",
          "7 Oct · Visited the shop",
        ].map((line, i) => (
          <li key={line} className="ss-in relative text-[12px] leading-snug text-charcoal" style={at(400 + i * 350)}>
            <span
              aria-hidden="true"
              className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-violet"
            />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3: follow-ups dashboard                                        */
/* ------------------------------------------------------------------ */

type Status = "Due today" | "Overdue" | "Done";

const followUps: {
  name: string;
  number: string;
  reason: string;
  last: string;
  status: Status;
  fresh?: boolean;
}[] = [
  { name: "Amit Kumar", number: "+91 98XXX 56XXX", reason: "Send quote", last: "3 days ago", status: "Due today", fresh: true },
  { name: "Sophie Turner", number: "+44 7700 900321", reason: "Renewal", last: "25 days ago", status: "Due today" },
  { name: "Neha Joshi", number: "+91 99XXX 78XXX", reason: "Haven't visited in 30 days", last: "30 days ago", status: "Overdue" },
  { name: "Rakesh Patel", number: "+91 97XXX 12XXX", reason: "Payment reminder", last: "1 week ago", status: "Due today" },
  { name: "Michael Lee", number: "+1 (555) 010-0198", reason: "Thank-you call", last: "Yesterday", status: "Done" },
];

const followGrid =
  "@lg:grid @lg:grid-cols-[minmax(0,1.05fr)_minmax(90px,1.05fr)_minmax(0,1.1fr)_minmax(70px,0.8fr)_78px] @lg:gap-2";

function toneFor(status: Status) {
  if (status === "Due today") return "violet" as const;
  if (status === "Overdue") return "red" as const;
  return "grey" as const;
}

export function FollowUpsDashboard() {
  return (
    <MonitorFrame
      label="Example dashboard: today's follow-ups"
      menu={["Dashboard", "Customers", "Follow-ups", "Reports", "Settings"]}
      active="Follow-ups"
      heading="Today's follow-ups"
      pill={<HeaderPill>5 due today</HeaderPill>}
    >
      <div
        className={`hidden border-b border-border px-1.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted ${followGrid}`}
      >
        <span>Name</span>
        <span>Number</span>
        <span>Reason</span>
        <span>Last contact</span>
        <span>Status</span>
      </div>
      <ul>
        {followUps.map((row) => (
          <li
            key={row.name}
            style={row.fresh ? at(2000) : undefined}
            className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-border px-0.5 py-1.5 text-[10px] last:border-b-0 @lg:py-2 @lg:text-[11px] ${followGrid} ${
              row.fresh ? freshRow : ""
            }`}
          >
            <span className="order-1 min-w-0 flex-1 truncate font-semibold text-charcoal @lg:flex-none">
              {row.name}
            </span>
            <span className="order-3 w-full whitespace-nowrap tabular-nums text-muted-strong @lg:order-2 @lg:w-auto @lg:min-w-0 @lg:truncate">
              {row.number}
            </span>
            <span className="order-4 min-w-0 truncate text-muted-strong @lg:order-3">
              {row.reason}
              <span className="text-muted @lg:hidden"> · {row.last}</span>
            </span>
            <span className="order-5 hidden truncate text-muted-strong @lg:order-4 @lg:block">{row.last}</span>
            <span className="order-2 @lg:order-5">
              <StatusPill tone={toneFor(row.status)} dot={row.fresh}>
                {row.status}
              </StatusPill>
            </span>
          </li>
        ))}
      </ul>
    </MonitorFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Step 4: Monday report email                                         */
/* ------------------------------------------------------------------ */

const bars = [40, 62, 48, 78, 55, 70, 36];

export function WeeklyReport() {
  return (
    <figure
      aria-label="Example email: a Monday report of new customers and follow-ups"
      className="w-full max-w-[320px] overflow-hidden rounded-2xl border border-border bg-white text-left shadow-[0_18px_40px_-18px_rgb(31_41_55/0.35)]"
    >
      <div className="border-b border-border bg-violet-tint px-3.5 py-2.5">
        <p className="text-[10px] font-semibold text-brand-violet">VYSON-AI Reports</p>
        <p className="font-heading text-[13px] font-bold leading-tight text-charcoal">Your week at a glance</p>
        <p className="text-[10px] text-muted">Monday, 9:00 AM</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-3">
        {[
          ["18", "new customers"],
          ["42", "follow-ups done"],
          ["6", "still waiting"],
        ].map(([n, label]) => (
          <div key={label} className="rounded-xl bg-violet-tint px-1.5 py-2 text-center">
            <p className="font-heading text-lg font-bold leading-none text-brand-violet">{n}</p>
            <p className="mt-1 text-[9px] leading-tight font-medium text-muted-strong">{label}</p>
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="flex h-16 items-end justify-between gap-1 px-4 pb-3">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-full rounded-t-sm bg-brand-violet/80"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </figure>
  );
}
