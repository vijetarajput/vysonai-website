type Message = {
  text: string;
  time: string;
};

type PhoneMockupProps = {
  businessName?: string;
  messages?: Message[];
  className?: string;
};

const defaultMessages: Message[] = [
  {
    text: "Hi Rahul, we missed you at the gym this week! 💪 Your next workout is waiting.",
    time: "10:42 AM",
  },
  {
    text: "Your membership renews in 5 days. Reply YES to renew.",
    time: "10:42 AM",
  },
];

function DoubleTick() {
  return (
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Read"
      role="img"
      className="text-brand-blue"
    >
      <path d="M1 6l3 3 6-7.5" />
      <path d="M6 8.5l1 1L14 1.5" />
    </svg>
  );
}

/**
 * Pure HTML/CSS phone with a WhatsApp-style chat. No images.
 * The soft brand-gradient glow behind it is one of the few places the
 * gradient is used.
 */
export default function PhoneMockup({
  businessName = "Hardcore Fitness",
  messages = defaultMessages,
  className = "",
}: PhoneMockupProps) {
  const initials = businessName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`relative mx-auto w-full max-w-[300px] ${className}`}>
      {/* brand gradient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-brand-gradient-diagonal opacity-30 blur-3xl"
      />

      {/* phone frame */}
      <figure
        aria-label={`Example WhatsApp conversation from ${businessName}`}
        className="relative overflow-hidden rounded-[2.5rem] border-[8px] border-[#d1d5db] bg-white shadow-[0_24px_60px_-20px_rgb(31_41_55/0.35)]"
      >
        {/* speaker / camera pill */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#d1d5db]"
        />

        {/* chat header */}
        <div className="flex items-center gap-3 border-b border-border bg-white px-4 pb-3 pt-9">
          <div
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-violet text-xs font-semibold text-white"
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight text-charcoal">
              {businessName}
            </p>
            <p className="text-xs text-muted">Business account</p>
          </div>
        </div>

        {/* messages */}
        <div className="flex min-h-[340px] flex-col gap-3 bg-violet-tint px-3 py-5">
          {messages.map((m) => (
            <div
              key={m.text}
              className="max-w-[88%] self-start rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm"
            >
              <p className="text-[13px] leading-snug text-charcoal">{m.text}</p>
              <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted">
                <span>{m.time}</span>
                <DoubleTick />
              </div>
            </div>
          ))}
        </div>

        {/* input bar */}
        <div
          aria-hidden="true"
          className="flex items-center gap-2 border-t border-border bg-white px-3 py-3"
        >
          <div className="h-8 flex-1 rounded-full bg-violet-tint" />
          <div className="h-8 w-8 rounded-full bg-brand-violet" />
        </div>
      </figure>
    </div>
  );
}
