import DemoButton from "@/components/lead/DemoButton";
import TwoColumnSection from "@/components/service/TwoColumnSection";
import { AnimateOnView } from "@/components/storyboard/client";
import { ReceptionistDashboard } from "@/components/storyboard/receptionist";
import type { Interest } from "@/lib/lead";

const buttonClass =
  "inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark";

const blocks = [
  {
    title: "What it does",
    text: "Picks up every call, answers common questions like timings, prices and location, and books appointments straight into your calendar.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
  {
    title: "When it works for you",
    text: "Day and night, weekends and holidays. When you're busy, closed or on another call, it picks up, so no customer hears 'no answer'.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    title: "Why it helps your business",
    text: "Every missed call can be a missed customer. With every call answered and every booking on your dashboard, you get more appointments without hiring extra staff.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
    ),
  },
];

function SpeechIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

/**
 * Short explainer for /services/ai-receptionist: what an AI receptionist is, the appointments
 * dashboard, and two honest notes. Sample visuals only.
 */
export default function ReceptionistExplainer({ interests }: { interests: Interest[] }) {
  return (
    <TwoColumnSection
      split="50-50"
      background="tint"
      left={
        <>
          <h2>What is an AI receptionist?</h2>
          <p className="mt-4 max-w-xl text-lg leading-snug text-muted-strong">
            An AI receptionist is a smart assistant that answers your business phone, talks to callers
            like a real receptionist, and books appointments for you.
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
          <p className="mt-8 text-sm text-muted">Works well for clinics, dentists, restaurants, salons and gyms.</p>
        </>
      }
      right={
        <>
          <AnimateOnView className="relative pt-5">
            <span className="absolute left-0 top-0 text-[10px] font-medium uppercase tracking-wider text-muted">
              Sample
            </span>
            <ReceptionistDashboard />
            <p className="mt-3 text-center text-sm text-muted-strong">Every booking, right on your dashboard.</p>
          </AnimateOnView>
          <div className="mt-8 rounded-2xl bg-white p-5 shadow-soft">
            <p className="font-heading text-base font-bold text-charcoal">Good to know</p>
            <ul className="mt-3 space-y-3">
              <li className="flex items-start gap-2.5 text-[15px] leading-snug text-muted-strong">
                <span className="mt-0.5 shrink-0 text-brand-violet">
                  <SpeechIcon />
                </span>
                Sounds natural and warm, and politely mentions it&apos;s an AI assistant.
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-snug text-muted-strong">
                <span className="mt-0.5 shrink-0 text-brand-violet">
                  <PhoneIcon />
                </span>
                If it can&apos;t help, it passes the call to you or books a callback for the next day.
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <DemoButton interests={interests} className={buttonClass}>
              Book a free call
            </DemoButton>
          </div>
        </>
      }
    />
  );
}
