import { siteConfig } from "@/config/site";

/** Inline mailto call-to-action. */
export default function EmailButton({
  label = "Email us",
  className = "",
  large = false,
}: {
  label?: string;
  className?: string;
  large?: boolean;
}) {
  return (
    <a
      href={`mailto:${siteConfig.email}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand-violet text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark ${
        large ? "px-6 py-3" : "px-5 py-2.5"
      } ${className}`}
    >
      {label}
    </a>
  );
}
