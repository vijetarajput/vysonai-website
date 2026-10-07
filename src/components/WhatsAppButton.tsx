import WhatsAppIcon from "@/components/WhatsAppIcon";
import { siteConfig } from "@/config/site";

/** Inline WhatsApp call-to-action. The number is never shown as text. */
export default function WhatsAppButton({
  label = "Chat on WhatsApp",
  className = "",
  large = false,
}: {
  label?: string;
  className?: string;
  large?: boolean;
}) {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp text-sm font-medium text-charcoal shadow-soft transition-colors hover:bg-whatsapp-dark ${
        large ? "px-6 py-3" : "px-5 py-2.5"
      } ${className}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}
