import ServiceIcon from "@/components/ServiceIcon";
import ServiceScene from "@/components/ServiceScene";
import { PhoneShell, SparkleIcon, cssVars } from "@/components/showcase/parts";

/** Delay (ms) before an element appears, as a CSS variable for .ss-in / .ss-fill. */
const at = (ms: number) => cssVars({ "--d": `${ms}ms` });

/**
 * Hero picture for /services/ai-receptionist: a small story in three parts.
 * 1) a call comes in, 2) the AI receptionist talks to the caller, 3) the booking appears
 * in a calendar. Sample content only.
 */
export default function ReceptionistScene() {
  return (
    <ServiceScene
      badges={[
        {
          content: (
            <>
              <span aria-hidden="true">📅</span> Booked in your calendar
            </>
          ),
          className: "bottom-2 left-3",
          delay: 3900,
        },
        {
          content: (
            <>
              <span aria-hidden="true">🌙</span> Answered at 11:02 PM
            </>
          ),
          className: "right-3 top-2",
          delay: 1300,
          bob: 900,
        },
      ]}
    >
      <div className="h-[410px]">
        <PhoneShell label="Example: a phone call answered by an AI receptionist, then a booking in the calendar">
          <div className="flex flex-1 flex-col gap-2.5 bg-violet-tint px-3 pb-3 pt-9">
            {/* 1. Incoming call */}
            <div
              className="ss-in flex items-center gap-2.5 rounded-2xl border border-border bg-white px-3 py-2.5 shadow-soft"
              style={at(200)}
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-violet text-sm font-bold text-white"
              >
                S
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-[13px] font-bold text-charcoal">Sarah</span>
                <span className="block text-[11px] text-muted-strong">Incoming call · 11:02 PM</span>
              </span>
              <span
                aria-hidden="true"
                className="ss-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700"
                style={at(600)}
              >
                <ServiceIcon name="phone" size={16} />
              </span>
            </div>

            {/* 2. The conversation */}
            <div className="flex flex-col gap-1.5">
              <div className="ss-in max-w-[88%]" style={at(1100)}>
                <p className="mb-0.5 text-[10px] font-semibold text-muted-strong">Caller</p>
                <p className="rounded-2xl rounded-tl-md border border-border bg-white px-3 py-2 text-[12px] leading-snug text-charcoal">
                  Can I book a check-up tomorrow?
                </p>
              </div>
              <div className="ss-in ml-auto max-w-[92%]" style={at(1900)}>
                <p className="mb-0.5 flex items-center justify-end gap-1 text-[10px] font-semibold text-brand-violet">
                  <SparkleIcon size={10} /> AI receptionist
                </p>
                <p className="rounded-2xl rounded-tr-md bg-brand-violet px-3 py-2 text-[12px] leading-snug text-white">
                  Of course! 11:30 AM is free. Shall I book it?
                </p>
              </div>
            </div>

            {/* 3. The calendar */}
            <div
              className="ss-in mt-auto rounded-2xl border border-border bg-white p-2.5 shadow-soft"
              style={at(2700)}
            >
              <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-charcoal">
                <span className="text-brand-violet">
                  <ServiceIcon name="calendar" size={14} />
                </span>
                Tomorrow
              </p>
              <ul className="space-y-1 text-[11px]">
                <li className="flex items-center gap-2 rounded-lg px-2 py-1 text-muted-strong">
                  <span className="w-14 shrink-0 tabular-nums">11:00 AM</span>
                  <span className="text-muted">Free</span>
                </li>
                <li className="relative overflow-hidden rounded-lg border border-dashed border-brand-violet/40 px-2 py-1">
                  <span aria-hidden="true" className="flex items-center gap-2 text-muted-strong">
                    <span className="w-14 shrink-0 tabular-nums">11:30 AM</span>
                    <span className="text-muted">Free</span>
                  </span>
                  <span
                    className="ss-fill absolute inset-0 flex items-center gap-2 bg-brand-violet px-2 text-white"
                    style={at(3300)}
                  >
                    <span className="w-14 shrink-0 tabular-nums">11:30 AM</span>
                    <span className="truncate font-semibold">Sarah · Check-up</span>
                  </span>
                </li>
                <li className="flex items-center gap-2 rounded-lg px-2 py-1 text-muted-strong">
                  <span className="w-14 shrink-0 tabular-nums">12:00 PM</span>
                  <span className="text-muted">Free</span>
                </li>
              </ul>
            </div>
          </div>
        </PhoneShell>
      </div>
    </ServiceScene>
  );
}
