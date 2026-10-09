import {
  ChatPhone,
  HeaderPill,
  MoonChip,
  MonitorFrame,
  StatusPill,
  at,
  freshRow,
} from "@/components/storyboard/shared";
import { SparkleIcon } from "@/components/showcase/parts";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Compact chat widget (hero + step 2)                                 */
/* ------------------------------------------------------------------ */

export function ChatWidget({
  messages,
  extra,
  time = "11:48 PM",
}: {
  messages: { who: "visitor" | "assistant"; text: string }[];
  extra?: ReactNode;
  time?: string;
}) {
  return (
    <div className="flex w-full max-w-[280px] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_18px_40px_-18px_rgb(31_41_55/0.35)]">
      <div className="flex items-center gap-2 bg-brand-violet px-3 py-2 text-white">
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-green-300" />
        <span className="min-w-0 flex-1 truncate text-[11px] font-semibold">Bright Smile · AI Assistant</span>
        <span className="shrink-0 text-[10px] text-white/80">{time}</span>
      </div>
      <div className="space-y-1.5 bg-violet-tint/60 p-2.5">
        {messages.map((line, i) =>
          line.who === "visitor" ? (
            <div key={i} className="ss-in max-w-[92%]" style={at(500 + i * 700)}>
              <p className="rounded-2xl rounded-tl-md border border-border bg-white px-2.5 py-1.5 text-[11px] leading-snug text-charcoal">
                {line.text}
              </p>
            </div>
          ) : (
            <div key={i} className="ss-in ml-auto max-w-[94%]" style={at(500 + i * 700)}>
              <p className="rounded-2xl rounded-tr-md bg-brand-violet px-2.5 py-1.5 text-[11px] leading-snug text-white">
                <span className="mr-1 inline-block align-[-1px]">
                  <SparkleIcon size={10} />
                </span>
                {line.text}
              </p>
            </div>
          ),
        )}
        {extra}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1: a person at a laptop                                        */
/* ------------------------------------------------------------------ */

export function LaptopIllustration() {
  return (
    <>
      <svg
        viewBox="0 0 240 210"
        role="img"
        aria-label="Illustration of a friendly person sitting with a laptop, a chat bubble on the website"
        className="h-auto w-full max-w-[290px]"
      >
        <circle cx="120" cy="108" r="94" fill="#fff" opacity="0.75" />
        {/* chair / body */}
        <path d="M52 210c8-56 36-82 68-84 32 2 60 28 68 84Z" fill="#7C3AED" />
        <path d="M108 118l12 14 12-14Z" fill="#F5F3FF" />
        {/* neck and head */}
        <rect x="112" y="86" width="16" height="22" rx="6" fill="#E3AE86" />
        <circle cx="120" cy="68" r="28" fill="#F1C7A0" />
        <path
          d="M94 66c4-24 22-28 28-26 18 2 26 14 24 28-8-12-22-16-36-14-8 1-14 6-16 12Z"
          fill="#1F2937"
        />
        <circle cx="110" cy="70" r="3" fill="#1F2937" />
        <circle cx="130" cy="70" r="3" fill="#1F2937" />
        <circle cx="104" cy="80" r="4.5" fill="#C026D3" opacity="0.15" />
        <circle cx="136" cy="80" r="4.5" fill="#C026D3" opacity="0.15" />
        <path d="M112 82q8 7 16 0" fill="none" stroke="#1F2937" strokeWidth="2.4" strokeLinecap="round" />
        {/* arms to laptop */}
        <path d="M78 196c-4-22 14-36 38-28" fill="none" stroke="#6D28D9" strokeWidth="16" strokeLinecap="round" />
        <path d="M162 196c4-22-14-36-38-28" fill="none" stroke="#6D28D9" strokeWidth="16" strokeLinecap="round" />
        {/* laptop */}
        <path d="M70 148h100l8 22H62Z" fill="#1F2937" />
        <rect x="82" y="118" width="76" height="48" rx="3" fill="#1F2937" />
        <rect x="85" y="121" width="70" height="42" rx="2" fill="#F5F3FF" />
        <rect x="90" y="126" width="28" height="6" rx="2" fill="#7C3AED" />
        <rect x="90" y="136" width="40" height="3" rx="1.5" fill="#E5E7EB" />
        <rect x="90" y="142" width="32" height="3" rx="1.5" fill="#E5E7EB" />
        <rect x="90" y="150" width="18" height="6" rx="3" fill="#2563EB" />
        {/* chat bubble on the site */}
        <g className="sb-pop" style={at(600)}>
          <circle cx="146" cy="150" r="8" fill="#7C3AED" />
          <path d="M143 148h6M143 152h4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
        </g>
        {/* hands */}
        <circle cx="102" cy="148" r="7" fill="#F1C7A0" />
        <circle cx="138" cy="148" r="7" fill="#F1C7A0" />
      </svg>
      <MoonChip>Rohit · 11:46 PM</MoonChip>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2: the assistant answers                                       */
/* ------------------------------------------------------------------ */

const clinicChat: { who: "visitor" | "assistant"; text: string }[] = [
  { who: "visitor", text: "How much is teeth cleaning?" },
  { who: "assistant", text: "Teeth cleaning is ₹1,200 and takes about 30 minutes. 😊" },
  { who: "visitor", text: "Can someone call me?" },
  { who: "assistant", text: "Of course! Share your name and number and we'll call you tomorrow morning." },
];

export function WebsiteChat() {
  return (
    <div className="flex w-full max-w-[400px] flex-col items-center">
      <ul className="mb-3 flex flex-wrap justify-center gap-1.5">
        {["Learns your prices", "timings", "services"].map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-charcoal shadow-soft"
          >
            {chip}
          </li>
        ))}
      </ul>
      <ChatWidget messages={clinicChat} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3: leads dashboard                                             */
/* ------------------------------------------------------------------ */

type Status = "New" | "Called";

const leads: {
  name: string;
  number: string;
  interest: string;
  page: string;
  status: Status;
  fresh?: boolean;
}[] = [
  { name: "Rohit Sharma", number: "+91 98765 43210", interest: "Callback", page: "Home", status: "New", fresh: true },
  { name: "Olivia Brown", number: "+44 7700 900789", interest: "Teeth whitening", page: "Prices", status: "New" },
  { name: "Kavya Iyer", number: "+91 99XXX 12XXX", interest: "Braces", page: "Services", status: "New" },
  { name: "Mohit Jain", number: "+91 97XXX 34XXX", interest: "Check-up", page: "Contact", status: "Called" },
  { name: "Daniel Smith", number: "+1 (555) 010-0177", interest: "Weekend slot", page: "Home", status: "New" },
];

const leadGrid =
  "@lg:grid @lg:grid-cols-[minmax(0,1.05fr)_minmax(92px,1.1fr)_minmax(0,1fr)_minmax(52px,0.7fr)_58px] @lg:gap-2";

export function LeadsDashboard() {
  return (
    <MonitorFrame
      label="Example dashboard: today's website leads"
      menu={["Dashboard", "Leads", "Chats", "Customers", "Settings"]}
      active="Leads"
      heading="Today's leads"
      pill={<HeaderPill>4 new leads</HeaderPill>}
    >
      <div
        className={`hidden border-b border-border px-1.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted ${leadGrid}`}
      >
        <span>Name</span>
        <span>Number</span>
        <span>Interested in</span>
        <span>From page</span>
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
            <span className="order-3 w-full whitespace-nowrap tabular-nums text-muted-strong @lg:order-2 @lg:w-auto @lg:min-w-0 @lg:truncate">
              {row.number}
            </span>
            <span className="order-4 min-w-0 truncate text-muted-strong @lg:order-3">
              {row.interest}
              <span className="text-muted @lg:hidden"> · {row.page}</span>
            </span>
            <span className="order-5 hidden truncate text-muted-strong @lg:order-4 @lg:block">{row.page}</span>
            <span className="order-2 @lg:order-5">
              <StatusPill tone={row.status === "New" ? "violet" : "grey"} dot={row.fresh}>
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
/* Step 4: follow-up message                                           */
/* ------------------------------------------------------------------ */

export function FollowUpPhone() {
  return (
    <ChatPhone
      label="Example phone: a follow-up message from the business"
      name="Bright Smile Dental"
      initial="B"
      messages={[
        {
          text: "Hi Rohit 👋 Thanks for visiting Bright Smile Dental! Our team will call you tomorrow at 11 AM.",
          time: "11:50 PM",
        },
      ]}
    />
  );
}
