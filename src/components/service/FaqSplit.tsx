import type { ReactNode } from "react";
import { FaqJsonLd, FaqList, type FaqItem } from "@/components/Faq";
import DemoButton from "@/components/lead/DemoButton";
import TwoColumnSection from "@/components/service/TwoColumnSection";
import type { Interest } from "@/lib/lead";

const buttonClass =
  "inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark";

/**
 * Quick questions in two columns: title, a short line and a button on the left (about 35%),
 * the accordion on the right (about 65%). Includes FAQPage JSON-LD.
 */
export default function FaqSplit({
  items,
  title = "Quick questions",
  helpText = "Can\u2019t find your answer? Book a free business audit and ask us.",
  buttonLabel,
  interests,
  background = "tint",
}: {
  items: FaqItem[];
  title?: string;
  helpText?: string;
  buttonLabel?: ReactNode;
  interests?: Interest[];
  background?: "white" | "tint";
}) {
  return (
    <>
      <FaqJsonLd items={items} />
      <TwoColumnSection
        split="35-65"
        background={background}
        left={
          <>
            <h2>{title}</h2>
            <p className="mt-4 max-w-sm text-lg leading-snug text-muted-strong">{helpText}</p>
            <div className="mt-6">
              <DemoButton interests={interests} className={buttonClass}>
                {buttonLabel}
              </DemoButton>
            </div>
          </>
        }
        right={<FaqList items={items} />}
      />
    </>
  );
}