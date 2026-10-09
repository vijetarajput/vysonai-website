import ServiceScene from "@/components/ServiceScene";
import { PhoneShell, SparkleIcon, cssVars } from "@/components/showcase/parts";

/** Delay (ms) before an element appears, as a CSS variable for .ss-in. */
const at = (ms: number) => cssVars({ "--d": `${ms}ms` });

const chat: { who: "customer" | "assistant"; text: string }[] = [
  { who: "customer", text: "Are you open on Sunday? How much is a haircut?" },
  {
    who: "assistant",
    text: "Hi! 👋 Yes, we're open Sunday 10 AM to 7 PM. A haircut is ₹499. Would you like to book?",
  },
  { who: "customer", text: "Yes, 5 PM please" },
  { who: "assistant", text: "Done! ✅ You're booked for Sunday at 5 PM. See you then!" },
];

/**
 * Hero picture for /services/whatsapp-automation: a salon chat on a phone, messages appear one
 * by one. Sample content only, no app logos.
 */
export default function WhatsAppScene() {
  return (
    <ServiceScene
      badges={[
        {
          content: (
            <>
              <span aria-hidden="true">⚡</span> Replied in 2 seconds
            </>
          ),
          className: "right-3 top-2",
          delay: 2300,
          bob: 900,
        },
        {
          content: (
            <>
              <span aria-hidden="true">📅</span> Booking confirmed
            </>
          ),
          className: "bottom-2 left-3",
          delay: 4100,
        },
      ]}
    >
      <div className="h-[410px]">
        <PhoneShell label="Example: a WhatsApp assistant answering a customer and booking a haircut">
          <div className="flex items-center gap-2 bg-brand-violet px-3 pb-2.5 pt-8 text-white">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-brand-violet"
            >
              G
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[13px] font-bold">Glow Studio Salon</span>
              <span className="block text-[10px] text-white/80">10:47 PM</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2 bg-violet-tint px-3 py-2.5">
            <p className="mx-auto rounded-full bg-white px-2.5 py-0.5 text-[10px] font-medium text-muted-strong shadow-soft">
              Today · 10:47 PM
            </p>
            {chat.map((m, i) =>
              m.who === "customer" ? (
                <div key={i} className="ss-in max-w-[86%]" style={at(500 + i * 900)}>
                  <p className="rounded-2xl rounded-tl-md border border-border bg-white px-3 py-1.5 text-[12px] leading-snug text-charcoal">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={i} className="ss-in ml-auto max-w-[90%]" style={at(500 + i * 900)}>
                  <p className="rounded-2xl rounded-tr-md bg-brand-violet px-3 py-1.5 text-[12px] leading-snug text-white">
                    <span className="mr-1 inline-block align-[-1px]">
                      <SparkleIcon size={11} />
                    </span>
                    {m.text}
                  </p>
                </div>
              ),
            )}
          </div>
          <div aria-hidden="true" className="border-t border-border bg-white px-3 py-1.5">
            <div className="rounded-full bg-gray-100 px-3 py-1 text-[11px] text-muted">Type a message</div>
          </div>
        </PhoneShell>
      </div>
    </ServiceScene>
  );
}