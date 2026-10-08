"use client";

import { useChatSequence, useElapsedSeconds } from "@/components/showcase/hooks";
import {
  ChatRow,
  cssVars,
  FloatCard,
  PersonIcon,
  PhoneShell,
  SparkleIcon,
  type SlideProps,
} from "@/components/showcase/parts";

// Sample call transcript. Everything here is fictional.
const messages = [
  { from: "caller", text: "Hello, kal subah ka appointment mil sakta hai?" },
  { from: "ai", text: "Ji bilkul! Kal 10 baje ya 11:30 baje, kaunsa time theek rahega?" },
  { from: "caller", text: "11:30 theek hai." },
  {
    from: "ai",
    text: "Done! Kal 11:30 ka appointment confirm hai. Details WhatsApp pe bhej rahi hoon. 🙏",
  },
] as const;

const typingMs = [500, 800, 350, 800];

const waveHeights = [0.4, 0.8, 0.55, 1, 0.65, 0.9, 0.45, 0.75, 0.5];

export default function ReceptionistSlide({ active, live }: SlideProps) {
  const { shown, typingIndex } = useChatSequence(active, live, typingMs);
  const elapsed = useElapsedSeconds(active, live);
  const total = 42 + (live ? elapsed : 0);
  const clock = `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;

  return (
    <div className="relative mx-auto h-full w-full max-w-[470px]">
      <PhoneShell label="Example phone call answered by the AI receptionist">
        {/* Call status */}
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 pb-2.5 pt-8">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-charcoal sm:text-xs">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-600" />
            Live call · <span className="tabular-nums">{clock}</span>
          </p>
          <div aria-hidden="true" className="flex h-5 items-center gap-[3px]">
            {waveHeights.map((h, i) => (
              <span
                key={i}
                className="vy-wave h-full w-[3px] rounded-full bg-brand-violet"
                style={cssVars({ transform: `scaleY(${h})`, "--d": `${i * 80}ms` })}
              />
            ))}
          </div>
        </div>

        {/* The two sides of the call */}
        <div className="flex items-start justify-between px-5 pb-2 pt-3">
          <div className="flex w-24 flex-col items-center gap-1">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-violet text-white"
            >
              <SparkleIcon />
            </span>
            <span className="text-[10px] font-semibold text-charcoal sm:text-[11px]">AI Receptionist</span>
          </div>
          <div className="flex w-24 flex-col items-center gap-1">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d1d5db] text-white"
            >
              <PersonIcon />
            </span>
            <span className="text-[10px] font-semibold text-charcoal sm:text-[11px]">Caller</span>
          </div>
        </div>

        {/* Transcript */}
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 bg-violet-tint px-3 py-3">
          {messages.map((m, i) => {
            const caller = m.from === "caller";
            return (
              <ChatRow
                key={m.text}
                side={caller ? "right" : "left"}
                visible={!live || i < shown}
                typing={live && typingIndex === i}
                maxWidth="max-w-[86%]"
                bubbleClass={`px-3 py-1.5 ${
                  caller
                    ? "rounded-2xl rounded-tr-sm bg-white"
                    : "rounded-2xl rounded-tl-sm bg-brand-violet text-white"
                }`}
                typingClass={caller ? "bg-white" : "bg-brand-violet/15"}
              >
                <p className="text-[12px] leading-snug xl:text-[13px]">{m.text}</p>
              </ChatRow>
            );
          })}
        </div>
      </PhoneShell>

      <FloatCard delay={4100} className="left-0 top-0 sm:left-[calc(100%-127px)] sm:top-24 xl:left-[calc(100%-107px)]">
        <span aria-hidden="true">✅</span> Appointment booked
      </FloatCard>
      <FloatCard delay={4700} bob={700} className="bottom-3 left-0 sm:left-auto sm:right-[calc(100%-127px)] sm:bottom-6 xl:right-[calc(100%-107px)]">
        <span aria-hidden="true">📝</span> Call summary sent to owner
      </FloatCard>
    </div>
  );
}
