import ServiceScene from "@/components/ServiceScene";
import { BrowserFrame } from "@/components/showcase/parts";
import { ChatWidget } from "@/components/storyboard/chatbot";
import { at } from "@/components/storyboard/shared";

const chat: { who: "visitor" | "assistant"; text: string }[] = [
  { who: "visitor", text: "Do you have weekend appointments?" },
  {
    who: "assistant",
    text: "Yes! We're open Saturday 10 AM to 4 PM. Shall I book you, or ask the team to call you?",
  },
  { who: "visitor", text: "Call me tomorrow, please" },
  { who: "assistant", text: "Sure! What's your name and number?" },
  { who: "visitor", text: "Rohit, 98765 43210" },
];

/**
 * Hero picture for /services/chatbot: a clinic website with the assistant chat open, then a
 * saved lead. Sample content only.
 */
export default function ChatbotScene() {
  return (
    <ServiceScene
      badges={[
        {
          content: (
            <>
              <span aria-hidden="true">🌙</span> Answered at 11:48 PM
            </>
          ),
          className: "right-3 top-2",
          delay: 1300,
          bob: 900,
        },
        {
          content: (
            <>
              <span aria-hidden="true">🎯</span> New lead captured
            </>
          ),
          className: "bottom-2 left-3",
          delay: 4300,
        },
      ]}
    >
      <div className="h-[410px] w-full max-w-[560px]">
        <BrowserFrame
          label="Example: a website assistant chatting with a visitor and saving their number"
          address="brightsmiledental.com"
        >
          <div className="relative flex h-full flex-col bg-white">
            {/* Simple clinic homepage, sitting behind the chat */}
            <div aria-hidden="true" className="border-b border-border px-4 py-2.5">
              <p className="font-heading text-[13px] font-bold text-brand-violet">Bright Smile Dental</p>
            </div>
            <div aria-hidden="true" className="px-4 pt-4">
              <p className="h-3 w-2/3 rounded-full bg-charcoal/80" />
              <p className="mt-2 h-2 w-1/2 rounded-full bg-gray-200" />
              <p className="mt-4 h-8 w-28 rounded-full bg-brand-violet/90" />
            </div>

            <div className="absolute bottom-2 right-2 z-10 w-[min(100%-16px,248px)] sm:bottom-3 sm:right-3">
              <ChatWidget
                messages={chat}
                extra={
                  <div
                    className="ss-in mt-1.5 rounded-xl border border-brand-violet/20 bg-violet-tint px-2.5 py-1.5 text-[11px] font-semibold text-charcoal"
                    style={at(4000)}
                  >
                    Rohit · +91 98765 43210 · <span className="text-brand-violet">✓ Saved</span>
                  </div>
                }
              />
            </div>
          </div>
        </BrowserFrame>
      </div>
    </ServiceScene>
  );
}
