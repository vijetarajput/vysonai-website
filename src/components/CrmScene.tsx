import ServiceScene from "@/components/ServiceScene";
import { BrowserFrame } from "@/components/showcase/parts";
import { at } from "@/components/storyboard/shared";

const customers = [
  { initials: "AK", name: "Amit Kumar", source: "WhatsApp", last: "3 days ago" },
  { initials: "ST", name: "Sophie Turner", source: "Call", last: "1 week ago" },
  { initials: "NJ", name: "Neha Joshi", source: "Website", last: "30 days ago" },
  { initials: "RP", name: "Rakesh Patel", source: "Walk-in", last: "Yesterday" },
];

/**
 * Hero picture for /services/crm: a short customer list, then a follow-up reminder. Sample only.
 */
export default function CrmScene() {
  return (
    <ServiceScene
      badges={[
        {
          content: (
            <>
              <span aria-hidden="true">🔔</span> 5 follow-ups due today
            </>
          ),
          className: "right-3 top-2",
          delay: 900,
          bob: 900,
        },
        {
          content: (
            <>
              <span aria-hidden="true">📥</span> New customer from WhatsApp
            </>
          ),
          className: "bottom-2 left-3",
          delay: 2800,
        },
      ]}
    >
      <div className="h-[410px] w-full max-w-[560px]">
        <BrowserFrame label="Example: a CRM customer list with a follow-up reminder" address="app.vysonai.com/customers">
          <div className="relative flex h-full flex-col bg-white p-3">
            <p className="font-heading text-[13px] font-bold text-charcoal">Customers</p>
            <ul className="mt-2 space-y-1.5">
              {customers.map((row) => (
                <li
                  key={row.name}
                  className="flex items-center gap-2 rounded-xl border border-border px-2.5 py-1.5"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-tint text-[11px] font-bold text-brand-violet"
                  >
                    {row.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-semibold text-charcoal">{row.name}</span>
                    <span className="block text-[10px] text-muted">{row.last}</span>
                  </span>
                  <span className="rounded-full bg-violet-tint px-2 py-0.5 text-[10px] font-semibold text-brand-violet">
                    {row.source}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="ss-in absolute inset-x-4 bottom-4 rounded-2xl border border-brand-violet/20 bg-white p-3 shadow-[0_18px_40px_-16px_rgb(31_41_55/0.4)]"
              style={at(1600)}
            >
              <p className="text-[13px] font-semibold leading-snug text-charcoal">
                <span aria-hidden="true">🔔 </span>
                Call Amit today. He asked for a quote 3 days ago.
              </p>
              <p className="mt-2.5 flex gap-2">
                <span className="rounded-full bg-brand-violet px-3 py-1 text-[11px] font-semibold text-white">
                  Call now
                </span>
                <span className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold text-charcoal">
                  Later
                </span>
              </p>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </ServiceScene>
  );
}
