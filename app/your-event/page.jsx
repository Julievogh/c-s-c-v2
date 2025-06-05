import Image from "next/image";

export default function YourEventPage() {
  return (
    <div className="min-h-screen grid place-items-center px-6 py-20 bg-[var(--color-warm-white)] text-center font-karla text-[var(--color-deep-wine)]">
      <div className="space-y-12 max-w-2xl">
        <Image
          src="/imgs/logo.svg"
          alt="Cozy Social Club Logo"
          width={200}
          height={200}
          className="mx-auto"
        />

        <h1 className="text-4xl md:text-5xl font-semibold">
          This page is being created
        </h1>

        <p className="text-lg md:text-xl">
          We’re working on something special for this section.
          <br />
          Stay tuned and check back soon.
        </p>
      </div>
    </div>
  );
}
