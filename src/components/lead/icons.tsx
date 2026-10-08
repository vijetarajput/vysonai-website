import type { ReactNode } from "react";
import type { BusinessType } from "@/lib/lead";

function Svg({ children, size = 32 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function BusinessIcon({ type, size }: { type: BusinessType; size?: number }) {
  switch (type) {
    case "Gym":
      return (
        <Svg size={size}>
          <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />
        </Svg>
      );
    case "Clinic":
      return (
        <Svg size={size}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path d="M12 8v8M8 12h8" />
        </Svg>
      );
    case "Salon":
      return (
        <Svg size={size}>
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12" />
        </Svg>
      );
    case "Coaching":
      return (
        <Svg size={size}>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </Svg>
      );
    case "Retail / Shop":
      return (
        <Svg size={size}>
          <path d="M5.5 8h13l-1 12h-11l-1-12Z" />
          <path d="M9 10.5V7a3 3 0 0 1 6 0v3.5" />
        </Svg>
      );
    default:
      return (
        <Svg size={size}>
          <circle cx="6" cy="12" r="1.2" fill="currentColor" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          <circle cx="18" cy="12" r="1.2" fill="currentColor" />
        </Svg>
      );
  }
}

export function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
