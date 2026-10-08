"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { getCountryOptions, type CountryCode, type CountryOption } from "@/lib/phone";

type Props = {
  id: string;
  country: CountryCode;
  onCountryChange: (code: CountryCode) => void;
  value: string;
  onValueChange: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
  describedBy?: string;
  /** Border colour class (normal or error). */
  borderClass: string;
  inputClass: string;
};

/**
 * "WhatsApp number" field with a searchable country-code picker.
 * India, United Kingdom and United States are pinned at the top, then every other
 * country A to Z. Keyboard: Enter/Space/ArrowDown opens, type to search, arrows move,
 * Enter picks, Escape closes.
 */
export default function PhoneField({
  id,
  country,
  onCountryChange,
  value,
  onValueChange,
  onBlur,
  invalid,
  describedBy,
  borderClass,
  inputClass,
}: Props) {
  const listId = useId();
  const { pinned, others, all } = getCountryOptions();
  const selected = all.find((c) => c.code === country) ?? pinned[0];

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { pinnedShown, othersShown, items } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const qDigits = q.replace(/\D/g, "");
    const match = (c: CountryOption) =>
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase() === q ||
      (qDigits !== "" && c.dial.slice(1).startsWith(qDigits));
    const pinnedShown = pinned.filter(match);
    const othersShown = others.filter(match);
    return { pinnedShown, othersShown, items: [...pinnedShown, ...othersShown] };
  }, [query, pinned, others]);

  // Close when clicking or tabbing away.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  // Keep the highlighted row visible while moving with the arrow keys.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function openList() {
    setQuery("");
    const index = [...pinned, ...others].findIndex((c) => c.code === country);
    setActive(Math.max(index, 0));
    setOpen(true);
  }

  function close(returnFocus = true) {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }

  function choose(option: CountryOption) {
    onCountryChange(option.code);
    close();
  }

  function onSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, items.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const option = items[active];
      if (option) choose(option);
    } else if (event.key === "Escape") {
      // Closes only the list, not the dialog around the form.
      event.preventDefault();
      event.stopPropagation();
      close();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  }

  function renderOption(option: CountryOption, index: number) {
    const isActive = index === active;
    const isSelected = option.code === country;
    return (
      <li
        key={option.code}
        id={`${listId}-${option.code}`}
        role="option"
        aria-selected={isSelected}
        data-index={index}
        onPointerMove={() => setActive(index)}
        onClick={() => choose(option)}
        className={`flex cursor-pointer items-center gap-3 px-3 py-2 text-sm ${
          isActive ? "bg-violet-tint" : ""
        } ${isSelected ? "font-semibold" : ""}`}
      >
        <span aria-hidden="true" className="w-6 text-center text-lg leading-none">
          {option.flag}
        </span>
        <span className="min-w-0 flex-1 truncate">{option.name}</span>
        <span className="shrink-0 text-muted-strong">{option.dial}</span>
      </li>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <div className="flex">
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-label={`Country code: ${selected.name} ${selected.dial}. Change country`}
          onClick={() => (open ? close(false) : openList())}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" && !open) {
              event.preventDefault();
              openList();
            }
          }}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-l-xl border border-r-0 bg-violet-tint px-3 text-base font-medium text-charcoal transition-colors hover:bg-violet-tint/70 focus:z-10 focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30 ${borderClass}`}
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {selected.flag}
          </span>
          <span>{selected.dial}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="Your WhatsApp number"
          value={value}
          onChange={(e) => onValueChange(e.target.value.replace(/[^\d\s()+-]/g, "").slice(0, 20))}
          onBlur={onBlur}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className={`${inputClass} min-w-0 rounded-l-none ${borderClass}`}
        />
      </div>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-1.5 w-[min(21rem,calc(100vw-3rem))] overflow-hidden rounded-xl border border-border bg-white shadow-[0_18px_44px_-12px_rgb(31_41_55/0.35)]">
          <div className="border-b border-border p-2">
            <input
              ref={searchRef}
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={items[active] ? `${listId}-${items[active].code}` : undefined}
              aria-label="Search countries"
              placeholder="Search country or code"
              autoComplete="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onSearchKeyDown}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm text-charcoal placeholder:text-muted focus:border-brand-violet focus:outline-none focus:ring-2 focus:ring-brand-violet/30"
            />
          </div>
          <ul ref={listRef} id={listId} role="listbox" aria-label="Countries" className="max-h-60 overflow-y-auto py-1">
            {pinnedShown.map((option, i) => renderOption(option, i))}
            {pinnedShown.length > 0 && othersShown.length > 0 && (
              <li role="separator" aria-hidden="true" className="my-1 border-t border-border" />
            )}
            {othersShown.map((option, i) => renderOption(option, pinnedShown.length + i))}
            {items.length === 0 && (
              <li role="presentation" className="px-3 py-3 text-sm text-muted-strong">
                No country found.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
