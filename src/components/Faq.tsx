import JsonLd from "@/components/JsonLd";
import type { FaqItem } from "@/content/industry";

/** Accordion built on native <details> (works without JavaScript) + FAQPage JSON-LD. */
export default function Faq({
  items,
  title = "Common questions",
  background = "white",
}: {
  items: FaqItem[];
  title?: string;
  background?: "white" | "tint";
}) {
  return (
    <section className={background === "tint" ? "bg-violet-tint" : "bg-white"}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-center">{title}</h2>

        <div className="mt-10 space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border bg-white shadow-soft open:border-brand-violet"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-heading font-semibold text-charcoal [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 text-brand-violet transition-transform group-open:rotate-180"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="measure px-5 pb-5 leading-relaxed text-muted-strong">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
