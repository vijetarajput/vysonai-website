import {
  ChatPhone,
  HeaderPill,
  MonitorFrame,
  StatusPill,
  at,
  freshRow,
} from "@/components/storyboard/shared";
import { CountUp } from "@/components/storyboard/client";
import { SparkleIcon } from "@/components/showcase/parts";

/** Gradient offer card used in the hero, the ad design step and the mini feed. */
export function OfferCard({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const pad = size === "sm" ? "p-2.5" : size === "lg" ? "px-3.5 py-4" : "px-3.5 py-3.5";
  const text = size === "sm" ? "text-[11px]" : size === "lg" ? "text-[16px]" : "text-[14px]";
  return (
    <div
      className={`relative overflow-hidden rounded-2xl text-white ${pad}`}
      style={{ background: "linear-gradient(135deg, #7C3AED 0%, #C026D3 100%)" }}
    >
      <span className="absolute right-2 top-2 text-white/80">
        <SparkleIcon size={size === "sm" ? 10 : 16} />
      </span>
      <p className={`font-heading font-bold leading-snug ${text}`}>20% off your first hair spa</p>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20s-7-4.4-9.2-8.2C.8 8.6 2.4 5 6.2 5c2 0 3.4 1.2 4.3 2.4C11.4 6.2 12.8 5 14.8 5c3.8 0 5.4 3.6 3.4 6.8C19 15.6 12 20 12 20z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
    </svg>
  );
}

/** A generic sponsored post: account, offer visual, like/comment row, send button. No platform logos. */
export function SponsoredPost({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`rounded-2xl bg-white shadow-soft ${compact ? "p-1.5" : "p-2.5"}`}>
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center rounded-full bg-brand-gradient-diagonal font-bold text-white ${
            compact ? "h-6 w-6 text-[9px]" : "h-8 w-8 text-[11px]"
          }`}
        >
          G
        </span>
        <span className="min-w-0">
          <span className={`block truncate font-bold text-charcoal ${compact ? "text-[9px]" : "text-[12px]"}`}>
            Glow Studio Salon
          </span>
          <span className={`block text-muted ${compact ? "text-[8px]" : "text-[10px]"}`}>Sponsored</span>
        </span>
      </div>
      <div className={compact ? "mt-1.5" : "mt-2"}>
        <OfferCard size={compact ? "sm" : "lg"} />
      </div>
      {!compact && (
        <p className="mt-2 flex items-center gap-3 text-[11px] font-medium text-muted-strong">
          <span className="inline-flex items-center gap-1">
            <HeartIcon /> 24
          </span>
          <span className="inline-flex items-center gap-1">
            <CommentIcon /> 3
          </span>
        </p>
      )}
      <span
        className={`mt-2 flex w-full items-center justify-center rounded-full bg-brand-violet font-semibold text-white ${
          compact ? "py-1 text-[8px]" : "py-1.5 text-[12px]"
        }`}
      >
        Send message
      </span>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1: plan and design the ad                                      */
/* ------------------------------------------------------------------ */

const chips = [
  { label: "📍 5 km around your shop", className: "left-0 top-1" },
  { label: "👥 Age 22-45", className: "right-0 top-[3.25rem]" },
  { label: "💜 Interested in beauty", className: "bottom-1 left-1/2 -translate-x-1/2" },
];

export function AdDesignCanvas() {
  return (
    <div className="relative mx-auto h-[230px] w-full max-w-[340px]">
      {chips.map((chip, i) => (
        <span
          key={chip.label}
          className={`ss-in absolute z-10 whitespace-nowrap rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-charcoal shadow-soft ${chip.className}`}
          style={at(400 + i * 280)}
        >
          {chip.label}
        </span>
      ))}
      <div className="absolute left-1/2 top-[52%] w-[210px] -translate-x-1/2 -translate-y-1/2">
        <OfferCard />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2: ad reaches people nearby                                    */
/* ------------------------------------------------------------------ */

const avatars: { x: number; y: number; letter: string; fill: string }[] = [
  { x: 72, y: 78, letter: "P", fill: "#7C3AED" },
  { x: 128, y: 68, letter: "A", fill: "#2563EB" },
  { x: 142, y: 112, letter: "G", fill: "#C026D3" },
  { x: 78, y: 128, letter: "K", fill: "#7C3AED" },
  { x: 108, y: 86, letter: "R", fill: "#2563EB" },
];

export function NearbyMap() {
  return (
    <div className="flex w-full max-w-[420px] items-center justify-center gap-3">
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label="Map of people near a shop seeing the ad"
        className="h-auto w-[58%] max-w-[220px] overflow-visible rounded-2xl bg-[#F3F4F6]"
      >
        <rect width="200" height="200" rx="16" fill="#F3F4F6" />
        <g stroke="#E5E7EB" strokeWidth="3" fill="none">
          <path d="M0 48h200M0 96h200M0 144h200" />
          <path d="M40 0v200M88 0v200M140 0v200" />
          <path d="M0 170l70-200M130 200l70-160" />
        </g>
        <circle cx="100" cy="100" r="62" className="sb-pulse" fill="#7C3AED" />
        <circle cx="100" cy="100" r="58" fill="#7C3AED" opacity="0.12" />
        {avatars.map((a, i) => (
          <g key={a.letter} className="ss-in" style={at(500 + i * 280)}>
            <circle cx={a.x} cy={a.y} r="12" fill={a.fill} />
            <text x={a.x} y={a.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">
              {a.letter}
            </text>
          </g>
        ))}
        <g transform="translate(88 74)">
          <path d="M12 2C7.6 2 4 5.6 4 10.2 4 16.4 12 26 12 26s8-9.6 8-15.8C20 5.6 16.4 2 12 2z" fill="#7C3AED" />
          <circle cx="12" cy="10" r="3.2" fill="#fff" />
        </g>
      </svg>
      <figure
        aria-label="Mini phone showing the sponsored ad in a feed"
        className="w-[118px] shrink-0 overflow-hidden rounded-[1.15rem] border-[5px] border-[#d1d5db] bg-[#f8f7fc] shadow-soft"
      >
        <div aria-hidden="true" className="mx-auto mt-1.5 h-1.5 w-8 rounded-full bg-[#d1d5db]" />
        <div className="p-1.5 pb-2">
          <SponsoredPost compact />
        </div>
      </figure>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3: leads dashboard                                             */
/* ------------------------------------------------------------------ */

type LeadStatus = "Replied" | "Booked";

const leads: {
  name: string;
  number: string;
  ad: string;
  time: string;
  status: LeadStatus;
  fresh?: boolean;
}[] = [
  { name: "Pooja Verma", number: "+91 98XXX 44XXX", ad: "Hair spa offer", time: "2 min ago", status: "Replied", fresh: true },
  { name: "Ananya Rao", number: "+91 99XXX 21XXX", ad: "Hair spa offer", time: "1 hr ago", status: "Booked" },
  { name: "Grace Wilson", number: "+44 7700 900654", ad: "Bridal package", time: "3 hrs ago", status: "Replied" },
  { name: "Karan Mehta", number: "+91 97XXX 63XXX", ad: "Hair spa offer", time: "Yesterday", status: "Booked" },
  { name: "Ritu Singh", number: "+91 90XXX 85XXX", ad: "Bridal package", time: "Yesterday", status: "Replied" },
];

const leadGrid =
  "@lg:grid @lg:grid-cols-[minmax(0,1.15fr)_minmax(90px,1.05fr)_minmax(0,1fr)_minmax(64px,0.75fr)_64px] @lg:gap-2";

export function AdsLeadsDashboard() {
  return (
    <MonitorFrame
      label="Example dashboard: leads from ads"
      menu={["Dashboard", "Campaigns", "Leads", "Reports", "Settings"]}
      active="Leads"
      heading="Leads from ads"
      pill={<HeaderPill>36 this week</HeaderPill>}
    >
      <div className="mb-2 grid grid-cols-3 gap-1.5">
        {[
          { label: "People reached", to: 8240 },
          { label: "Enquiries", to: 36 },
          { label: "Cost per enquiry", to: 42, prefix: "₹" },
        ].map((tile) => (
          <div key={tile.label} className="rounded-xl bg-violet-tint px-1.5 py-2 text-center">
            <p className="font-heading text-[13px] font-bold leading-none text-brand-violet @lg:text-[15px]">
              <CountUp to={tile.to} prefix={tile.prefix} />
            </p>
            <p className="mt-1 text-[9px] font-medium leading-tight text-muted-strong">{tile.label}</p>
          </div>
        ))}
      </div>
      <div
        className={`hidden border-b border-border px-1.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted ${leadGrid}`}
      >
        <span>Name</span>
        <span>Number</span>
        <span>Ad</span>
        <span>Time</span>
        <span>Status</span>
      </div>
      <ul>
        {leads.map((row) => (
          <li
            key={row.name}
            style={row.fresh ? at(2000) : undefined}
            className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-border px-0.5 py-1.5 text-[10px] last:border-b-0 @lg:py-2 @lg:text-[11px] ${leadGrid} ${
              row.fresh ? freshRow : ""
            }`}
          >
            <span className="order-1 min-w-0 flex-1 truncate font-semibold text-charcoal @lg:flex-none">
              {row.name}
            </span>
            <span className="order-2 @lg:order-5">
              <StatusPill tone={row.status === "Booked" ? "solid" : "violet"} dot={row.fresh}>
                {row.status}
              </StatusPill>
            </span>
            <span className="order-3 flex w-full min-w-0 flex-col gap-0.5 @lg:contents">
              <span className="whitespace-nowrap tabular-nums text-muted-strong @lg:order-2 @lg:truncate">
                {row.number}
              </span>
              <span className="min-w-0 truncate text-muted-strong @lg:order-3">{row.ad}</span>
              <span className="truncate text-muted @lg:order-4 @lg:text-muted-strong">{row.time}</span>
            </span>
          </li>
        ))}
      </ul>
    </MonitorFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Step 4: assistant replies in seconds                                */
/* ------------------------------------------------------------------ */

export function AdsReplyPhone() {
  return (
    <div className="relative">
      <ChatPhone
        label="Example phone: a WhatsApp-style reply to an ad enquiry"
        name="Glow Studio Salon"
        initial="G"
        messages={[
          { text: "Hi, I saw your hair spa offer!", time: "11:02 AM" },
          {
            text: "Hi Pooja! 👋 Thanks for your interest. Want to book a slot this week?",
            time: "11:02 AM",
            from: "us",
          },
        ]}
      />
      <span
        className="ss-in absolute -right-1 bottom-16 z-10 inline-flex items-center gap-1 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-charcoal shadow-soft"
        style={at(2300)}
      >
        <span aria-hidden="true">⚡</span> Replied in 3 seconds
      </span>
    </div>
  );
}
