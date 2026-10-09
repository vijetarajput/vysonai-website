import {
  ChatPhone,
  HeaderPill,
  MoonIcon,
  MonitorFrame,
  StatusPill,
  at,
  freshRow,
} from "@/components/storyboard/shared";
import { SparkleIcon } from "@/components/showcase/parts";
/* ------------------------------------------------------------------ */
/* Step 1: a person on the phone                                       */
/* ------------------------------------------------------------------ */

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

const appointments = [
  { time: "09:30 AM", name: "Rahul Mehta", phone: "+91 98765 4XXXX", status: "Confirmed" },
  { time: "10:00 AM", name: "Priya Shah", phone: "+91 99887 7XXXX", status: "Confirmed" },
  { time: "11:30 AM", name: "Sarah Thomas", phone: "+44 7700 900123", status: "New · Booked by AI", ai: "new" as const },
  { time: "12:15 PM", name: "Aman Verma", phone: "+91 91234 5XXXX", status: "Confirmed" },
  { time: "04:15 PM", name: "James Carter", phone: "+1 (555) 010-0142", status: "Booked by AI", ai: "booked" as const },
];

const rowGrid = "@lg:grid @lg:grid-cols-[66px_minmax(0,1fr)_minmax(104px,1.1fr)_128px] @lg:gap-2.5";

export function ReceptionistDashboard() {
  return (
    <MonitorFrame
      label="Example dashboard: today's appointments"
      menu={["Dashboard", "Appointments", "Calls", "Customers", "Settings"]}
      active="Dashboard"
      heading="Today's appointments"
      pill={
        <HeaderPill>
          <SparkleIcon size={10} />2 by AI
        </HeaderPill>
      }
    >
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
            style={row.ai === "new" ? at(2000) : undefined}
            className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-border px-0.5 py-1.5 text-[10px] last:border-b-0 @lg:py-2 @lg:text-[11px] ${rowGrid} ${
              row.ai === "new" ? freshRow : ""
            }`}
          >
            <span className="shrink-0 font-semibold tabular-nums text-charcoal">{row.time}</span>
            <span className="min-w-0 flex-1 truncate font-semibold text-charcoal @lg:flex-none">
              {row.name}
            </span>
            <span className="flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-0.5 @lg:contents">
              <span className="shrink-0 whitespace-nowrap tabular-nums text-muted-strong @lg:min-w-0 @lg:truncate">
                {row.phone}
              </span>
              <StatusPill tone={row.ai ? "violet" : "grey"} dot={row.ai === "new"}>
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
/* Step 4: the confirmation message                                    */
/* ------------------------------------------------------------------ */

export function ConfirmationPhone() {
  return (
    <ChatPhone
      label="Example phone: a confirmation message from the business"
      name="Bright Smile Dental"
      initial="B"
      messages={[
        { text: "Hi Sarah 👋 Your check-up is confirmed for tomorrow at 11:30 AM.", time: "11:03 PM" },
        { text: "We\u2019ll send you a reminder 2 hours before. Reply 2 to reschedule.", time: "11:03 PM" },
      ]}
    />
  );
}