"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import DemoButton from "@/components/lead/DemoButton";

// Illustrative assumptions: the share of each kind of work AI could handle.
const SHARE = { messages: 0.7, calls: 0.6, followUps: 0.8, records: 0.7 } as const;
const WEEKS_PER_MONTH = 4.33;
const HOURS_PER_DAY = 8;

type Key = keyof typeof SHARE;

const sliders: { key: Key; label: string; max: number }[] = [
  { key: "messages", label: "Replying to customer messages", max: 40 },
  { key: "calls", label: "Answering calls and booking appointments", max: 40 },
  { key: "followUps", label: "Follow-ups and reminders", max: 30 },
  { key: "records", label: "Updating records, stock and reports", max: 30 },
];

const currencies = [
  { symbol: "₹", name: "Indian rupee", locale: "en-IN" },
  { symbol: "£", name: "British pound", locale: "en-GB" },
  { symbol: "$", name: "US dollar", locale: "en-US" },
] as const;

const round1 = (n: number) => Math.round(n * 10) / 10;

function calculate(hours: Record<Key, number>, costPerHour: number | null) {
  const weekly = round1(
    hours.messages * SHARE.messages +
      hours.calls * SHARE.calls +
      hours.followUps * SHARE.followUps +
      hours.records * SHARE.records,
  );
  const days = round1((weekly * WEEKS_PER_MONTH) / HOURS_PER_DAY);
  const value = costPerHour === null ? null : Math.round(weekly * WEEKS_PER_MONTH * costPerHour);
  return { weekly, days, value };
}

/** Counts up to `target` when it changes. No animation when the visitor prefers reduced motion. */
function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 0 : 500;
    const from = fromRef.current;
    const start = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (target - from) * eased;
      fromRef.current = current;
      setValue(current);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return value;
}

function Slider({
  id,
  label,
  value,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[15px] font-semibold text-charcoal">
          {label}
        </label>
        <output htmlFor={id} className="shrink-0 text-sm font-bold tabular-nums text-brand-violet">
          {value} hrs/week
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={`${value} hours per week`}
        className="mt-2 h-2 w-full cursor-pointer accent-brand-violet"
      />
    </div>
  );
}

export default function CalculatorClient() {
  const uid = useId();
  const [hours, setHours] = useState<Record<Key, number>>({
    messages: 10,
    calls: 8,
    followUps: 5,
    records: 6,
  });
  const [cost, setCost] = useState("");
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const currency = currencies[currencyIndex];

  const costValue = cost.trim() === "" ? null : Math.max(0, Number(cost));
  const hasCost = costValue !== null && Number.isFinite(costValue);
  const result = useMemo(
    () => calculate(hours, hasCost ? costValue : null),
    [hours, hasCost, costValue],
  );

  const weekly = useCountUp(result.weekly);
  const days = useCountUp(result.days);
  const value = useCountUp(result.value ?? 0);

  const money = (n: number) => `${currency.symbol}${Math.round(n).toLocaleString(currency.locale)}`;

  // Screen readers hear the final numbers, after the person stops moving a slider.
  const spoken =
    `AI could save you about ${result.weekly} hours a week. ` +
    `That is about ${result.days} working days every month.` +
    (result.value !== null ? ` Worth about ${money(result.value)} a month.` : "");
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setAnnouncement(spoken), 700);
    return () => clearTimeout(timer);
  }, [spoken]);

  const note = `Calculator: AI could save about ${result.weekly} hours a week on messages, calls, follow-ups and records.`;

  return (
    <div className="section-gap grid grid-cols-[minmax(0,1fr)] items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8">
        <div className="space-y-6">
          {sliders.map((s) => (
            <Slider
              key={s.key}
              id={`${uid}-${s.key}`}
              label={s.label}
              value={hours[s.key]}
              max={s.max}
              onChange={(v) => setHours((h) => ({ ...h, [s.key]: v }))}
            />
          ))}
        </div>

        <div className="mt-7 border-t border-border pt-5">
          <label htmlFor={`${uid}-cost`} className="text-sm font-semibold text-charcoal">
            Cost of one staff hour{" "}
            <span className="font-normal text-muted-strong">(optional)</span>
          </label>
          <div className="mt-2 flex gap-2">
            <select
              aria-label="Currency"
              value={currencyIndex}
              onChange={(e) => setCurrencyIndex(Number(e.target.value))}
              className="w-[9.5rem] shrink-0 rounded-xl border border-border bg-white px-3 py-2.5 text-base text-charcoal focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
            >
              {currencies.map((c, i) => (
                <option key={c.symbol} value={i}>
                  {c.symbol} {c.name}
                </option>
              ))}
            </select>
            <input
              id={`${uid}-cost`}
              type="number"
              inputMode="decimal"
              min={0}
              max={100000}
              step="any"
              placeholder="e.g. 250"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-border bg-white px-4 py-2.5 text-base text-charcoal placeholder:text-muted focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-3xl border border-border bg-white p-6 text-center shadow-soft sm:p-8">
        <p className="text-sm font-semibold text-muted-strong">AI could save you about</p>
        <p className="mt-2 flex flex-wrap items-baseline justify-center gap-x-3">
          <span className="font-heading text-7xl font-extrabold leading-none tabular-nums text-brand-violet sm:text-8xl">
            {weekly.toFixed(1)}
          </span>
          <span className="font-heading text-2xl font-bold text-charcoal">hours a week</span>
        </p>
        <p className="mt-5 text-lg text-charcoal">
          That&apos;s about{" "}
          <span className="font-bold tabular-nums">{days.toFixed(1)}</span> working days every
          month.
        </p>
        {result.value !== null && (
          <p className="mt-1.5 text-lg text-charcoal">
            Worth about <span className="font-bold tabular-nums">{money(value)}</span> a month.
          </p>
        )}

        <div aria-live="polite" className="sr-only">
          {announcement}
        </div>

        <p className="mt-6 text-sm text-muted-strong">This is an estimate, not a guarantee.</p>

        <div className="mt-6">
          <DemoButton
            message={note}
            className="inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark"
          >
            <span className="whitespace-nowrap sm:hidden">Book free audit</span>
            <span className="hidden whitespace-nowrap sm:inline">
              Book a free 30-min audit to get your real number
            </span>
          </DemoButton>
        </div>
      </div>
    </div>
  );
}
