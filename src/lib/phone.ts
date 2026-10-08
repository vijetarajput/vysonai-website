import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

// Shared by the lead form (browser) and the /api/lead route (server).

export type { CountryCode };

export const DEFAULT_COUNTRY: CountryCode = "IN";

/** Shown first in the country list, in this order. */
export const PINNED_COUNTRIES: CountryCode[] = ["IN", "GB", "US"];

export type CountryOption = {
  code: CountryCode;
  name: string;
  dial: string; // for example "+91"
  flag: string; // flag emoji
};

function flagEmoji(code: string) {
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)));
}

let cached: { pinned: CountryOption[]; others: CountryOption[]; all: CountryOption[] } | null = null;

/** Country list: India, United Kingdom and United States first, then everyone else A to Z. */
export function getCountryOptions() {
  if (cached) return cached;

  const names = new Intl.DisplayNames(["en"], { type: "region" });
  const all = getCountries().map<CountryOption>((code) => ({
    code,
    name: names.of(code) ?? code,
    dial: `+${getCountryCallingCode(code)}`,
    flag: flagEmoji(code),
  }));

  const pinned = PINNED_COUNTRIES.map((code) => all.find((c) => c.code === code)!).filter(Boolean);
  const others = all
    .filter((c) => !PINNED_COUNTRIES.includes(c.code))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));

  cached = { pinned, others, all };
  return cached;
}

export function isCountryCode(value: unknown): value is CountryCode {
  return typeof value === "string" && (getCountries() as string[]).includes(value);
}

/**
 * Checks a number for the chosen country. Returns the E.164 form (for example +447911123456),
 * or null if it is not a valid number for that country. A number typed with a different
 * country code than the selected one is not accepted.
 */
export function toE164(raw: string, country: CountryCode): string | null {
  const parsed = parsePhoneNumberFromString(raw, country);
  if (!parsed || !parsed.isValid()) return null;
  if (parsed.countryCallingCode !== getCountryCallingCode(country)) return null;
  return parsed.number;
}
