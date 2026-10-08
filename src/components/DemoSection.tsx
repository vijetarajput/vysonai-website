import LeadFlow from "@/components/lead/LeadFlow";

export default function DemoSection() {
  return (
    <section id="demo" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <h2>See a Free Demo for Your Business</h2>
          <p className="measure mx-auto mt-3 text-muted-strong">
            Share your WhatsApp number. We&apos;ll message you within 24 hours.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-border bg-white p-6 shadow-soft sm:p-8">
          <LeadFlow layout="inline" />
        </div>
      </div>
    </section>
  );
}
