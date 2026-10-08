import DemoButton from "@/components/lead/DemoButton";

const roles = [
  "AI Receptionist",
  "WhatsApp Assistant",
  "Website Sales Assistant",
  "Customer Manager",
  "Stock Manager",
  "Marketing Manager",
  "Outreach Executive",
  "Working 24/7 for businesses in India, the UK & the US",
];

function Spark() {
  return (
    <span aria-hidden="true" className="px-3 text-brand-violet">
      ✦
    </span>
  );
}

function CtaLink() {
  return (
    <DemoButton className="whitespace-nowrap font-medium text-brand-violet underline-offset-2 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-violet">
      Book a free call →
    </DemoButton>
  );
}

/** One full run of the roll call. `hidden` copies are for the seamless loop only. */
function Sequence({ hidden }: { hidden: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center whitespace-nowrap"
    >
      {roles.map((role) => (
        <li key={role} className="flex items-center">
          {role}
          <Spark />
        </li>
      ))}
      <li className="flex items-center">
        {hidden ? (
          <span className="font-medium text-brand-violet">Book a free call →</span>
        ) : (
          <CtaLink />
        )}
        <Spark />
      </li>
    </ul>
  );
}

/**
 * Slim roll-call strip above the header on every page. It scrolls away with the page
 * (the header below stays sticky). The loop is CSS only, so there is no layout shift.
 * Hover or keyboard focus pauses it. With reduced motion it becomes a static line.
 */
export default function RollCallMarquee() {
  return (
    <div
      role="region"
      aria-label="What your AI team does"
      className="rollcall h-9 overflow-hidden border-b border-border bg-violet-tint text-[13px] leading-9 text-charcoal sm:text-sm"
    >
      {/* Moving version */}
      <div className="rollcall-track flex w-max motion-reduce:hidden">
        {/* The same run is repeated so the loop never shows a gap, even on very wide screens. */}
        <div className="flex shrink-0">
          <Sequence hidden={false} />
          <Sequence hidden />
        </div>
        <div aria-hidden="true" className="flex shrink-0">
          <Sequence hidden />
          <Sequence hidden />
        </div>
      </div>

      {/* Static version for people who prefer reduced motion */}
      <div className="hidden h-9 items-center justify-center px-4 motion-reduce:flex">
        <p className="min-w-0 truncate">{roles.slice(0, 7).join("  ✦  ")}</p>
        <Spark />
        <CtaLink />
      </div>
    </div>
  );
}
