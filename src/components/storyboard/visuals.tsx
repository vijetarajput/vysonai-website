import type { ReactNode } from "react";
import { TodayDate } from "@/components/storyboard/client";
import { DoubleTick, SparkleIcon, cssVars } from "@/components/showcase/parts";

/** Delay (ms) after the card appears, as a CSS variable for .ss-in / .sb-slide / .sb-wave. */
const at = (ms: number) => cssVars({ "--d": `${ms}ms` });

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

/* ------------------------------------------------------------------ */
/* Step 1: a person on the phone                                       */
/* ------------------------------------------------------------------ */

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />
    </svg>
  );
}

export function CallerIllustration() {
  return (
    <>
      <svg
        viewBox="0 0 240 210"
        role="img"
        aria-label="Illustration of a friendly person holding a phone to their ear"
        className="h-auto w-full max-w-[290px]"
      >
        <circle cx="112" cy="110" r="94" fill="#fff" opacity="0.75" />
        {/* neck and shoulders */}
        <rect x="104" y="108" width="16" height="22" rx="6" fill="#E3AE86" />
        <path d="M48 210C48 158 74 130 112 128c38 2 64 30 64 82Z" fill="#7C3AED" />
        <path d="M98 130l14 16 14-16Z" fill="#F5F3FF" />
        {/* raised arm */}
        <path
          d="M166 172c20-20 16-52-6-66"
          fill="none"
          stroke="#6D28D9"
          strokeWidth="22"
          strokeLinecap="round"
        />
        {/* head */}
        <circle cx="112" cy="84" r="32" fill="#F1C7A0" />
        <path
          d="M80 86C76 54 98 46 114 48c20 2 32 18 29 36-5-14-19-20-35-19-14 1-24 9-28 21Z"
          fill="#1F2937"
        />
        <ellipse cx="143" cy="88" rx="4.5" ry="7" fill="#E3AE86" />
        <circle cx="101" cy="90" r="3" fill="#1F2937" />
        <circle cx="123" cy="90" r="3" fill="#1F2937" />
        <circle cx="95" cy="100" r="5" fill="#C026D3" opacity="0.15" />
        <circle cx="129" cy="100" r="5" fill="#C026D3" opacity="0.15" />
        <path d="M103 102q9 8 18 0" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
        {/* phone */}
        <g transform="rotate(12 154 80)">
          <rect x="146" y="58" width="16" height="42" rx="4.5" fill="#1F2937" />
          <rect x="148.5" y="62" width="11" height="31" rx="2" fill="#2563EB" />
        </g>
        {/* hand */}
        <ellipse cx="157" cy="100" rx="9.5" ry="8.5" fill="#F1C7A0" />
        {/* sound waves */}
        <g
          fill="none"
          stroke="#C026D3"
          strokeWidth="4"
          strokeLinecap="round"
          transform="translate(2 2)"
        >
          <path className="sb-wave" style={at(0)} d="M167 50A30 30 0 0 1 182 73.4" />
          <path className="sb-wave" style={at(300)} d="M173 39.6A42 42 0 0 1 193.8 72.3" />
          <path className="sb-wave" style={at(600)} d="M179 29.2A54 54 0 0 1 205.8 71.3" />
        </g>
      </svg>
      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-[13px] font-semibold text-charcoal shadow-soft">
        <span className="text-brand-violet">
          <MoonIcon />
        </span>
        Sarah · 11:02 PM
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2: the call screen                                             */
/* ------------------------------------------------------------------ */

const transcript: { who: "caller" | "ai"; text: string }[] = [
  { who: "caller", text: "Hi, can I book a check-up for tomorrow?" },
  { who: "ai", text: "Of course! I have 10:00 AM or 11:30 AM. Which works for you?" },
  { who: "caller", text: "11:30, please." },
  { who: "ai", text: "Done! You\u2019re booked for 11:30 AM tomorrow." },
];

export function CallScreen() {
  return (
    <figure
      aria-label="Example call screen: a caller talking to an AI receptionist"
      className="w-full max-w-[400px] overflow-hidden rounded-2xl border border-border bg-white shadow-[0_18px_40px_-18px_rgb(31_41_55/0.35)]"
    >
      <div className="flex items-center gap-2 bg-brand-violet px-3.5 py-2.5 text-white">
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-green-300" />
        <span className="min-w-0 flex-1 text-[12px] font-semibold leading-tight">AI Receptionist · On call</span>
        <span aria-hidden="true" className="flex h-4 shrink-0 items-center gap-[3px]">
          {[0, 160, 80, 240, 120].map((d, i) => (
            <span
              key={i}
              className="sb-bar block h-4 w-[3px] rounded-full bg-white/85"
              style={at(d)}
            />
          ))}
        </span>
        <span className="shrink-0 text-[12px] font-semibold tabular-nums">00:38</span>
      </div>
      <div className="space-y-2.5 bg-violet-tint/60 p-3">
        {transcript.map((line, i) =>
          line.who === "caller" ? (
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
/* Step 3: the dashboard on a monitor                                  */
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
  Customers: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
    </>
  ),
  Settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
    </>
  ),
} as const;

function MenuIcon({ name }: { name: keyof typeof icons }) {
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

const appointments = [
  { time: "09:30 AM", name: "Rahul Mehta", phone: "+91 98765 4XXXX", status: "Confirmed" },
  { time: "10:00 AM", name: "Priya Shah", phone: "+91 99887 7XXXX", status: "Confirmed" },
  { time: "11:30 AM", name: "Sarah Thomas", phone: "+44 7700 900123", status: "New · Booked by AI", ai: true },
  { time: "12:15 PM", name: "Aman Verma", phone: "+91 91234 5XXXX", status: "Confirmed" },
  { time: "04:15 PM", name: "James Carter", phone: "+1 (555) 010-0142", status: "Confirmed" },
];

const rowGrid = "@lg:grid @lg:grid-cols-[66px_minmax(0,1fr)_minmax(104px,1.1fr)_128px] @lg:gap-2.5";

export function DashboardMonitor() {
  return (
    <figure
      aria-label="Example dashboard: today's appointments"
      className="@container mx-auto w-full max-w-[720px]"
    >
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
            {(Object.keys(icons) as (keyof typeof icons)[]).map((name) => (
              <span
                key={name}
                className={`flex items-center justify-center gap-2 rounded-md p-1.5 text-[11px] @xl:justify-start ${
                  name === "Dashboard"
                    ? "bg-violet-tint font-semibold text-brand-violet"
                    : "text-muted-strong"
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
                  Today&apos;s appointments
                </p>
              </div>
              <span className="rounded-full bg-violet-tint px-2.5 py-1 text-[10px] font-semibold text-brand-violet">
                6 booked · 2 by AI tonight
              </span>
            </div>

            <div className="mt-2.5">
              <div
                className={`hidden border-b border-border px-1.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted ${rowGrid}`}
              >
                <span>Time</span>
                <span>Name</span>
                <span>Phone</span>
                <span>Status</span>
              </div>
              <ul>
                {appointments.map((row) => (
                  <li
                    key={row.time}
                    style={row.ai ? at(2000) : undefined}
                    className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-border px-0.5 py-1.5 text-[10px] last:border-b-0 @lg:py-2 @lg:text-[11px] ${rowGrid} ${
                      row.ai ? "sb-slide rounded-md bg-violet-tint ring-1 ring-brand-violet/25" : ""
                    }`}
                  >
                    <span className="shrink-0 font-semibold tabular-nums text-charcoal">{row.time}</span>
                    <span className="min-w-0 flex-1 truncate font-semibold text-charcoal @lg:flex-none">
                      {row.name}
                    </span>
                    <span className="flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-0.5 @lg:contents">
                      <span className="shrink-0 whitespace-nowrap tabular-nums text-muted-strong @lg:min-w-0 @lg:truncate">{row.phone}</span>
                      {row.ai ? (
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-violet/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand-violet @lg:justify-self-start">
                          <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                            <span className="sb-ping absolute inline-flex h-full w-full rounded-full bg-brand-violet opacity-60" />
                            <span className="relative h-1.5 w-1.5 rounded-full bg-brand-violet" />
                          </span>
                          {row.status}
                        </span>
                      ) : (
                        <span className="inline-flex whitespace-nowrap rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-muted-strong @lg:justify-self-start">
                          {row.status}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Stand */}
      <div aria-hidden="true" className="mx-auto h-3 w-10 bg-[#d1d5db]" />
      <div aria-hidden="true" className="mx-auto h-1.5 w-24 rounded-full bg-[#d1d5db]" />
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Step 4: the confirmation message                                    */
/* ------------------------------------------------------------------ */

function Message({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <div className="ss-in max-w-[90%]" style={at(delay)}>
      <div className="rounded-2xl rounded-tl-md border border-border bg-white px-3 pb-1.5 pt-2 text-[12.5px] leading-snug text-charcoal shadow-soft">
        {children}
        <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted">
          11:03 PM
          <span className="text-brand-blue">
            <DoubleTick />
          </span>
        </span>
      </div>
    </div>
  );
}

export function ConfirmationPhone() {
  return (
    <figure
      aria-label="Example phone: a confirmation message from the business"
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
          B
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[13px] font-bold">Bright Smile Dental</span>
          <span className="block text-[10px] text-white/80">Online</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 bg-violet-tint/70 px-3 py-3">
        <p className="mx-auto rounded-full bg-white px-2.5 py-0.5 text-[10px] font-medium text-muted-strong shadow-soft">
          Today
        </p>
        <Message delay={700}>Hi Sarah 👋 Your check-up is confirmed for tomorrow at 11:30 AM.</Message>
        <Message delay={1500}>We&apos;ll send you a reminder 2 hours before. Reply 2 to reschedule.</Message>
      </div>
      <div aria-hidden="true" className="border-t border-border bg-white px-3 py-2">
        <div className="rounded-full bg-gray-100 px-3 py-1.5 text-[11px] text-muted">Type a message</div>
      </div>
    </figure>
  );
}
