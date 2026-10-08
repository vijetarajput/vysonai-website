"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import BrandName from "@/components/BrandName";
import DemoButton from "@/components/lead/DemoButton";
import type { Interest } from "@/lib/lead";

// Illustrative assumptions: the share of each kind of work an AI team could handle.
const SHARE = { messages: 0.7, calls: 0.6, followUps: 0.8, records: 0.7 } as const;
const WEEKS_PER_MONTH = 4.33;
const HOURS_PER_DAY = 8;

type Key = keyof typeof SHARE;

const sliders: {
  key: Key;
  label: string;
  max: number;
  interest: Interest;
  summary: string;
}[] = [
  { key: "messages", label: "Answering customer messages", max: 40, interest: "Reminders", summary: "messages" },
  { key: "calls", label: "Phone calls and bookings", max: 40, interest: "AI receptionist", summary: "calls" },
  { key: "followUps", label: "Follow-ups and reminders", max: 30, interest: "Follow-ups", summary: "follow-ups" },
  { key: "records", label: "Records, stock and reports", max: 30, interest: "Customer dashboard", summary: "records" },
];

const currencies = [
  { symbol: "₹", name: "Indian rupee", locale: "en-IN" },
  { symbol: "£", name: "British pound", locale: "en-GB" },
  { symbol: "$", name: "US dollar", locale: "en-US" },
] as const;

const round1 = (n: number) => Math.round(n * 10) / 10;

function calculate(hours: Record<Key, number>, costPerHour: number | null) {
  const perWeek = round1(
    hours.messages * SHARE.messages +
      hours.calls * SHARE.calls +
      hours.followUps * SHARE.followUps +
      hours.records * SHARE.records,
  );
  const perMonth = round1(perWeek * WEEKS_PER_MONTH);
  const days = round1(perMonth / HOURS_PER_DAY);
  const value = costPerHour === null ? null : Math.round(perMonth * costPerHour);
  return { perWeek, perMonth, days, value };
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

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-2 py-2.5 text-[15px] sm:text-base">
      <dt className="min-w-0 text-charcoal">{label}</dt>
      <span
        aria-hidden="true"
        className="min-w-3 flex-1 translate-y-[-3px] border-b-2 border-dotted border-charcoal/25"
      />
      <dd className="shrink-0 font-heading text-lg font-bold tabular-nums text-charcoal">
        {children}
      </dd>
    </div>
  );
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
      <div aria-hidden="true" className="mt-1 flex justify-between text-xs text-muted">
        <span>0</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default function PayslipCalculator() {
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

  const perWeek = useCountUp(result.perWeek);
  const perMonth = useCountUp(result.perMonth);
  const days = useCountUp(result.days);
  const value = useCountUp(result.value ?? 0);

  const money = (n: number) => `${currency.symbol}${Math.round(n).toLocaleString(currency.locale)}`;

  // Screen readers hear the final numbers, after the person stops moving a slider.
  const spoken =
    `Your AI team could hand back about ${result.perWeek} hours a week, ` +
    `${result.perMonth} hours a month, or ${result.days} working days a month.` +
    (result.value !== null ? ` That time is worth about ${money(result.value)} a month.` : "");
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setAnnouncement(spoken), 700);
    return () => clearTimeout(timer);
  }, [spoken]);

  // The two kinds of work with the most hours become the preselected form chips.
  const topSliders = [...sliders]
    .filter((s) => hours[s.key] > 0)
    .sort((a, b) => hours[b.key] - hours[a.key])
    .slice(0, 2);
  const totalHours = sliders.reduce((sum, s) => sum + hours[s.key], 0);
  const note =
    `Calculator: about ${totalHours} hours/week on messages, calls, follow-ups and records ` +
    `(roughly ${result.perWeek} hours/week could be automated).`;

  return (
    <section
      id="payslip"
      className="scroll-mt-16 bg-[linear-gradient(180deg,#ffffff_0%,#F5F3FF_100%)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-violet">Try it</p>
          <h2 className="mt-3">What would your AI team save you?</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-strong">
            Move the sliders to match your week. We&apos;ll show you what your AI team could hand
            back.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Inputs */}
          <div className="rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8">
            <h3 className="text-lg">Hours your team spends each week on:</h3>
            <div className="mt-6 space-y-6">
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

            <div className="mt-8 border-t border-border pt-6">
              <label htmlFor={`${uid}-cost`} className="text-[15px] font-semibold text-charcoal">
                Cost of one staff hour{" "}
                <span className="font-normal text-muted-strong">(optional)</span>
              </label>
              <div className="mt-2 flex gap-2">
                <select
                  aria-label="Currency"
                  value={currencyIndex}
                  onChange={(e) => setCurrencyIndex(Number(e.target.value))}
                  className="w-[9.5rem] shrink-0 rounded-xl border border-border bg-white px-3 py-3 text-base text-charcoal focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
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
                  className="min-w-0 flex-1 rounded-xl border border-border bg-white px-4 py-3 text-base text-charcoal placeholder:text-muted focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
                />
              </div>
              <p className="mt-2 text-sm text-muted-strong">
                Leave it empty to hide the money line.
              </p>
            </div>
          </div>

          {/* Payslip */}
          <div>
            <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_18px_44px_-18px_rgb(31_41_55/0.35)] ring-1 ring-border">
              <div
                aria-hidden="true"
                className="h-1.5 bg-[linear-gradient(90deg,#2563EB,#7C3AED,#C026D3)]"
              />
              <div className="mx-3 mt-3 border-t-2 border-dashed border-charcoal/20 sm:mx-4" aria-hidden="true" />

              <div className="px-5 pb-2 pt-3 sm:px-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal sm:text-xs">
                    <BrandName /> · AI team payslip
                  </p>
                  <span className="rounded-full border border-brand-violet/30 bg-violet-tint px-2.5 py-0.5 text-[11px] font-semibold text-brand-violet">
                    Sample estimate
                  </span>
                </div>

                <dl className="mt-3 divide-y divide-transparent">
                  <Row label="Hours handed back each week">{perWeek.toFixed(1)}</Row>
                  <Row label="Hours each month">{perMonth.toFixed(1)}</Row>
                  <Row label="Working days returned each month">{days.toFixed(1)}</Row>
                  {result.value !== null && (
                    <Row label="Value of that time each month">{money(value)}</Row>
                  )}
                </dl>

                <div className="mt-3 rounded-xl bg-violet-tint px-4 py-3.5">
                  <p className="font-heading text-lg font-bold leading-snug text-charcoal sm:text-xl">
                    Time your team gets back:{" "}
                    <span className="text-brand-violet">
                      {days.toFixed(1)} working days a month
                    </span>
                  </p>
                </div>

                <p className="mt-4 text-sm text-muted-strong">
                  Paid to your AI team: no salary, no overtime, no sick days.
                </p>

                <details className="group mt-4 text-sm">
                  <summary className="link-brand cursor-pointer font-medium">How we calculate</summary>
                  <div className="mt-2 space-y-1.5 text-muted-strong">
                    <p>
                      Illustrative assumptions for how much of each kind of work automation could
                      handle: messages 70%, calls 60%, follow-ups 80%, records 70%.
                    </p>
                    <p>
                      Hours each week = messages × 0.7 + calls × 0.6 + follow-ups × 0.8 + records ×
                      0.7. Hours each month = weekly hours × 4.33. Working days = monthly hours ÷ 8.
                      Value = monthly hours × the cost of one staff hour you enter.
                    </p>
                  </div>
                </details>
              </div>

              <div className="mx-3 mb-3 mt-4 border-t-2 border-dashed border-charcoal/20 sm:mx-4" aria-hidden="true" />
            </div>

            <div aria-live="polite" className="sr-only">
              {announcement}
            </div>

            <p className="mt-4 text-center text-sm text-muted-strong">
              This is an illustrative estimate, not a guarantee. Real results depend on your
              processes and setup.
            </p>

            <div className="mt-5 text-center">
              <DemoButton
                interests={topSliders.map((s) => s.interest)}
                message={note}
                className="inline-flex items-center justify-center rounded-full bg-brand-violet px-7 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark"
              >
                Get your real number in a free call
              </DemoButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
