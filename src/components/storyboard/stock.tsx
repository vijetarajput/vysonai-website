import {
  ChatPhone,
  HeaderPill,
  MonitorFrame,
  StatusPill,
  at,
  freshRow,
} from "@/components/storyboard/shared";
import { SparkleIcon } from "@/components/showcase/parts";

type StockTone = "healthy" | "low" | "out";

const barColor: Record<StockTone, string> = {
  healthy: "bg-brand-violet",
  low: "bg-amber-500",
  out: "bg-red-400",
};

export function StockBar({ n, max = 24, tone }: { n: number; max?: number; tone: StockTone }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <span className="h-1.5 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100 @lg:w-14">
        <span className={`block h-full rounded-full ${barColor[tone]}`} style={{ width: `${Math.min(100, (n / max) * 100)}%` }} />
      </span>
      <span className="tabular-nums font-semibold text-charcoal">{n}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1: a sale at the counter                                       */
/* ------------------------------------------------------------------ */

export function ShopIllustration() {
  return (
    <svg
      viewBox="0 0 260 200"
      role="img"
      aria-label="Illustration of a shopkeeper handing a box to a customer, with a receipt updating the stock list"
      className="h-auto w-full max-w-[320px]"
    >
      <circle cx="128" cy="102" r="92" fill="#fff" opacity="0.75" />
      {/* counter */}
      <rect x="28" y="148" width="150" height="28" rx="6" fill="#7C3AED" />
      <rect x="28" y="140" width="150" height="12" rx="4" fill="#6D28D9" />
      {/* shopkeeper */}
      <circle cx="78" cy="88" r="22" fill="#F1C7A0" />
      <path d="M58 88c2-18 16-22 22-20 14 2 22 12 20 22-6-10-18-14-30-12-6 1-10 5-12 10Z" fill="#1F2937" />
      <circle cx="71" cy="90" r="2.4" fill="#1F2937" />
      <circle cx="85" cy="90" r="2.4" fill="#1F2937" />
      <path d="M72 98q7 6 14 0" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <rect x="70" y="108" width="16" height="16" rx="5" fill="#E3AE86" />
      <path d="M48 148c4-28 14-38 30-40 16 2 26 12 30 40Z" fill="#2563EB" />
      {/* customer */}
      <circle cx="168" cy="96" r="20" fill="#F1C7A0" />
      <path d="M150 94c4-16 16-18 20-16 12 2 18 10 16 20-6-8-14-12-24-10-6 1-10 4-12 6Z" fill="#1F2937" />
      <circle cx="162" cy="98" r="2.2" fill="#1F2937" />
      <circle cx="174" cy="98" r="2.2" fill="#1F2937" />
      <path d="M162 105q6 5 12 0" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <path d="M148 160c2-28 10-36 22-38 12 2 20 10 22 38Z" fill="#C026D3" />
      {/* box being handed */}
      <g className="sb-pop" style={at(400)}>
        <rect x="108" y="118" width="28" height="22" rx="3" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="2" />
        <path d="M108 126h28M122 118v22" stroke="#7C3AED" strokeWidth="1.6" />
      </g>
      {/* receipt */}
      <g className="ss-in" style={at(900)}>
        <rect x="188" y="48" width="44" height="56" rx="4" fill="#fff" stroke="#E5E7EB" />
        <path d="M196 60h28M196 70h22M196 80h26" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      </g>
      <path
        className="sb-flow"
        d="M210 106 C210 128, 210 140, 210 158"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="2"
      />
      <rect x="192" y="158" width="36" height="28" rx="8" fill="#7C3AED" />
      <path d="M200 166h20M200 173h14M200 180h16" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2: stock updates on its own                                    */
/* ------------------------------------------------------------------ */

export function StockDropCard() {
  return (
    <div className="relative w-full max-w-[280px] rounded-2xl border border-border bg-white p-4 text-left shadow-soft">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-tint text-brand-violet"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-heading text-[15px] font-bold text-charcoal">LED TV 43&quot;</p>
          <p className="text-[11px] text-muted">SKU TV-43</p>
        </div>
      </div>
      <p className="relative mt-4 font-heading text-5xl font-bold tabular-nums leading-none text-brand-violet">
        <span className="sb-from">12</span>
        <span className="sb-to absolute left-0 top-0">11</span>
      </p>
      <span
        aria-hidden="true"
        className="sb-pop absolute right-4 top-16 rounded-full bg-brand-magenta px-2 py-0.5 text-[11px] font-bold text-white"
        style={at(800)}
      >
        −1
      </span>
      <p className="mt-3 text-[13px] text-muted-strong">Sold today: 3</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3: stock dashboard                                             */
/* ------------------------------------------------------------------ */

type Status = "Healthy" | "Low" | "Almost out";

const products: {
  name: string;
  stock: number;
  sold: number;
  status: Status;
  reorder: string;
  tone: StockTone;
  fresh?: boolean;
}[] = [
  { name: "1.5 Ton AC", stock: 24, sold: 18, status: "Healthy", reorder: "—", tone: "healthy" },
  { name: "LED TV 43\"", stock: 11, sold: 9, status: "Healthy", reorder: "—", tone: "healthy" },
  { name: "Ceiling Fan", stock: 4, sold: 21, status: "Low", reorder: "20", tone: "low", fresh: true },
  { name: "Air Cooler", stock: 2, sold: 7, status: "Almost out", reorder: "10", tone: "out" },
  { name: "Mixer Grinder", stock: 17, sold: 5, status: "Healthy", reorder: "—", tone: "healthy" },
];

const stockGrid =
  "@lg:grid @lg:grid-cols-[minmax(0,1.15fr)_minmax(88px,1fr)_minmax(52px,0.7fr)_minmax(70px,0.9fr)_44px] @lg:gap-2";

function statusTone(status: Status) {
  if (status === "Low") return "amber" as const;
  if (status === "Almost out") return "red" as const;
  return "grey" as const;
}

export function StockDashboard() {
  return (
    <MonitorFrame
      label="Example dashboard: stock today"
      menu={["Dashboard", "Products", "Stock", "Orders", "Reports", "Settings"]}
      active="Stock"
      heading="Stock today"
      pill={<HeaderPill>5 running low</HeaderPill>}
    >
      <div className="mb-2 flex items-center gap-2 rounded-full border border-border bg-white px-2.5 py-1.5">
        <span className="shrink-0 text-brand-violet">
          <SparkleIcon size={12} />
        </span>
        <span className="sb-type min-w-0 text-[11px] text-charcoal">Which product sold most this week?</span>
      </div>
      <p className="ss-in mb-2 inline-flex rounded-full bg-violet-tint px-2.5 py-1 text-[11px] font-semibold text-brand-violet" style={at(2200)}>
        1.5 Ton AC · 18 sold this week
      </p>
      <div
        className={`hidden border-b border-border px-1.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted ${stockGrid}`}
      >
        <span>Product</span>
        <span>In stock</span>
        <span>Sold this week</span>
        <span>Status</span>
        <span>Reorder</span>
      </div>
      <ul>
        {products.map((row) => (
          <li
            key={row.name}
            style={row.fresh ? at(2000) : undefined}
            className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-border px-0.5 py-1.5 text-[10px] last:border-b-0 @lg:py-2 @lg:text-[11px] ${stockGrid} ${
              row.fresh ? freshRow : ""
            }`}
          >
            <span className="order-1 min-w-0 flex-1 truncate font-semibold text-charcoal @lg:flex-none">
              {row.name}
            </span>
            <span className="order-2 @lg:order-4">
              <StatusPill tone={statusTone(row.status)} dot={row.fresh}>
                {row.status}
              </StatusPill>
            </span>
            <span className="order-3 flex w-full min-w-0 items-center justify-between gap-2 @lg:contents">
              <span className="@lg:order-2">
                <StockBar n={row.stock} tone={row.tone} />
              </span>
              <span className="hidden tabular-nums text-muted-strong @lg:order-3 @lg:block">{row.sold}</span>
              <span className="font-semibold tabular-nums text-charcoal @lg:order-5">{row.reorder}</span>
            </span>
          </li>
        ))}
      </ul>
    </MonitorFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Step 4: restock alert on the phone                                  */
/* ------------------------------------------------------------------ */

export function StockAlertPhone() {
  return (
    <ChatPhone
      label="Example phone: a stock alert from VYSON-AI"
      name="VYSON-AI Alerts"
      initial="V"
      messages={[
        { text: "⚠️ Ceiling fans are running low (4 left). Order 20 more?", time: "9:12 AM" },
      ]}
      extra={
        <div className="ss-in mt-1 flex flex-wrap gap-1.5" style={at(1500)}>
          <span className="rounded-full bg-brand-violet px-2.5 py-1 text-[11px] font-semibold text-white">
            Yes, order
          </span>
          <span className="rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-charcoal">
            Remind me tomorrow
          </span>
        </div>
      }
    />
  );
}
