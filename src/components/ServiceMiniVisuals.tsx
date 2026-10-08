import { cssVars } from "@/components/showcase/parts";
import type { ServiceSlug } from "@/content/services";

/**
 * Tiny HTML/CSS pictures for the home service cards (about 80px tall).
 * They are decorative (aria-hidden). Idle = finished still picture; the animations
 * are in globals.css and only run while the card has data-play="true".
 */

function WhatsAppMini() {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-3.5">
      <span
        className="mv-pop self-start rounded-xl rounded-bl-sm border border-[#e5e7eb] bg-white px-2.5 py-1 text-[11px] font-medium text-charcoal"
        style={cssVars({ "--d": "0ms" })}
      >
        Is the gym open today?
      </span>
      <span
        className="mv-pop self-end rounded-xl rounded-br-sm bg-brand-violet px-2.5 py-1 text-[11px] font-medium text-white"
        style={cssVars({ "--d": "550ms" })}
      >
        Yes, till 9 PM!{" "}
        <span className="mv-tick font-bold tracking-tighter text-white">✓✓</span>
      </span>
    </div>
  );
}

function ChatbotMini() {
  return (
    <div className="flex h-full items-center justify-between gap-3 px-3.5">
      <div className="mv-bob flex shrink-0 items-center gap-1.5 text-brand-violet">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
        </svg>
        <span className="text-[11px] font-bold leading-none text-charcoal">11 PM</span>
      </div>
      <div className="w-[58%] rounded-xl border border-[#e5e7eb] bg-white p-1.5">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-violet" />
          <span className="h-1 w-8 rounded-full bg-[#e5e7eb]" />
        </div>
        <span
          className="mv-pop mt-1 block rounded-lg bg-[#f5f3ff] px-1.5 py-0.5 text-[10px] font-medium leading-tight text-charcoal"
          style={cssVars({ "--d": "150ms" })}
        >
          Open 24/7. Want a callback?
        </span>
        <span className="mt-1 flex gap-0.5 pl-1" aria-hidden="true">
          {[0, 160, 320].map((d) => (
            <span
              key={d}
              className="mv-dot h-1 w-1 rounded-full bg-brand-violet"
              style={cssVars({ "--d": `${d}ms` })}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

function DashboardMini() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 px-3.5">
      <div className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-2 py-1.5">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2.6"
          strokeLinecap="round"
          aria-hidden="true"
          className="shrink-0"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
        <span className="mv-type block whitespace-nowrap text-[11px] font-medium leading-none text-charcoal">
          Which product sold most?
        </span>
      </div>
      <svg
        viewBox="0 0 200 26"
        preserveAspectRatio="none"
        className="h-[26px] w-full"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="mv-spark"
          pathLength={1}
          d="M2 22 C 20 20, 28 12, 46 14 S 74 22, 92 15 S 120 4, 140 9 S 172 14, 198 3"
          stroke="#7c3aed"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

const barHeights = [0.4, 0.8, 0.55, 1, 0.65, 0.9, 0.45, 0.75, 0.5];

function ReceptionistMini() {
  return (
    <div className="flex h-full items-center justify-center gap-3 px-3.5">
      <span className="mv-bob flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-white">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6.6 3.5h2.6l1.4 3.8-1.8 1.3a11 11 0 0 0 5.6 5.6l1.3-1.8 3.8 1.4v2.6a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
        </svg>
      </span>
      <span className="flex h-9 items-center gap-[3px]" aria-hidden="true">
        {barHeights.map((h, i) => (
          <span
            key={i}
            className="mv-bar block h-full w-[3px] rounded-full bg-brand-violet"
            style={cssVars({ "--h": h, "--d": `${i * 70}ms` })}
          />
        ))}
      </span>
    </div>
  );
}

export default function ServiceMiniVisual({ slug }: { slug: ServiceSlug }) {
  switch (slug) {
    case "whatsapp-automation":
      return <WhatsAppMini />;
    case "chatbot":
      return <ChatbotMini />;
    case "ai-dashboard":
      return <DashboardMini />;
    case "ai-receptionist":
      return <ReceptionistMini />;
  }
}
