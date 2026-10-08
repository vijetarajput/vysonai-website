import Image from "next/image";
import Link from "next/link";
import BrandName from "@/components/BrandName";
import CurrentYear from "@/components/CurrentYear";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-violet-tint">
      {/* extra bottom padding on mobile so the floating WhatsApp button never covers content */}
      <div className="site-container pb-24 pt-10 sm:pb-10 md:pt-12 md:pb-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Image
              src="/vyson-logo-full.png"
              alt={siteConfig.name}
              width={1098}
              height={612}
              className="h-auto w-[180px]"
            />
            <p className="measure mt-4 max-w-xs text-sm leading-relaxed text-muted-strong">
              <BrandName /> {siteConfig.footerBlurb}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-charcoal">Pages</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-charcoal">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-strong">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="link-brand">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.location}</li>
              <li className="pt-1">
                <WhatsAppButton />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-strong">
          <p className="text-xs">MSME Registered: {siteConfig.udyam}</p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; <CurrentYear /> <BrandName />. All rights reserved.
            </p>
            <ul className="flex gap-6">
              {siteConfig.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
