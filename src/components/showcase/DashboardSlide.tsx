"use client";

import CountUp from "@/components/showcase/CountUp";
import { BrowserFrame, cssVars, FloatCard, type SlideProps } from "@/components/showcase/parts";

// Sample numbers for the picture only. "Patel Electronics" and everything below is fictional.

const stats = [
  { label: "Today's sales", to: 48250, prefix: "₹", suffix: "", trend: "▲ 12%", tone: "up" },
  { label: "Orders", to: 36, prefix: "", suffix: "", trend: "▲ 8%", tone: "up" },
  { label: "Low stock", to: 5, prefix: "", suffix: " items", trend: "▲ 2", tone: "warn" },
  { label: "Pending payments", to: 12400, prefix: "₹", suffix: "", trend: "▼ 5%", tone: "down" },
] as const;

const toneClass = {
  up: "text-emerald-700 bg-emerald-50",
  warn: "text-amber-700 bg-amber-50",
  down: "text-emerald-700 bg-emerald-50",
};

const week = [
  { day: "Mon", value: 32 },
  { day: "Tue", value: 38 },
  { day: "Wed", value: 35 },
  { day: "Thu", value: 44 },
  { day: "Fri", value: 41 },
  { day: "Sat", value: 54 },
  { day: "Sun", value: 49 },
];

const topSelling = [
  { name: "1.5 Ton AC", sold: 14 },
  { name: 'LED TV 43"', sold: 11 },
  { name: "Mixer Grinder", sold: 9 },
];

const lowStock = [
  { name: 'LED TV 43"', left: 2, tone: "bg-red-50 text-red-700" },
  { name: "Ceiling Fan", left: 4, tone: "bg-amber-50 text-amber-700" },
];

// Chart geometry (the SVG is stretched to fit its box, so the numbers are relative)
const W = 100;
const H = 40;
const points = week.map((d, i) => ({
  x: ((i + 0.5) / week.length) * W,
  y: H - 3 - (d.value / 60) * (H - 8),
}));
const line = points.reduce((path, p, i) => {
  if (i === 0) return `M${p.x},${p.y}`;
  const prev = points[i - 1];
  const mid = (prev.x + p.x) / 2;
  return `${path} C${mid},${prev.y} ${mid},${p.y} ${p.x},${p.y}`;
}, "");
const area = `${line} L${points[points.length - 1].x},${H} L${points[0].x},${H} Z`;

export default function DashboardSlide({ active, live }: SlideProps) {
  return (
    <div className="relative mx-auto h-full w-full max-w-[640px]">
      <BrowserFrame label="Example business dashboard for Patel Electronics" address="dashboard.example">
        <div className="flex h-full flex-col gap-2.5 p-3 sm:gap-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-heading text-[12.5px] font-bold text-charcoal sm:text-sm">
              Patel Electronics · Business Dashboard
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`rounded-xl border px-2.5 py-1.5 sm:py-2 ${
                  s.tone === "warn" ? "border-amber-200 bg-amber-50/60" : "border-border bg-violet-tint"
                }`}
              >
                <p className="truncate text-[10px] text-muted-strong sm:text-[11px]">{s.label}</p>
                <div className="flex items-end justify-between gap-1">
                  <p className="font-heading text-base font-extrabold leading-tight text-charcoal xl:text-lg">
                    <CountUp to={s.to} prefix={s.prefix} active={active} live={live} />
                    {s.suffix && <span className="text-[11px] font-semibold">{s.suffix}</span>}
                  </p>
                  <span
                    className={`mb-0.5 whitespace-nowrap rounded-full px-1 py-0.5 text-[9px] font-semibold ${toneClass[s.tone]}`}
                  >
                    {s.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 sm:min-h-0 sm:flex-1 sm:flex-row sm:gap-3">
            {/* Sales chart */}
            <div className="flex flex-col rounded-xl border border-border bg-white px-3 pb-2 pt-2.5 sm:flex-[1.5]">
              <p className="text-[11px] font-semibold text-charcoal sm:text-xs">Sales this week</p>
              <div className="vy-clip relative mt-1 h-[52px] sm:h-auto sm:min-h-[60px] sm:flex-1">
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="vy-sales-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={area} fill="url(#vy-sales-fill)" />
                  <path
                    d={line}
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
              <div className="mt-1 grid grid-cols-7 text-center text-[9px] text-muted">
                {week.map((d) => (
                  <span key={d.day}>{d.day}</span>
                ))}
              </div>
            </div>

            {/* Top selling */}
            <div className="rounded-xl border border-border bg-white px-3 py-2.5 sm:flex-1">
              <p className="text-[11px] font-semibold text-charcoal sm:text-xs">Top selling</p>
              <ul className="mt-1.5 space-y-1.5">
                {topSelling.map((item, i) => (
                  <li
                    key={item.name}
                    className="vy-rise flex items-center gap-2 text-[11px]"
                    style={cssVars({ "--i": i })}
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-tint text-[9px] font-bold text-brand-violet"
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-charcoal">{item.name}</span>
                    <span className="shrink-0 text-muted-strong">{item.sold} sold</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Low stock (desktop and tablet only, there is no room on phones) */}
          <div className="hidden rounded-xl border border-border bg-white px-3 py-2.5 sm:block">
            <p className="text-xs font-semibold text-charcoal">Low stock</p>
            <ul className="mt-1.5 space-y-1.5">
              {lowStock.map((item, i) => (
                <li
                  key={item.name}
                  className="vy-rise grid grid-cols-[1fr_auto_auto] items-center gap-3 text-[11px]"
                  style={cssVars({ "--i": i + 3 })}
                >
                  <span className="text-charcoal">{item.name}</span>
                  <span className="text-muted-strong">{item.left} left</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.tone}`}>
                    Reorder
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BrowserFrame>

      <FloatCard delay={1900} bob={500} wide className="right-14 top-3">
        <span aria-hidden="true">⚠️</span> Ceiling Fan running low
      </FloatCard>
      <FloatCard delay={1300} wide className="bottom-2 right-2 sm:-bottom-5 sm:left-10 sm:right-auto">
        <span aria-hidden="true">📧</span> Weekly report sent to your email
      </FloatCard>
    </div>
  );
}
