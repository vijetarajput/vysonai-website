import CalculatorLoader from "@/components/CalculatorLoader";

export default function Calculator() {
  return (
    <section id="calculator" className="bg-white">
      <div className="site-container section-y">
        <div className="mx-auto max-w-2xl text-center">
          <h2>How many hours can AI save your business?</h2>
          <p className="mt-3 text-lg text-muted-strong">Move the sliders to match your week.</p>
        </div>
        <CalculatorLoader />
      </div>
    </section>
  );
}
