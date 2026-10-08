"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl px-4 section-y text-center sm:px-6">
        <h1>Something went wrong</h1>
        <p className="measure mx-auto mt-5 text-lg text-muted-strong">
          Sorry about that. Please try again. If it keeps happening, write to us from the contact page.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-brand-violet px-6 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-violet-dark"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border-2 border-brand-violet px-6 py-3 text-sm font-medium text-brand-violet transition-colors hover:bg-violet-tint"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
