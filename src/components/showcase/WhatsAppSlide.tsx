"use client";

import { useChatSequence } from "@/components/showcase/hooks";
import { ChatRow, DoubleTick, PhoneShell, type SlideProps } from "@/components/showcase/parts";

// Sample content. "FitZone Gym" and "Rahul" are fictional.
const messages = [
  {
    from: "business",
    text: "Hi Rahul, we missed you at the gym this week! 💪 Your next workout is waiting.",
    time: "10:42 AM",
  },
  {
    from: "business",
    text: "Your membership renews in 5 days. Reply YES to renew.",
    time: "10:42 AM",
  },
  { from: "member", text: "YES", time: "10:43 AM" },
  {
    from: "business",
    text: "Done! ✅ Membership renewed till 15 March. See you tomorrow, Rahul!",
    time: "10:43 AM",
  },
] as const;

const typingMs = [700, 900, 450, 1000];

export default function WhatsAppSlide({ active, live }: SlideProps) {
  const { shown, typingIndex } = useChatSequence(active, live, typingMs);
  const allShown = !live || shown >= messages.length;

  return (
    <div className="relative mx-auto h-full w-full max-w-[420px]">
      <PhoneShell label="Example WhatsApp conversation from FitZone Gym">
        <div className="flex items-center gap-3 border-b border-border bg-white px-4 pb-3 pt-8">
          <div
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-violet text-xs font-semibold text-white"
          >
            FG
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight text-charcoal">FitZone Gym</p>
            <p className="text-xs text-muted">Business account</p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2 bg-violet-tint px-3 py-3">
          {messages.map((m, i) => {
            const outgoing = m.from === "member";
            return (
              <ChatRow
                key={m.text}
                side={outgoing ? "right" : "left"}
                visible={!live || i < shown}
                typing={live && typingIndex === i}
                maxWidth={outgoing ? "max-w-[60%]" : "max-w-[92%]"}
                bubbleClass={`px-3 py-1.5 shadow-sm ${
                  outgoing
                    ? "rounded-2xl rounded-tr-sm bg-[#ede9fe]"
                    : "rounded-2xl rounded-tl-sm bg-white"
                }`}
                typingClass={outgoing ? "bg-[#ede9fe]" : "bg-white shadow-sm"}
              >
                <p className="text-[12px] leading-[1.4] text-charcoal">{m.text}</p>
                <div className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-muted">
                  <span>{m.time}</span>
                  {outgoing && <DoubleTick className="text-brand-blue" />}
                </div>
              </ChatRow>
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className="flex shrink-0 items-center gap-2 border-t border-border bg-white px-3 py-2.5"
        >
          <div className="h-7 flex-1 rounded-full bg-violet-tint" />
          <div className="h-7 w-7 rounded-full bg-brand-violet" />
        </div>
      </PhoneShell>

      {/* Floating notification, overlapping the phone's top-right corner */}
      <div
        className={`absolute -right-1 top-10 w-[112px] rounded-2xl border border-border bg-white px-3 py-2 text-[11px] font-semibold leading-snug text-charcoal shadow-[0_12px_30px_-8px_rgb(31_41_55/0.3)] transition-[opacity,transform] duration-500 motion-reduce:transition-none ${
          allShown ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        🔔 3 members renewed today
      </div>
    </div>
  );
}
