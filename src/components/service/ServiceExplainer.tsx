import type { ReactNode } from "react";
import DemoButton from "@/components/lead/DemoButton";
import TwoColumnSection from "@/components/service/TwoColumnSection";
import { AnimateOnView } from "@/components/storyboard/client";
import type { Interest } from "@/lib/lead";

const buttonClass =
  "inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark";

export type ExplainerBlock = { title: string; text: string; icon: ReactNode };
export type ExplainerNote = { icon: ReactNode; text: ReactNode };

/** Shared 16px stroke icon used in explainer blocks and Good to know lines. */
export function ExplainerIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/**
 * Short service explainer: H2, intro, three icon blocks, a "Works well for" line,
 * a sample dashboard, two honest notes and a Book a free call button.
 */
export default function ServiceExplainer({
  title,
  intro,
  afterIntro,
  blocks,
  worksWellFor,
  visual,
  caption,
  notes,
  interests,
}: {
  title: string;
  intro: string;
  /** Optional extra left-column content after the intro, for example a row of step chips. */
  afterIntro?: ReactNode;
  blocks: [ExplainerBlock, ExplainerBlock, ExplainerBlock];
  worksWellFor: string;
  visual: ReactNode;
  caption: string;
  notes: [ExplainerNote, ExplainerNote];
  interests: Interest[];
}) {
  return (
    <TwoColumnSection
      split="50-50"
      background="tint"
      left={
        <>
          <h2>{title}</h2>
          <p className="mt-4 max-w-xl text-lg leading-snug text-muted-strong">{intro}</p>
          {afterIntro}
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
          <p className="mt-8 text-sm text-muted">{worksWellFor}</p>
        </>
      }
      right={
        <>
          <AnimateOnView className="relative pt-5">
            <span className="absolute left-0 top-0 text-[10px] font-medium uppercase tracking-wider text-muted">
              Sample
            </span>
            {visual}
            <p className="mt-3 text-center text-sm text-muted-strong">{caption}</p>
          </AnimateOnView>
          <div className="mt-8 rounded-2xl bg-white p-5 shadow-soft">
            <p className="font-heading text-base font-bold text-charcoal">Good to know</p>
            <ul className="mt-3 space-y-3">
              {notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[15px] leading-snug text-muted-strong">
                  <span className="mt-0.5 shrink-0 text-brand-violet">{note.icon}</span>
                  {note.text}
                </li>
              ))}
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
