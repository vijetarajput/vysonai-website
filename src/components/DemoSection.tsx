import LeadFlow from "@/components/lead/LeadFlow";

const steps = [
  { title: "Free 15-minute call", text: "Tell us how your business works today." },
  { title: "A demo made for you", text: "See it working with your kind of business." },
  { title: "1-month pilot", text: "Try it with real customers before you commit." },
];

function LockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-brand-violet"
    >
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

/**
 * Last section on the Home page: what happens next (left) and the 2-step demo form (right).
 * On mobile the text and steps come first, then the form.
 */
export default function DemoSection() {
  return (
    <section id="demo" className="bg-white">
      <div className="site-container grid pb-10 md:pb-12 lg:pb-[4.5rem] grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
        <div>
          <h2>Ready to automate your manual work and grow your profit?</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-strong">
            See a free demo for your business. No cost, no commitment. Here&apos;s what happens
            next:
          </p>

          <ol className="mt-8">
            {steps.map((step, index) => (
              <li key={step.title} className="relative pb-6 pl-12 last:pb-0">
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[15px] top-8 w-px bg-brand-violet/30"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-violet font-heading text-sm font-bold text-white ring-4 ring-brand-violet/15"
                >
                  {index + 1}
                </span>
                <h3 className="text-lg leading-8">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-0.5 leading-relaxed text-muted-strong">{step.text}</p>
              </li>
            ))}
          </ol>

          <p className="mt-8 flex items-start gap-2 text-sm text-muted-strong">
            <LockIcon />
            We only use your number to contact you about the demo.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8">
          <LeadFlow layout="inline" />
        </div>
      </div>
    </section>
  );
}
