import Image from "next/image";
import Link from "next/link";
import CurrentYear from "@/components/CurrentYear";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const { contact, social } = siteConfig;

  return (
    <footer className="relative border-t border-border bg-violet-tint">
      {/* thin brand accent line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-brand-gradient"
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Image
              src="/vyson-logo-full.png"
              alt="VYSON AI"
              width={1098}
              height={612}
              className="h-auto w-[180px]"
            />
            <p className="mt-4 text-sm font-semibold text-charcoal">
              {siteConfig.brandTagline}
            </p>
            <p className="measure mt-2 max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.aboutShort}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-charcoal">Pages</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-brand-violet"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-charcoal">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-brand-violet"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-violet"
                >
                  WhatsApp: +{contact.whatsappNumber}
                </a>
              </li>
              <li>{contact.city}</li>
              <li>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-violet"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {siteConfig.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-brand-violet"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
