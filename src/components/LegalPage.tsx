import BrandText from "@/components/BrandText";
import { siteConfig } from "@/config/site";

export type LegalSection = {
  heading: string;
  /** Paragraphs. Use "{brand}" wherever the company name should appear. */
  paragraphs?: string[];
  items?: string[];
};

/** Plain, readable layout for the Privacy Policy and Terms pages. */
export default function LegalPage({
  title,
  updated,
  intro,
  sections,
  contactText,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  contactText: string;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <h1>{title}</h1>
        <p className="mt-3 text-sm text-muted-strong">Last updated: {updated}</p>
        <p className="mt-6 text-lg leading-relaxed text-muted-strong">
          <BrandText>{intro}</BrandText>
        </p>

        {sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-2xl">{section.heading}</h2>
            {section.paragraphs?.map((text) => (
              <p key={text} className="mt-3 leading-relaxed text-muted-strong">
                <BrandText>{text}</BrandText>
              </p>
            ))}
            {section.items && (
              <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-muted-strong marker:text-brand-violet">
                {section.items.map((item) => (
                  <li key={item}>
                    <BrandText>{item}</BrandText>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mt-10">
          <h2 className="text-2xl">Contact us</h2>
          <p className="mt-3 leading-relaxed text-muted-strong">
            {contactText}{" "}
            <a href={`mailto:${siteConfig.email}`} className="link-brand">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </section>
  );
}
