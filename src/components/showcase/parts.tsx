import type { CSSProperties, ReactNode } from "react";

/** Props every slide receives from the showcase. */
export type SlideProps = {
  /** This slide is the one on screen. */
  active: boolean;
  /** Animations are allowed (false when the visitor prefers reduced motion). */
  live: boolean;
};

export function cssVars(vars: Record<string, string | number>) {
  return vars as CSSProperties;
}

/** Phone body used by the WhatsApp and call-screen slides. Fixed size so nothing shifts. */
export function PhoneShell({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure
      aria-label={label}
      className={`relative mx-auto flex h-[490px] w-[256px] flex-col overflow-hidden rounded-[2.25rem] border-[7px] border-[#d1d5db] bg-white shadow-[0_24px_60px_-20px_rgb(31_41_55/0.35)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-2 z-10 h-3.5 w-16 -translate-x-1/2 rounded-full bg-[#d1d5db]"
      />
      {children}
    </figure>
  );
}

/** Browser window used by the dashboard and chatbot slides. */
export function BrowserFrame({
  label,
  address,
  children,
}: {
  label: string;
  address: string;
  children: ReactNode;
}) {
  return (
    <figure
      aria-label={label}
      className="relative flex h-[490px] w-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_60px_-20px_rgb(31_41_55/0.35)]"
    >
      <div
        aria-hidden="true"
        className="flex h-8 shrink-0 items-center gap-3 border-b border-border bg-violet-tint px-3"
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d1d5db]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d1d5db]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d1d5db]" />
        </div>
        <div className="flex-1 truncate rounded-full bg-white px-3 py-0.5 text-center text-[10px] text-muted">
          {address}
        </div>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </figure>
  );
}

export function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="vy-dot h-1.5 w-1.5 rounded-full bg-muted"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  );
}

/**
 * One chat message. The bubble always takes its full space (it is only transparent
 * until it appears), and the typing indicator sits on top of it. So nothing moves
 * when messages arrive.
 */
export function ChatRow({
  side,
  visible,
  typing,
  bubbleClass,
  typingClass,
  maxWidth = "max-w-[88%]",
  children,
}: {
  side: "left" | "right";
  visible: boolean;
  typing: boolean;
  bubbleClass: string;
  typingClass: string;
  maxWidth?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative flex ${side === "right" ? "justify-end" : "justify-start"}`}>
      <div
        className={`vy-msg ${maxWidth} transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
          visible ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
        } ${bubbleClass}`}
      >
        {children}
      </div>
      {typing && (
        <div
          className={`absolute top-0 flex h-8 items-center rounded-2xl px-3 ${
            side === "right" ? "right-0" : "left-0"
          } ${typingClass}`}
        >
          <TypingDots />
        </div>
      )}
    </div>
  );
}

export function DoubleTick({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 16 11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M1 6l3 3 6-7.5" />
      <path d="M6 8.5l1 1L14 1.5" />
    </svg>
  );
}

export function SparkleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2z" />
      <path d="M19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z" />
    </svg>
  );
}

export function PersonIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
    </svg>
  );
}
