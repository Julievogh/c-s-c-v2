import Image from "next/image";

export default function Story() {
  return (
    <section
      id="story"
      className="col-span-12 lg:col-start-2 lg:col-span-10 story-bg md:my-6"
    >
      <div className="relative max-w-6xl mx-auto   bg-[url('/imgs/ternetbg2.png')] bg-cover bg-no-repeat bg-center">
        <div className="text-center p-24 space-y-8">
          <h2 className="font-display text-h2">The story</h2>
          <h3 className="font-display text-h3">
            More Than Just Food – A Cozy Invitation
          </h3>
          <p className="font-body">
            Cozy Social Club is more than just food – it’s an experience you
            become part of. We create intimate pop-up dinners and curated
            catering events where the atmosphere is just as important as the
            flavors. It’s a space where people from different walks of life
            gather around a shared table, great wine, and food made with love
            and intention.
          </p>
          <h3 className="font-display text-h3">Where It All Began</h3>
          <p className="font-body">
            Our concept was born from close friendships and long evenings filled
            with conversation, laughter, and quiet moments of connection in the
            middle of busy lives. That’s why our experiences aren’t just about
            what’s on the plate – but what happens around the table.
          </p>
          <p className="font-accent text-accent italic">
            "We wanted to bottle that magical feeling of a night with great
            friends, music, and wine."
          </p>
          <h2 className="font-display text-h2">Curated With Care</h2>
          <p className="font-body">
            Each event is carefully curated with attention to detail,
            aesthetics, and warmth. From location to menu to music – everything
            is chosen to create a cozy, informal, and exclusive vibe. We
            collaborate with local chefs, farmers, and creatives to bring you
            food that tastes like something – and feels like something.
          </p>
          <h3 className="italic">You're invited. Welcome to the table.</h3>
          <p className="font-accent text-accent">Juan Lomeli</p>
          <Image
            src="/imgs/logo.svg"
            alt="CSC Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
