import ServiceIcon from "@/components/ServiceIcon";
import ServiceScene from "@/components/ServiceScene";
import { BrowserFrame } from "@/components/showcase/parts";
import { at } from "@/components/storyboard/shared";

/**
 * Hero picture for /services/linkedin-outreach: a prospect, a connection, a personal message
 * and a booked meeting. Sample only. Generic professional-network style, no LinkedIn logo.
 */
export default function LinkedInScene() {
  return (
    <ServiceScene
      badges={[
        {
          content: (
            <>
              <span aria-hidden="true">🎯</span> Ideal clients only
            </>
          ),
          className: "right-3 top-2",
          delay: 900,
          bob: 900,
        },
        {
          content: (
            <>
              <span aria-hidden="true">📅</span> Meeting booked
            </>
          ),
          className: "bottom-2 left-3",
          delay: 4200,
        },
      ]}
    >
      <div className="h-[410px] w-full max-w-[560px]">
        <BrowserFrame
          label="Example: finding an ideal client, sending a personal message and booking a meeting"
          address="app.vysonai.com/outreach"
        >
          <div className="flex h-full flex-col gap-0.5 overflow-hidden bg-violet-tint/50 p-1.5">
            <div
              className="ss-in rounded-2xl border border-border bg-white p-2 shadow-soft"
              style={at(200)}
            >
              <div className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-violet text-xs font-bold text-white"
                >
                  JM
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="font-heading text-[12px] font-bold text-charcoal">James Miller</span>
                    <span className="rounded-full bg-violet-tint px-2 py-0.5 text-[10px] font-semibold text-brand-violet">
                      Ideal client ✓
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[10px] leading-snug text-muted-strong">
                    Head of Operations · Northbridge Logistics · London
                  </span>
                </span>
              </div>
            </div>

            <p
              className="ss-in self-start rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-brand-violet shadow-soft"
              style={at(900)}
            >
              Connection accepted
            </p>

            <div className="ss-in ml-auto max-w-[94%]" style={at(1500)}>
              <p className="mb-0.5 text-right text-[10px] font-semibold text-muted-strong">You</p>
              <p className="rounded-2xl rounded-tr-md bg-brand-violet px-2.5 py-1.5 text-[11px] leading-snug text-white">
                Hi James, I help logistics companies like Northbridge save hours of manual reporting
                every week. Could we have a quick 15-minute chat? Would Thursday at 11 AM or Monday at
                3 PM suit you?
              </p>
            </div>

            <div className="ss-in max-w-[90%]" style={at(2400)}>
              <p className="mb-0.5 text-[10px] font-semibold text-muted-strong">James</p>
              <p className="rounded-2xl rounded-tl-md border border-border bg-white px-2.5 py-1.5 text-[11px] leading-snug text-charcoal">
                Monday at 3 PM works for me.
              </p>
            </div>

            <div className="ss-in ml-auto max-w-[94%]" style={at(3200)}>
              <p className="mb-0.5 text-right text-[10px] font-semibold text-muted-strong">You</p>
              <p className="rounded-2xl rounded-tr-md bg-brand-violet px-2.5 py-1.5 text-[11px] leading-snug text-white">
                Great! I&apos;m sending you a calendar invite for Monday at 3 PM. Speak then 👍
              </p>
            </div>

            <div
              className="ss-in rounded-2xl border border-brand-violet/20 bg-white px-2.5 py-2 shadow-soft"
              style={at(4000)}
            >
              <p className="flex items-center gap-2 text-[11px] font-semibold leading-snug text-charcoal">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-tint text-brand-violet">
                  <ServiceIcon name="calendar" size={13} />
                </span>
                Meeting booked · Monday, 3:00 PM · James Miller
              </p>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </ServiceScene>
  );
}
