import WhatsAppIcon from "@/components/WhatsAppIcon";
import { siteConfig } from "@/config/site";

/** Inline WhatsApp call-to-action. The number is never shown as text. */
export default function WhatsAppButton({
  label = "Chat on WhatsApp",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-charcoal shadow-soft transition-colors hover:bg-whatsapp-dark ${className}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}
