import Image from "next/image";

export default function FineDiningPage() {
  return (
    <div className="min-h-screen px-6 py-20 bg-[var(--color-warm-white)] text-[var(--color-deep-wine)] font-karla">
      <div className="max-w-3xl mx-auto space-y-12 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold font-recoleta">
          A Night of Fine Dining
        </h1>

        <p className="text-lg md:text-xl text-[var(--color-muted)]">
          A multi-sensory experience curated for a select group of guests.
          Delight in refined flavors, intimate surroundings, and beautiful
          company.
        </p>
      </div>

      <div className="mt-16 space-y-12 max-w-3xl mx-auto">
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Tasting Menu</h2>
          <ul className="space-y-1 text-[var(--color-text)]">
            <li>Truffle-infused goat cheese with beetroot carpaccio</li>
            <li>Red wine–braised short ribs with creamy polenta</li>
            <li>Champagne sorbet palate cleanser</li>
            <li>Dark chocolate mousse with raspberry dust</li>
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Moodboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <img
              src="/imgs/finedine2.jpg"
              alt="Ambience 1"
              className="w-full rounded"
            />
            <img
              src="/imgs/finedine1.jpg"
              alt="Ambience 2"
              className="w-full rounded"
            />
            <img
              src="/imgs/finedine3.jpg"
              alt="Ambience 3"
              className="w-full rounded"
            />
          </div>
        </section>

        <section className="text-center pt-8">
          <h2 className="text-xl font-semibold mb-2">Private Invitation</h2>
          <p className="text-[var(--color-muted)] mb-4">
            This experience is invitation-only. Contact us for future seatings
            or bespoke events.
          </p>
          <a href="/contact-us" className="btn btn-primary">
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
}
