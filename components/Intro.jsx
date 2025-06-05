export default function Intro() {
  return (
    <section className="col-span-12 lg:col-start-3 lg:col-span-8 text-center py-16 px-6">
      <h1 className="text-5xl md:text-6xl lg:text-9xl font-display text-[var(--color-dark-espresso)] mb-4">
        Cozy Social Club
      </h1>
      <p className="font-accent text-3xl md:text-5xl lg:text-6xl mb-4">
        You have been cordially invited
      </p>
      <hr className="w-[40%] mx-auto border-t-1 border-[var(--color-dark-green)]" />
    </section>
  );
}
