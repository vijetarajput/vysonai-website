"use client";

import { useChatSequence } from "@/components/showcase/hooks";
import { BrowserFrame, ChatRow, FloatCard, type SlideProps } from "@/components/showcase/parts";

// Sample conversation. "Patel Electronics" is a fictional shop.
const messages = [
  {
    from: "customer",
    text: "क्या आपके पास 1.5 टन का AC है? कीमत क्या है? कृपया हिंदी में जवाब दें।",
  },
  {
    from: "bot",
    text: "जी हाँ! 1.5 टन AC ₹32,000 से शुरू होते हैं। आसान EMI भी उपलब्ध है। दुकान सुबह 10 से रात 9 बजे तक खुली है। 😊",
  },
  { from: "customer", text: "क्या आज डेमो देख सकते हैं?" },
  {
    from: "bot",
    text: "बिल्कुल! अपना नाम और नंबर बता दीजिए, हम आपको आज शाम 6 बजे का समय भेज देंगे।",
  },
] as const;

const typingMs = [500, 900, 350, 800];

const products = ["1.5 Ton AC", "Smart TV", "Refrigerator", "Washing Machine"];

export default function ChatbotSlide({ active, live }: SlideProps) {
  const { shown, typingIndex } = useChatSequence(active, live, typingMs);

  return (
    <div className="relative mx-auto h-full w-full max-w-[640px]">
      <BrowserFrame label="Example website with an AI chatbot for Patel Electronics" address="patel-electronics.example">
        {/* The shop website behind the chat widget */}
        <div aria-hidden="true" className="absolute inset-0 bg-white p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <span className="font-heading text-xs font-bold text-charcoal sm:text-sm">Patel Electronics</span>
            <span className="flex gap-3 text-[10px] text-muted sm:text-xs">
              <span>Home</span>
              <span>Shop</span>
              <span>Contact</span>
            </span>
          </div>
          <div className="mt-3 rounded-xl bg-violet-tint px-3 py-3 sm:max-w-[55%] sm:py-5">
            <p className="font-heading text-sm font-bold text-charcoal sm:text-lg">Summer Sale</p>
            <p className="text-[10px] text-muted-strong sm:text-xs">Cooling for every home</p>
            <div className="mt-2 h-5 w-16 rounded-full bg-brand-violet/80 sm:mt-3 sm:h-6 sm:w-20" />
          </div>
          <ul className="mt-3 grid grid-cols-3 gap-2 sm:max-w-[55%] sm:grid-cols-2">
            {products.map((name, index) => (
              <li
                key={name}
                className={`rounded-lg border border-border p-2 ${index === 3 ? "hidden sm:block" : ""}`}
              >
                <div className="h-12 rounded-md bg-violet-tint sm:h-16" />
                <p className="mt-1.5 text-[10px] font-medium text-charcoal sm:text-xs">{name}</p>
                <div className="mt-1 h-1.5 w-8 rounded-full bg-border" />
              </li>
            ))}
          </ul>
        </div>

        {/* Chat widget */}
        <div className="absolute bottom-3 right-3 flex h-[min(410px,calc(100%-24px))] w-[min(330px,calc(100%-24px))] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_18px_44px_-12px_rgb(31_41_55/0.4)]">
          <div className="flex shrink-0 items-center gap-2 bg-brand-violet px-3 py-2.5 text-white">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold"
            >
              AI
            </span>
            <p className="min-w-0 flex-1 truncate text-[12px] font-semibold sm:text-[13px]">
              Patel Electronics · AI Assistant
            </p>
            <span className="flex shrink-0 items-center gap-1 text-[10px] font-medium">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />
              Online
            </span>
          </div>

          <div lang="hi" className="font-hindi flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-3 py-3">
            {messages.map((m, i) => {
              const outgoing = m.from === "customer";
              return (
                <ChatRow
                  key={m.text}
                  side={outgoing ? "right" : "left"}
                  visible={!live || i < shown}
                  typing={live && typingIndex === i}
                  maxWidth="max-w-[88%]"
                  bubbleClass={`px-3 py-1.5 ${
                    outgoing
                      ? "rounded-2xl rounded-tr-sm bg-brand-violet text-white"
                      : "rounded-2xl rounded-tl-sm bg-violet-tint text-charcoal"
                  }`}
                  typingClass={outgoing ? "bg-brand-violet/15" : "bg-violet-tint"}
                >
                  <p className="text-[12px] leading-[1.6] sm:text-[13px]">{m.text}</p>
                </ChatRow>
              );
            })}
          </div>

          <div
            aria-hidden="true"
            className="flex shrink-0 items-center gap-2 border-t border-border px-3 py-2"
          >
            <div className="h-7 flex-1 rounded-full bg-violet-tint" />
            <div className="h-7 w-7 rounded-full bg-brand-violet" />
          </div>
        </div>
      </BrowserFrame>

      <FloatCard delay={1600} bob={600} wide className="right-14 top-3">
        <span aria-hidden="true">🌙</span> Answered at 11:48 PM
      </FloatCard>
      <FloatCard delay={4200} wide className="bottom-1 left-0 sm:-left-3 sm:bottom-12">
        <span aria-hidden="true">🎯</span> New lead captured
      </FloatCard>
    </div>
  );
}
