import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page could not be found.",
};

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <p className="font-heading text-6xl font-extrabold text-brand-violet" aria-hidden="true">
          404
        </p>
        <h1 className="mt-4">This page could not be found</h1>
        <p className="measure mx-auto mt-5 text-lg text-muted-strong">
          The link may be old or typed wrongly. Let&apos;s get you back to something useful.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-violet px-6 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark"
          >
            Back to Home
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center justify-center rounded-full border-2 border-brand-violet px-6 py-3 text-sm font-medium text-brand-violet transition-colors hover:bg-violet-tint"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
