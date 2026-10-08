const rows = [
  {
    topic: "Customer replies",
    manual: "Late replies, or none after closing time",
    automated: "Instant reply on WhatsApp, day and night",
  },
  {
    topic: "Reminders and follow-ups",
    manual: "Depends on staff remembering",
    automated: "Sent automatically, on time",
  },
  {
    topic: "Website enquiries",
    manual: "Visitors leave without contacting you",
    automated: "Chatbot answers and saves their details",
  },
  {
    topic: "Phone calls",
    manual: "Missed when you are busy",
    automated: "Every call answered, appointments booked",
  },
  {
    topic: "Sales and stock",
    manual: "Scattered in registers and Excel",
    automated: "One dashboard, ask questions in Hindi or English",
  },
  {
    topic: "Your weekly picture",
    manual: "No clear view",
    automated: "Report in your email every Monday",
  },
];

function CrossIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-[5px] shrink-0 text-[#9ca3af]"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-[5px] shrink-0 text-brand-violet"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function ComparisonTable() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <h2>Manual Work vs AI Automation</h2>
          <p className="mt-3 text-muted">Same business. Same team. A very different week.</p>
        </div>

        {/* Desktop and tablet: a real table */}
        <div className="mt-10 hidden overflow-hidden rounded-3xl border border-border shadow-soft md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th scope="col" className="w-[30%] px-6 py-4">
                  <span className="sr-only">What you look at</span>
                </th>
                <th scope="col" className="px-6 py-4 font-heading text-base font-semibold text-muted">
                  Manual work
                </th>
                <th
                  scope="col"
                  className="bg-[#f5f3ff] px-6 py-4 font-heading text-base font-semibold text-brand-violet"
                >
                  With AI automation
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.topic} className="border-t border-border">
                  <th scope="row" className="px-6 py-4 font-heading text-base font-semibold text-charcoal">
                    {row.topic}
                  </th>
                  <td className="px-6 py-4 text-muted">
                    <span className="flex gap-2.5">
                      <CrossIcon />
                      <span>{row.manual}</span>
                    </span>
                  </td>
                  <td className="bg-[#f5f3ff] px-6 py-4 text-charcoal">
                    <span className="flex gap-2.5">
                      <CheckIcon />
                      <span>{row.automated}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: one small card per row (label, manual line, AI line) */}
        <ul className="mt-8 space-y-4 md:hidden">
          {rows.map((row) => (
            <li
              key={row.topic}
              className="rounded-2xl border border-border bg-white p-4 shadow-soft"
            >
              <h3 className="text-lg">{row.topic}</h3>
              <dl className="mt-3 space-y-2 text-base">
                <div>
                  <dt className="sr-only">Manual work</dt>
                  <dd className="flex gap-2.5 px-1 text-muted">
                    <CrossIcon />
                    <span>{row.manual}</span>
                  </dd>
                </div>
                <div className="rounded-xl bg-[#f5f3ff] px-3 py-2.5">
                  <dt className="sr-only">With AI automation</dt>
                  <dd className="flex gap-2.5 text-charcoal">
                    <CheckIcon />
                    <span>{row.automated}</span>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
