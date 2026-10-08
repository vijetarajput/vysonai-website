import WhatsAppIcon from "@/components/WhatsAppIcon";
import { siteConfig } from "@/config/site";

/**
 * Fixed bottom-right WhatsApp button shown on every page.
 * Kept compact on mobile; the footer reserves bottom padding so it never
 * covers content.
 */
export default function FloatingWhatsApp() {
  return (
    <div data-floating-wa className="group fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-charcoal opacity-0 shadow-soft transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        Chat with us
      </span>
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-charcoal shadow-[0_8px_24px_-6px_rgb(31_41_55/0.4)] transition-colors hover:bg-whatsapp-dark sm:h-14 sm:w-14"
      >
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
}
