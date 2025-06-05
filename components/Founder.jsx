import Image from "next/image";

export default function Founder() {
  return (
    <section className="bg-[var(--color-soft-beige)] py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Image Section */}
        <div className="lg:col-span-6 flex justify-center">
          <Image
            src="/imgs/juan.png"
            alt="Juan, founder of Cozy Social Club"
            width={500}
            height={500}
            className="rounded-[20px] w-full max-w-md h-auto object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="lg:col-span-6 text-center lg:text-left">
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-dark-green)] mb-6">
            Meet the Founder
          </h2>

          <h3 className="font-subtitle text-xl md:text-2xl text-[var(--color-dark-espresso)] font-semibold mb-6">
            <span className="font-bold">Juan</span> – The Chef Behind the
            Concept
          </h3>
          <div className="font-body text-base md:text-lg text-[var(--color-dark-espresso)] space-y-4 mb-6">
            <p>
              Juan is a chef from Los Angeles with a passion for blending
              tradition and innovation.
            </p>
            <p>
              He grew up surrounded by bold flavors and diverse food cultures,
              and today he brings that same curiosity to Cozy Social Club.
            </p>
            <p>
              Whether he’s slow-cooking a classic or reimagining a dish with a
              twist, Juan believes that food should spark connection.
            </p>
          </div>
          <p className="font-body font-bold text-lg text-[var(--color-dark-espresso)] mb-2">
            His vision is simple:
          </p>
          <blockquote className="italic text-[var(--color-dark-green)] text-lg md:text-xl leading-relaxed">
            Create shared experiences that feel personal, intimate, and
            delicious — like a dinner party with soul.
          </blockquote>
          <p className="font-accent text-2xl text-[var(--color-dark-green)] mb-4">
            Come hungry, leave satisfied
          </p>
        </div>
      </div>
    </section>
  );
}
