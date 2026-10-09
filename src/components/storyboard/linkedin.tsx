import {
  HeaderPill,
  MonitorFrame,
  StatusPill,
  at,
  freshRow,
} from "@/components/storyboard/shared";
import { CountUp } from "@/components/storyboard/client";

type Stage = "Meeting booked" | "Replied" | "Connected";

const stats = [
  { label: "Connections sent", to: 400 },
  { label: "Accepted", to: 168 },
  { label: "Replies", to: 52 },
  { label: "Meetings", to: 14 },
];

const rows: {
  name: string;
  role: string;
  company: string;
  stage: Stage;
  fresh?: boolean;
}[] = [
  {
    name: "James Miller",
    role: "Head of Operations",
    company: "Northbridge Logistics",
    stage: "Meeting booked",
    fresh: true,
  },
  { name: "Priya Nair", role: "Founder", company: "Bloom Wellness", stage: "Replied" },
  { name: "Tom Hughes", role: "Sales Director", company: "Clearpath Software", stage: "Meeting booked" },
  { name: "Arjun Malhotra", role: "CEO", company: "Urbanstack Realty", stage: "Connected" },
  { name: "Sarah Collins", role: "Marketing Head", company: "Fernway Studios", stage: "Replied" },
];

const outreachGrid =
  "@lg:grid @lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_minmax(0,1.15fr)_minmax(96px,0.95fr)] @lg:gap-2";

function stageTone(stage: Stage) {
  if (stage === "Meeting booked") return "solid" as const;
  if (stage === "Replied") return "violet" as const;
  return "grey" as const;
}

/**
 * Sample dashboard for LinkedIn outreach: this month's numbers and a short pipeline table.
 * Fictional names and companies. No LinkedIn logo or colours.
 */
export function OutreachDashboard() {
  return (
    <MonitorFrame
      label="Example dashboard: outreach this month"
      menu={["Dashboard", "Prospects", "Messages", "Meetings", "Settings"]}
      active="Meetings"
      heading="Outreach this month"
      pill={<HeaderPill>14 meetings booked</HeaderPill>}
    >
      <div className="mb-2.5 grid grid-cols-2 gap-1.5 @lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-violet-tint px-2 py-1.5">
            <p className="truncate text-[9px] text-muted-strong @lg:text-[10px]">{stat.label}</p>
            <p className="font-heading text-sm font-extrabold leading-tight text-charcoal @lg:text-base">
              <CountUp to={stat.to} />
            </p>
          </div>
        ))}
      </div>
      <div
        className={`hidden border-b border-border px-1.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted ${outreachGrid}`}
      >
        <span>Name</span>
        <span>Role</span>
        <span>Company</span>
        <span>Stage</span>
      </div>
      <ul>
        {rows.map((row) => (
          <li
            key={row.name}
            style={row.fresh ? at(2000) : undefined}
            className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-border px-0.5 py-1.5 text-[10px] last:border-b-0 @lg:py-2 @lg:text-[11px] ${outreachGrid} ${
              row.fresh ? freshRow : ""
            }`}
          >
            <span className="order-1 min-w-0 flex-1 truncate font-semibold text-charcoal @lg:flex-none">
              {row.name}
            </span>
            <span className="order-2 @lg:order-4">
              <StatusPill tone={stageTone(row.stage)} dot={row.fresh}>
                {row.stage}
              </StatusPill>
            </span>
            <span className="order-3 w-full truncate text-muted-strong @lg:hidden">
              {row.role} · {row.company}
            </span>
            <span className="order-3 hidden min-w-0 truncate text-muted-strong @lg:order-2 @lg:block">
              {row.role}
            </span>
            <span className="order-4 hidden min-w-0 truncate text-muted-strong @lg:order-3 @lg:block">
              {row.company}
            </span>
          </li>
        ))}
      </ul>
    </MonitorFrame>
  );
}
