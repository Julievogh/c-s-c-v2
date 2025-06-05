"use client";

import Image from "next/image";
import Button from "@/components/Button/page";
import { motion } from "framer-motion";

export default function Feature3() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-warm-white)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto items-center">
        {/* Text - first on mobile */}
        <div className="lg:col-span-6 order-1 lg:order-1 text-center lg:text-left">
          <h4 className="mb-2">Designed to Delight, Crafted to Celebrate</h4>
          <h2 className="mb-4 text-[var(--color-deep-wine)] text-2xl sm:text-3xl md:text-4xl leading-snug">
            The Art of Cozy Celebrations
          </h2>
          <p className="font-body mb-6 text-base sm:text-lg leading-relaxed">
            Our dedicated team carefully plans every detail to create a seamless
            and stress-free experience. From the first consultation to the final
            cleanup, we handle it all—so you can simply enjoy the moment. What
            sets Cozy Social Club apart is our passion for crafting immersive
            gatherings that truly reflect your vision. With a deep love for
            hospitality, we curate unique, thoughtful experiences that leave a
            lasting impression on your guests.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button variant="outlineSecondary">Celebrate</Button>
          </div>
        </div>

        {/* Image - second on mobile */}
        <div className="lg:col-span-6 order-2 lg:order-2">
          <Image
            src="/imgs/thirdimage.png"
            alt="Celebrate"
            width={600}
            height={400}
            className="rounded-[20px] w-full h-auto"
          />
        </div>
      </div>
    </motion.section>
  );
}
