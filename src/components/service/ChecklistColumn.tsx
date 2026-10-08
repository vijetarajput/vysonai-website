function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Left-aligned H2 and a compact check list with thin dividers (no boxes). */
export default function ChecklistColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <>
      <h2>{title}</h2>
      <ul className="section-gap divide-y divide-border border-y border-border">
        {items.map((text) => (
          <li key={text} className="flex items-start gap-3 py-3.5">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-tint text-brand-violet">
              <CheckIcon />
            </span>
            <span className="font-medium leading-snug text-charcoal">{text}</span>
          </li>
        ))}
      </ul>
    </>
  );
}