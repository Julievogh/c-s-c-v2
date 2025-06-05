"use client";

import Image from "next/image";
import Button from "@/components/Button/page";
import { motion } from "framer-motion";

export default function Feature1() {
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
          <h4 className="mb-2">Welcome to Cozy Social Club</h4>
          <h2 className="mb-4 text-[var(--color-dark-green)] text-2xl sm:text-3xl md:text-4xl leading-snug">
            Crafted Catering, Unforgettable Moments
          </h2>
          <p className="font-body mb-6 text-base sm:text-lg leading-relaxed">
            Cozy Social Club is a full-service event and hospitality brand
            dedicated to crafting warm, inviting experiences that bring people
            together. We create memorable gatherings with exceptional service,
            thoughtful details, and a welcoming atmosphere. Whether it’s an
            intimate get-together or a lively celebration, we ensure every event
            feels special, effortless, and truly cozy.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button variant="primary">Contact Us</Button>
          </div>
        </div>

        {/* Image - second on mobile */}
        <div className="lg:col-span-6 order-2 lg:order-2">
          <Image
            src="/imgs/firstimage.png"
            alt="Welcome"
            width={600}
            height={400}
            className="rounded-[20px] w-full h-auto"
          />
        </div>
      </div>
    </motion.section>
  );
}
