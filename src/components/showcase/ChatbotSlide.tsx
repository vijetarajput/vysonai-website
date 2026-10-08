"use client";

import { useChatSequence } from "@/components/showcase/hooks";
import { BrowserFrame, ChatRow, type SlideProps } from "@/components/showcase/parts";

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
    text: "बिल्कुल! आपका नाम और नंबर बता दीजिए, हम आपको आज शाम 6 बजे का समय भेज देते हैं।",
  },
] as const;

const typingMs = [500, 1000, 450, 1000];

const products = ["1.5 Ton AC", "Smart TV", "Refrigerator"];

export default function ChatbotSlide({ active, live }: SlideProps) {
  const { shown, typingIndex } = useChatSequence(active, live, typingMs);

  return (
    <div className="mx-auto h-full w-full max-w-[460px]">
      <BrowserFrame label="Example website with an AI chatbot for Patel Electronics" address="patel-electronics.example">
        {/* The shop website behind the chat widget */}
        <div aria-hidden="true" className="absolute inset-0 bg-white p-3">
          <div className="flex items-center justify-between">
            <span className="font-heading text-xs font-bold text-charcoal">Patel Electronics</span>
            <span className="flex gap-3 text-[10px] text-muted">
              <span>Home</span>
              <span>Shop</span>
              <span>Contact</span>
            </span>
          </div>
          <div className="mt-3 rounded-xl bg-violet-tint px-3 py-3">
            <p className="font-heading text-sm font-bold text-charcoal">Summer Sale</p>
            <p className="text-[10px] text-muted-strong">Cooling for every home</p>
          </div>
          <ul className="mt-3 grid grid-cols-3 gap-2">
            {products.map((name) => (
              <li key={name} className="rounded-lg border border-border p-2">
                <div className="h-14 rounded-md bg-violet-tint" />
                <p className="mt-1.5 text-[10px] font-medium text-charcoal">{name}</p>
                <div className="mt-1 h-1.5 w-8 rounded-full bg-border" />
              </li>
            ))}
          </ul>
        </div>

        {/* Chat widget */}
        <div className="absolute bottom-3 right-3 flex h-[410px] w-[min(320px,calc(100%-24px))] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_18px_44px_-12px_rgb(31_41_55/0.4)]">
          <div className="flex shrink-0 items-center gap-2 bg-brand-violet px-3 py-2.5 text-white">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold"
            >
              AI
            </span>
            <p className="min-w-0 flex-1 truncate text-[12px] font-semibold">
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
                  maxWidth="max-w-[86%]"
                  bubbleClass={`px-3 py-1.5 ${
                    outgoing
                      ? "rounded-2xl rounded-tr-sm bg-brand-violet text-white"
                      : "rounded-2xl rounded-tl-sm bg-violet-tint text-charcoal"
                  }`}
                  typingClass={outgoing ? "bg-brand-violet/15" : "bg-violet-tint"}
                >
                  <p className="text-[12px] leading-[1.6]">{m.text}</p>
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
    </div>
  );
}
