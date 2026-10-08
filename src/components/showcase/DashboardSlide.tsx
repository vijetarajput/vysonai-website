import { BrowserFrame, cssVars } from "@/components/showcase/parts";

// Sample numbers for the picture only. Everything here is fictional.
const stats = [
  { label: "Total customers", value: "248" },
  { label: "New leads this week", value: "18" },
  { label: "Renewals due", value: "12" },
  { label: "Follow-ups pending", value: "7" },
];

const week = [
  { day: "Mon", value: 3 },
  { day: "Tue", value: 2 },
  { day: "Wed", value: 4 },
  { day: "Thu", value: 3 },
  { day: "Fri", value: 3 },
  { day: "Sat", value: 2 },
  { day: "Sun", value: 1 },
];

const followUps = [
  { name: "Amit Verma", type: "Gym", status: "New" },
  { name: "Dr. Sunita Rao", type: "Clinic", status: "Contacted" },
  { name: "Kiran Joshi", type: "Salon", status: "Joined" },
] as const;

const chip = {
  New: "bg-blue-50 text-brand-blue",
  Contacted: "bg-violet-tint text-brand-violet",
  Joined: "bg-emerald-50 text-emerald-700",
} as const;

const maxValue = Math.max(...week.map((d) => d.value));

/** No hooks: its small animations are pure CSS and start when the slide becomes active. */
export default function DashboardSlide() {
  return (
    <div className="mx-auto h-full w-full max-w-[460px]">
      <BrowserFrame label="Example customer dashboard" address="dashboard.example">
        <div className="flex h-full flex-col gap-2 bg-white p-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-heading text-sm font-bold leading-none text-charcoal">
              Customer Dashboard
            </p>
            <span className="text-[10px] text-muted">Mon, 9 March</span>
          </div>

          <ul className="grid grid-cols-2 gap-2">
            {stats.map((stat) => (
              <li key={stat.label} className="rounded-xl border border-border bg-violet-tint px-2.5 py-2">
                <p className="text-[10px] leading-tight text-muted-strong">{stat.label}</p>
                <p className="mt-0.5 font-heading text-xl font-extrabold leading-none text-charcoal">
                  {stat.value}
                </p>
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-border px-2.5 py-2">
            <p className="text-[11px] font-semibold text-charcoal">Leads this week</p>
            <div className="mt-1.5 flex h-[54px] items-end gap-1.5" aria-hidden="true">
              {week.map((d, i) => (
                <div
                  key={d.day}
                  className={`vy-grow flex-1 rounded-t-md ${d.value === maxValue ? "bg-brand-violet" : "bg-[#c4b5fd]"}`}
                  style={cssVars({ height: `${(d.value / maxValue) * 100}%`, "--i": i })}
                />
              ))}
            </div>
            <ul className="mt-1 flex gap-1.5">
              {week.map((d) => (
                <li key={d.day} className="flex-1 text-center text-[9px] text-muted">
                  {d.day}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border px-2.5 py-2">
            <p className="text-[11px] font-semibold text-charcoal">Today&apos;s follow-ups</p>
            <ul className="mt-1 divide-y divide-border">
              {followUps.map((row, i) => (
                <li
                  key={row.name}
                  className="vy-rise flex items-center justify-between gap-2 py-1.5"
                  style={cssVars({ "--i": i })}
                >
                  <span className="min-w-0 truncate text-[11px] text-charcoal">
                    <span className="font-medium">{row.name}</span>
                    <span className="text-muted"> · {row.type}</span>
                  </span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${chip[row.status]}`}>
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-auto self-center rounded-full bg-violet-tint px-3 py-1.5 text-[11px] font-medium text-charcoal">
            📧 Weekly report sent to your email
          </p>
        </div>
      </BrowserFrame>
    </div>
  );
}
