type Step = { title: string; text: string };

const defaultSteps: Step[] = [
  {
    title: "Free call",
    text: "Tell us how your business works today.",
  },
  {
    title: "Demo for your business",
    text: "We show you a working demo made for your business.",
  },
  {
    title: "1-month pilot",
    text: "Try it with your real customers before you commit.",
  },
];

const columns = {
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export default function HowItWorks({
  title = "How it works",
  steps = defaultSteps,
  background = "tint",
}: {
  title?: string;
  steps?: Step[];
  background?: "tint" | "white";
}) {
  const cols = steps.length >= 4 ? columns[4] : columns[3];

  return (
    <section className={background === "tint" ? "bg-violet-tint" : "bg-white"}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-center">{title}</h2>

        <ol className={`mt-10 grid gap-5 md:gap-6 ${cols}`}>
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-violet font-heading text-base font-bold text-white"
              >
                {index + 1}
              </span>
              <h3 className="mt-5">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-strong">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
