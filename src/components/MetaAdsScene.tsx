import ServiceScene from "@/components/ServiceScene";
import { PhoneShell } from "@/components/showcase/parts";
import { at } from "@/components/storyboard/shared";
import { SponsoredPost } from "@/components/storyboard/meta-ads";

/**
 * Hero picture for /services/meta-ads: a generic sponsored post, then an enquiry and an instant
 * reply. Sample only. No platform logos.
 */
export default function MetaAdsScene() {
  return (
    <ServiceScene
      badges={[
        {
          content: (
            <>
              <span aria-hidden="true">📣</span> Ad live near you
            </>
          ),
          className: "right-3 top-2",
          delay: 900,
          bob: 900,
        },
        {
          content: (
            <>
              <span aria-hidden="true">💬</span> New enquiries every day
            </>
          ),
          className: "bottom-2 left-3",
          delay: 2800,
        },
      ]}
    >
      <div className="h-[410px]">
        <PhoneShell label="Example: a sponsored post, then an enquiry and an instant reply">
          <div className="relative flex h-full flex-col bg-[#f8f7fc]">
            <div aria-hidden="true" className="h-7 shrink-0" />
            <div className="min-h-0 flex-1 overflow-hidden px-2.5 pb-3">
              <SponsoredPost />
            </div>

            <div className="absolute inset-x-2.5 top-8 z-10 space-y-1.5">
              <div
                className="ss-in rounded-xl border border-brand-violet/20 bg-white px-3 py-2 text-[12px] font-semibold text-charcoal shadow-[0_12px_28px_-12px_rgb(31_41_55/0.4)]"
                style={at(1400)}
              >
                New enquiry from your ad
              </div>
              <div className="ss-in max-w-[92%]" style={at(2000)}>
                <p className="rounded-2xl rounded-tl-md border border-border bg-white px-3 py-1.5 text-[12px] leading-snug text-charcoal shadow-soft">
                  Hi! Is the offer valid this weekend?
                </p>
              </div>
              <div className="ss-in ml-auto max-w-[94%]" style={at(2700)}>
                <p className="rounded-2xl rounded-tr-md bg-brand-violet px-3 py-1.5 text-[12px] leading-snug text-white shadow-soft">
                  Yes! 😊 Want me to book you for Saturday?
                </p>
              </div>
            </div>
          </div>
        </PhoneShell>
      </div>
    </ServiceScene>
  );
}
