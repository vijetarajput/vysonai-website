import DemoButton from "@/components/lead/DemoButton";
import type { Interest } from "@/lib/lead";

/** Violet tint card: "Works well for" chips and a small "Ask us" link that opens the lead form. */
export default function FitCard({
  title = "Works well for",
  chips,
  note = "Not sure if it fits your business?",
  linkLabel = "Ask us \u2192",
  interests,
}: {
  title?: string;
  chips: string[];
  note?: string;
  linkLabel?: string;
  interests?: Interest[];
}) {
  return (
    <div className="rounded-3xl bg-violet-tint p-6 lg:p-8">
      <h3 className="text-xl">{title}</h3>
      <ul className="mt-5 flex flex-wrap gap-2.5">
        {chips.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-border bg-white px-4 py-2 text-[15px] font-medium text-charcoal shadow-soft"
          >
            {chip}
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-brand-violet/15 pt-5 text-sm text-muted-strong">
        {note}{" "}
        <DemoButton
          interests={interests}
          className="font-semibold text-brand-violet underline-offset-4 hover:text-brand-violet-dark hover:underline"
        >
          {linkLabel}
        </DemoButton>
      </p>
    </div>
  );
}