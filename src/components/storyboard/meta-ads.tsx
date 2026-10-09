import type { ReactNode } from "react";
import { SparkleIcon } from "@/components/showcase/parts";

/** Gradient offer card used in the hero post and the Feed / Stories / Reels mockups. */
export function OfferCard({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const pad = size === "sm" ? "p-2.5" : size === "lg" ? "px-3.5 py-4" : "px-3.5 py-3.5";
  const text = size === "sm" ? "text-[11px]" : size === "lg" ? "text-[16px]" : "text-[14px]";
  return (
    <div
      className={`relative overflow-hidden rounded-2xl text-white ${pad}`}
      style={{ background: "linear-gradient(135deg, #7C3AED 0%, #C026D3 100%)" }}
    >
      <span className="absolute right-2 top-2 text-white/80">
        <SparkleIcon size={size === "sm" ? 10 : 16} />
      </span>
      <p className={`font-heading font-bold leading-snug ${text}`}>20% off your first hair spa</p>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20s-7-4.4-9.2-8.2C.8 8.6 2.4 5 6.2 5c2 0 3.4 1.2 4.3 2.4C11.4 6.2 12.8 5 14.8 5c3.8 0 5.4 3.6 3.4 6.8C19 15.6 12 20 12 20z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
    </svg>
  );
}

/** A generic sponsored post: account, offer visual, like/comment row, send button. No platform logos. */
export function SponsoredPost({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`rounded-2xl bg-white shadow-soft ${compact ? "p-1.5" : "p-2.5"}`}>
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center rounded-full bg-brand-gradient-diagonal font-bold text-white ${
            compact ? "h-6 w-6 text-[9px]" : "h-8 w-8 text-[11px]"
          }`}
        >
          G
        </span>
        <span className="min-w-0">
          <span className={`block truncate font-bold text-charcoal ${compact ? "text-[9px]" : "text-[12px]"}`}>
            Glow Studio Salon
          </span>
          <span className={`block text-muted ${compact ? "text-[8px]" : "text-[10px]"}`}>Sponsored</span>
        </span>
      </div>
      <div className={compact ? "mt-1.5" : "mt-2"}>
        <OfferCard size={compact ? "sm" : "lg"} />
      </div>
      {!compact && (
        <p className="mt-2 flex items-center gap-3 text-[11px] font-medium text-muted-strong">
          <span className="inline-flex items-center gap-1">
            <HeartIcon /> 24
          </span>
          <span className="inline-flex items-center gap-1">
            <CommentIcon /> 3
          </span>
        </p>
      )}
      <span
        className={`mt-2 flex w-full items-center justify-center rounded-full bg-brand-violet font-semibold text-white ${
          compact ? "py-1 text-[8px]" : "py-1.5 text-[12px]"
        }`}
      >
        Send message
      </span>
    </article>
  );
}

function MiniPhone({
  children,
  tall = false,
  className = "",
}: {
  children: ReactNode;
  tall?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[1.05rem] border-[5px] border-[#d1d5db] bg-white shadow-soft ${
        tall ? "h-[196px] w-[92px]" : "h-[150px] w-[108px]"
      } ${className}`}
    >
      <div aria-hidden="true" className="mx-auto mt-1 h-1 w-7 rounded-full bg-[#d1d5db]" />
      {children}
    </div>
  );
}

function AdAccount({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="flex items-center gap-1 px-1.5 pt-1.5">
      <span
        aria-hidden="true"
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-[7px] font-bold text-brand-violet"
      >
        G
      </span>
      <span className="min-w-0">
        <span className={`block truncate text-[7px] font-bold leading-tight ${onDark ? "text-white" : "text-charcoal"}`}>
          Glow Studio Salon
        </span>
        <span className={`block text-[6px] leading-tight ${onDark ? "text-white/80" : "text-muted"}`}>Sponsored</span>
      </span>
    </div>
  );
}

function PlayMark() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-violet shadow-soft">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5.5v13l11-6.5L8 5.5z" />
        </svg>
      </span>
    </span>
  );
}

function TallAd({ play = false }: { play?: boolean }) {
  return (
    <div
      className="relative flex min-h-0 flex-1 flex-col"
      style={{ background: "linear-gradient(135deg, #7C3AED 0%, #C026D3 100%)" }}
    >
      <AdAccount onDark />
      <p className="mt-auto px-1.5 pb-3 font-heading text-[10px] font-bold leading-tight text-white">
        20% off your first hair spa
      </p>
      {play && <PlayMark />}
    </div>
  );
}

/**
 * Three small generic phones, slightly overlapping: the same ad as a square feed post,
 * a tall story and a tall reel. No platform logos.
 */
export function AdPlacesVisual() {
  return (
    <figure aria-label="Example: the same ad in a feed, a story and a reel" className="relative pt-5">
      <span className="absolute left-0 top-0 text-[10px] font-medium uppercase tracking-wider text-muted">
        Sample
      </span>
      <div className="mx-auto flex w-full max-w-[340px] items-end justify-center pt-2">
        <div className="z-10 flex -mr-5 flex-col items-center" style={{ transform: "rotate(-7deg)" }}>
          <MiniPhone>
            <AdAccount />
            <div className="px-1.5 pt-1.5">
              <OfferCard size="sm" />
            </div>
          </MiniPhone>
          <p className="mt-2.5 text-[12px] font-semibold text-muted-strong" style={{ transform: "rotate(7deg)" }}>
            Feed
          </p>
        </div>
        <div className="z-20 flex flex-col items-center">
          <MiniPhone tall>
            <TallAd />
          </MiniPhone>
          <p className="mt-2.5 text-[12px] font-semibold text-muted-strong">Stories</p>
        </div>
        <div className="z-10 flex -ml-5 flex-col items-center" style={{ transform: "rotate(7deg)" }}>
          <MiniPhone tall>
            <TallAd play />
          </MiniPhone>
          <p className="mt-2.5 text-[12px] font-semibold text-muted-strong" style={{ transform: "rotate(-7deg)" }}>
            Reels
          </p>
        </div>
      </div>
    </figure>
  );
}
