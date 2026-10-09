import ServiceScene from "@/components/ServiceScene";
import { BrowserFrame } from "@/components/showcase/parts";
import { StockBar } from "@/components/storyboard/stock";
import { at } from "@/components/storyboard/shared";

const items: { name: string; n: number; tone: "healthy" | "low" | "out" }[] = [
  { name: "1.5 Ton AC", n: 24, tone: "healthy" },
  { name: "LED TV 43\"", n: 11, tone: "healthy" },
  { name: "Ceiling Fan", n: 4, tone: "low" },
  { name: "Mixer Grinder", n: 17, tone: "healthy" },
  { name: "Air Cooler", n: 2, tone: "out" },
];

/**
 * Hero picture for /services/stock-management: a stock list, then a low-stock alert. Sample only.
 */
export default function StockScene() {
  return (
    <ServiceScene
      badges={[
        {
          content: (
            <>
              <span aria-hidden="true">📦</span> 5 items running low
            </>
          ),
          className: "right-3 top-2",
          delay: 900,
          bob: 900,
        },
        {
          content: (
            <>
              <span aria-hidden="true">🔥</span> Top seller: 1.5 Ton AC
            </>
          ),
          className: "bottom-2 left-3",
          delay: 2800,
        },
      ]}
    >
      <div className="h-[410px] w-full max-w-[560px]">
        <BrowserFrame label="Example: a stock list with a low-stock alert" address="app.vysonai.com/stock">
          <div className="relative flex h-full flex-col bg-white p-3">
            <p className="font-heading text-[13px] font-bold text-charcoal">Patel Electronics · Stock</p>
            <ul className="mt-2 space-y-1">
              {items.map((row) => (
                <li key={row.name} className="flex items-center gap-2 rounded-xl border border-border px-2.5 py-1.5">
                  <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-charcoal">{row.name}</span>
                  <StockBar n={row.n} tone={row.tone} />
                </li>
              ))}
            </ul>

            <div
              className="ss-in absolute inset-x-4 bottom-3 rounded-2xl border border-brand-violet/20 bg-white p-3 shadow-[0_18px_40px_-16px_rgb(31_41_55/0.4)]"
              style={at(1600)}
            >
              <p className="text-[13px] font-semibold leading-snug text-charcoal">
                <span aria-hidden="true">⚠️ </span>
                Ceiling fans: only 4 left. You usually sell 3 a day.
              </p>
              <p className="mt-2.5 flex gap-2">
                <span className="rounded-full bg-brand-violet px-3 py-1 text-[11px] font-semibold text-white">
                  Reorder 20
                </span>
                <span className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold text-charcoal">
                  Later
                </span>
              </p>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </ServiceScene>
  );
}
