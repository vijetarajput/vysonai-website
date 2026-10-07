import BrandName from "@/components/BrandName";

const rows = [
  {
    topic: "Reminders",
    manual: "Depends on staff remembering",
    automated: "Sent automatically, on time",
  },
  {
    topic: "Missed follow-ups",
    manual: "Common when staff is busy",
    automated: "Every customer gets followed up",
  },
  {
    topic: "Customer records",
    manual: "Scattered in registers and Excel",
    automated: "All in one dashboard",
  },
  {
    topic: "Owner's view",
    manual: "No clear picture",
    automated: "Weekly report every Monday",
  },
  {
    topic: "Staff time",
    manual: "Hours of calls every week",
    automated: "Staff focuses on customers",
  },
];

export default function ComparisonTable() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-center">
          Manual Follow-Up vs <BrandName />
        </h2>

        {/* Desktop and tablet: a real table */}
        <div className="mt-10 hidden overflow-hidden rounded-3xl border border-border shadow-soft md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th scope="col" className="w-1/4 bg-violet-tint px-6 py-4 text-sm font-semibold text-muted-strong">
                  <span className="sr-only">What you look at</span>
                </th>
                <th scope="col" className="bg-violet-tint px-6 py-4 font-heading text-base font-semibold text-muted-strong">
                  Manual follow-up
                </th>
                <th scope="col" className="bg-violet-tint px-6 py-4 font-heading text-base font-semibold">
                  <BrandName />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.topic} className="border-t border-border">
                  <th scope="row" className="px-6 py-4 font-heading text-base font-semibold text-charcoal">
                    {row.topic}
                  </th>
                  <td className="px-6 py-4 text-muted-strong">{row.manual}</td>
                  <td className="px-6 py-4 font-medium text-charcoal">{row.automated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: one stacked card per row */}
        <ul className="mt-8 space-y-4 md:hidden">
          {rows.map((row) => (
            <li
              key={row.topic}
              className="rounded-2xl border border-border bg-white p-5 shadow-soft"
            >
              <h3 className="text-lg">{row.topic}</h3>
              <dl className="mt-3 space-y-3 text-base">
                <div>
                  <dt className="text-sm font-semibold text-muted-strong">Manual follow-up</dt>
                  <dd className="text-muted-strong">{row.manual}</dd>
                </div>
                <div className="rounded-xl bg-violet-tint px-3 py-2">
                  <dt className="text-sm font-semibold">
                    <BrandName />
                  </dt>
                  <dd className="font-medium text-charcoal">{row.automated}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
