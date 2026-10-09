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

/* ------------------------------------------------------------------ */
/* Step 1: a person typing a message                                   */
/* ------------------------------------------------------------------ */

export function TypingIllustration() {
  return (
    <>
      <svg
        viewBox="0 0 240 210"
        role="img"
        aria-label="Illustration of a friendly person typing a message on a phone"
        className="h-auto w-full max-w-[290px]"
      >
        <circle cx="112" cy="110" r="94" fill="#fff" opacity="0.75" />
        {/* hair (back) */}
        <path
          d="M80 78C76 40 100 36 112 36c18 0 36 12 32 46l2 26c-6 4-12-2-14-10H92c-2 8-8 14-14 10Z"
          fill="#1F2937"
        />
        {/* neck and shoulders */}
        <rect x="104" y="98" width="16" height="22" rx="6" fill="#E3AE86" />
        <path d="M44 210c0-60 28-92 68-94 40 2 68 34 68 94Z" fill="#2563EB" />
        <path d="M98 118l14 14 14-14Z" fill="#F5F3FF" />
        {/* head */}
        <circle cx="112" cy="72" r="30" fill="#F1C7A0" />
        <path
          d="M82 70c2-22 22-26 32-24 18 2 28 12 28 26-10-10-26-14-42-12-8 2-14 6-18 10Z"
          fill="#1F2937"
        />
        {/* eyes looking down, smile */}
        <path d="M98 78q4 3 8 0M118 78q4 3 8 0" fill="none" stroke="#1F2937" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="94" cy="88" r="4.5" fill="#C026D3" opacity="0.15" />
        <circle cx="130" cy="88" r="4.5" fill="#C026D3" opacity="0.15" />
        <path d="M105 90q7 6 14 0" fill="none" stroke="#1F2937" strokeWidth="2.4" strokeLinecap="round" />
        {/* arms */}
        <path d="M58 196c-2-24 16-34 38-30" fill="none" stroke="#1D4ED8" strokeWidth="20" strokeLinecap="round" />
        <path d="M166 196c2-24-16-34-38-30" fill="none" stroke="#1D4ED8" strokeWidth="20" strokeLinecap="round" />
        {/* phone */}
        <rect x="92" y="130" width="40" height="64" rx="7" fill="#1F2937" />
        <rect x="95.5" y="134" width="33" height="56" rx="3.5" fill="#fff" />
        <rect x="99" y="140" width="18" height="8" rx="4" fill="#E5E7EB" />
        <rect x="107" y="152" width="18" height="8" rx="4" fill="#7C3AED" />
        <rect x="99" y="164" width="14" height="8" rx="4" fill="#E5E7EB" />
        {/* hands */}
        <circle cx="93" cy="172" r="8" fill="#F1C7A0" />
        <circle cx="131" cy="172" r="8" fill="#F1C7A0" />
        {/* chat bubble popping up above the phone */}
        <g className="sb-pop" style={at(500)}>
          <path d="M160 108 L140 130 L178 110Z" fill="#7C3AED" />
          <rect x="152" y="76" width="62" height="36" rx="16" fill="#7C3AED" />
          <circle cx="169" cy="94" r="3.6" fill="#fff" className="sb-wave" style={at(0)} />
          <circle cx="183" cy="94" r="3.6" fill="#fff" className="sb-wave" style={at(250)} />
          <circle cx="197" cy="94" r="3.6" fill="#fff" className="sb-wave" style={at(500)} />
        </g>
      </svg>
      <MoonChip>Neha · 10:47 PM</MoonChip>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2: the assistant replies                                       */
/* ------------------------------------------------------------------ */

const salonChat: { who: "customer" | "assistant"; text: string }[] = [
  { who: "customer", text: "Do you do hair spa?" },
  { who: "assistant", text: "Yes! Hair spa is ₹899 and takes 45 minutes. Want me to book a slot?" },
  { who: "customer", text: "Tomorrow 6 PM?" },
  { who: "assistant", text: "Booked! ✅ See you tomorrow at 6 PM." },
];

export function SalonChat() {
  return (
    <figure
      aria-label="Example chat: a customer talking to a WhatsApp assistant"
      className="w-full max-w-[400px] overflow-hidden rounded-2xl border border-border bg-white shadow-[0_18px_40px_-18px_rgb(31_41_55/0.35)]"
    >
      <div className="flex items-center gap-2 bg-brand-violet px-3.5 py-2.5 text-white">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-violet"
        >
          G
        </span>
        <span className="min-w-0 truncate text-[12px] font-semibold">Glow Studio Salon · online</span>
      </div>
      <div className="space-y-2.5 bg-violet-tint/60 p-3">
        {salonChat.map((line, i) =>
          line.who === "customer" ? (
            <div key={i} className="ss-in max-w-[84%]" style={at(700 + i * 850)}>
              <p className="rounded-2xl rounded-tl-md border border-border bg-white px-3 py-2 text-[12.5px] leading-snug text-charcoal">
                {line.text}
              </p>
            </div>
          ) : (
            <div key={i} className="ss-in ml-auto max-w-[88%]" style={at(700 + i * 850)}>
              <p className="rounded-2xl rounded-tr-md bg-brand-violet px-3 py-2 text-[12.5px] leading-snug text-white">
                <span className="mr-1.5 inline-block align-[-1px]">
                  <SparkleIcon size={12} />
                </span>
                {line.text}
              </p>
            </div>
          ),
        )}
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3: the chats dashboard                                         */
/* ------------------------------------------------------------------ */

type Tag = "Booked" | "Question" | "New lead";

const chats: { name: string; number: string; message: string; tag: Tag; fresh?: boolean }[] = [
  { name: "Neha Kapoor", number: "+91 98XXX 21XXX", message: "Booked! See you tomorrow at 6 PM.", tag: "Booked" },
  { name: "Ravi Singh", number: "+91 97XXX 43XXX", message: "What's the price for a beard trim?", tag: "Question" },
  { name: "Emma Clarke", number: "+44 7700 900456", message: "Do you have a slot on Saturday?", tag: "New lead", fresh: true },
  { name: "Arjun Patel", number: "+91 99XXX 65XXX", message: "Thanks, see you Sunday!", tag: "Booked" },
  { name: "Sana Khan", number: "+91 90XXX 87XXX", message: "Can I get a package price?", tag: "New lead" },
];

const chatGrid =
  "@lg:grid @lg:grid-cols-[minmax(0,0.9fr)_minmax(96px,1.05fr)_minmax(0,1.5fr)_92px] @lg:gap-2.5";

export function ChatsDashboard() {
  return (
    <MonitorFrame
      label="Example dashboard: today's chats"
      menu={["Dashboard", "Chats", "Customers", "Reminders", "Settings"]}
      active="Chats"
      heading="Today's chats"
      pill={<HeaderPill>3 new leads</HeaderPill>}
    >
      <div
        className={`hidden border-b border-border px-1.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted ${chatGrid}`}
      >
        <span>Name</span>
        <span>Number</span>
        <span>Last message</span>
        <span>Tag</span>
      </div>
      <ul>
        {chats.map((row) => (
          <li
            key={row.name}
            style={row.fresh ? at(2000) : undefined}
            className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-border px-0.5 py-1.5 text-[10px] last:border-b-0 @lg:py-2 @lg:text-[11px] ${chatGrid} ${
              row.fresh ? freshRow : ""
            }`}
          >
            <span className="order-1 min-w-0 flex-1 truncate font-semibold text-charcoal @lg:flex-none">
              {row.name}
            </span>
            <span className="order-3 w-full whitespace-nowrap tabular-nums text-muted-strong @lg:order-2 @lg:w-auto @lg:min-w-0 @lg:truncate">
              {row.number}
            </span>
            <span className="order-4 w-full text-muted-strong @lg:order-3 @lg:min-w-0 @lg:w-auto @lg:truncate">
              {row.message}
            </span>
            <span className="order-2 @lg:order-4">
              <StatusPill tone={row.tag === "Question" ? "grey" : "violet"} dot={row.fresh}>
                {row.tag}
              </StatusPill>
            </span>
          </li>
        ))}
      </ul>
    </MonitorFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Step 4: reminder messages                                           */
/* ------------------------------------------------------------------ */

export function ReminderPhone() {
  return (
    <ChatPhone
      label="Example phone: reminder messages from the business"
      name="Glow Studio Salon"
      initial="G"
      messages={[
        { text: "⏰ Reminder: your hair spa is tomorrow at 6 PM. Reply 2 to reschedule.", time: "10:00 AM" },
        { text: "Your membership ends in 5 days. Reply YES to renew.", time: "10:01 AM" },
      ]}
    />
  );
}