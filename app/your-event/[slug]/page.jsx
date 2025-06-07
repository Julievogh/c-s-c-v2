export default function EventPage({ params }) {
  const { slug } = params;

  return (
    <div className="min-h-screen px-6 py-16 bg-[var(--color-warm-white)] text-[var(--color-deep-wine)] font-karla">
      <div className="max-w-3xl mx-auto space-y-12 text-center">
        <h1 className="text-4xl md:text-5xl font-recoleta font-bold capitalize">
          {slug.replaceAll("-", " ")}
        </h1>

        <p className="text-lg md:text-xl text-[var(--color-muted)]">
          Welcome to this private Cozy Social Club experience ✨
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-16 space-y-16">
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Menu</h2>
          <ul className="space-y-1 text-[var(--color-text)]">
            <li>Starter: Burrata with roasted tomatoes</li>
            <li>Main: Tagliatelle with truffle cream</li>
            <li>Dessert: Tiramisu with coffee liqueur</li>
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Moodboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <img
              src="/imgs/event1.jpg"
              alt="Inspo 1"
              className="w-full h-auto rounded"
            />
            <img
              src="/imgs/event2.jpg"
              alt="Inspo 2"
              className="w-full h-auto rounded"
            />
            <img
              src="/imgs/event4.jpg"
              alt="Inspo 3"
              className="w-full h-auto rounded"
            />
          </div>
        </section>

        <section className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Guest Plan</h2>
          <p className="text-[var(--color-text)]">
            You’re seated at Table 3 – with Maja, Rasmus, and Emil 🥂
          </p>
        </section>

        <section className="text-center pt-4">
          <h2 className="text-2xl font-semibold">Share Your Memories 📸</h2>
          <p className="text-[var(--color-muted)] mt-2">
            Got great photos from the event? Upload and share them with
            everyone!
          </p>
          <div className="mt-4">
            <a
              href="https://www.file.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Upload Photos
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
