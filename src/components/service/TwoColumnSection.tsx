import type { ReactNode } from "react";

/** Column widths on desktop (left / right). On mobile the columns stack. */
const splits = {
  "55-45": "lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]",
  "35-65": "lg:grid-cols-[minmax(0,35fr)_minmax(0,65fr)]",
  "50-50": "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
} as const;

/**
 * Reusable two-column section for service pages.
 * Standard section spacing, columns aligned to the top, stacked on mobile.
 * Put the heading inside a column (left-aligned), for example with <ChecklistColumn>.
 */
export default function TwoColumnSection({
  left,
  right,
  split = "55-45",
  background = "white",
}: {
  left: ReactNode;
  right: ReactNode;
  split?: keyof typeof splits;
  background?: "white" | "tint";
}) {
  return (
    <section className={background === "tint" ? "bg-violet-tint" : "bg-white"}>
      <div
        className={`site-container section-y grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:gap-12 ${splits[split]}`}
      >
        <div className="min-w-0">{left}</div>
        <div className="min-w-0">{right}</div>
      </div>
    </section>
  );
}