import DemoButton from "@/components/lead/DemoButton";
import TwoColumnSection from "@/components/service/TwoColumnSection";
import { AdPlacesVisual } from "@/components/storyboard/meta-ads";
import type { Interest } from "@/lib/lead";

const buttonClass =
  "inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark";

const blocks = [
  {
    title: "Where people see them",
    text: "In their Facebook and Instagram feed, Stories and Reels, right between posts from friends.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
  {
    title: "When people see them",
    text: "Whenever they scroll: over morning tea, at lunch, in the evening. You can choose the days and times your ad runs.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    title: "Why it works",
    text: "Your ad is shown only to people near your business who are likely to be interested, so you don't pay to reach the wrong people. Every enquiry gets an instant reply, so more of them become customers.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.8" r="2.2" />
      </svg>
    ),
  },
];

function CardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 12l-3 3 4 4 3-3" />
      <path d="M16 12l3 3-4 4-3-3" />
      <path d="M9 13l2.5-2.5a2 2 0 0 1 2.8 0L16 12" />
    </svg>
  );
}

/**
 * Short explainer for /services/meta-ads: what Meta ads are, three places they appear, and two
 * honest notes. Sample visuals only. No platform logos.
 */
export default function MetaAdsExplainer({ interests }: { interests: Interest[] }) {
  return (
    <TwoColumnSection
      split="55-45"
      background="tint"
      left={
        <>
          <h2>What are Meta ads?</h2>
          <p className="mt-4 max-w-xl text-lg leading-snug text-muted-strong">
            Meta ads are small adverts for your business that appear on Facebook and Instagram, the
            apps your customers already open every day.
          </p>
          <ul className="mt-8 space-y-6">
            {blocks.map((block) => (
              <li key={block.title} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-violet shadow-soft">
                  {block.icon}
                </span>
                <span>
                  <span className="block font-heading text-base font-bold text-charcoal">{block.title}</span>
                  <span className="mt-1 block text-[15px] leading-snug text-muted-strong">{block.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </>
      }
      right={
        <>
          <AdPlacesVisual />
          <div className="mt-8 rounded-2xl bg-white p-5 shadow-soft">
            <p className="font-heading text-base font-bold text-charcoal">Good to know</p>
            <ul className="mt-3 space-y-3">
              <li className="flex items-start gap-2.5 text-[15px] leading-snug text-muted-strong">
                <span className="mt-0.5 shrink-0 text-brand-violet">
                  <CardIcon />
                </span>
                You choose your budget. Ad money goes directly to Meta; our fee is separate.
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-snug text-muted-strong">
                <span className="mt-0.5 shrink-0 text-brand-violet">
                  <HandshakeIcon />
                </span>
                No one can honestly guarantee sales. We focus on real enquiries and fast replies.
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <DemoButton interests={interests} className={buttonClass} />
          </div>
        </>
      }
    />
  );
}
