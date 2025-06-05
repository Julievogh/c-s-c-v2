import Image from "next/image";

export default function Socials() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 py-16 max-w-7xl mx-auto">
      <section className="lg:col-span-10 lg:col-start-2 py-10">
        {/* Link flush left */}
        <a
          href="https://instagram.com/cozysocialclub"
          className="text-[length:var(--font-h2)] inline-block mb-6"
        >
          @cozysocialclub
        </a>

        {/* Centered image grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 px-4 py-6 max-w-5xl mx-auto">
          {["socials1", "socials2", "socials3", "socials4"].map((icon, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-md">
              <Image
                src={`/imgs/${icon}.png`}
                alt={icon}
                layout="responsive"
                width={500}
                height={500}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Logos flush left */}
        <div className="flex justify-start space-x-6">
          <Image
            src="/imgs/instalogo.png"
            alt="Instagram"
            width={60}
            height={60}
          />
          <Image src="/imgs/fblogo.png" alt="Facebook" width={60} height={60} />
          <Image src="/imgs/xlogo.png" alt="Twitter" width={60} height={60} />
        </div>
      </section>
    </div>
  );
}
