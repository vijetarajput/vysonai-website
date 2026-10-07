import Link from "next/link";

export default function FinalCta({
  heading = "Ready to stop missing customers?",
}: {
  heading?: string;
}) {
  return (
    <section className="on-dark bg-brand-gradient-diagonal">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="text-white">{heading}</h2>
        <Link
          href="/#demo"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium text-brand-violet shadow-soft transition-colors hover:bg-violet-tint"
        >
          Get Free Demo
        </Link>
      </div>
    </section>
  );
}
