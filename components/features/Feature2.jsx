"use client";

import Image from "next/image";
import Button from "@/components/Button/page";
import { motion } from "framer-motion";

export default function Feature2() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-warm-white)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto items-center">
        {/* Text - appears first on mobile */}
        <div className="lg:col-span-6 order-1 lg:order-2 text-center lg:text-left">
          <h4 className="mb-2">Experience the Magic of Connection</h4>
          <h2 className="mb-4 text-[var(--color-espresso)] text-2xl sm:text-3xl md:text-4xl leading-snug">
            Friends, family & colleagues
          </h2>
          <p className="font-body mb-6 text-base sm:text-lg leading-relaxed">
            Our amazing community is at the heart of Cozy Social Club. The
            connections we build—with our guests, team, and friends—make our
            work meaningful and inspire us to create unforgettable moments. We
            believe in the power of people and the joy of shared experiences.
            Our approach is rooted in warmth and hospitality, from thoughtfully
            curated menus to our attentive, welcoming staff. Every detail is
            designed to reflect personality, comfort, and the magic of bringing
            people together.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button variant="secondary">Book</Button>
          </div>
        </div>

        {/* Image - appears second on mobile */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <Image
            src="/imgs/secondimage.png"
            alt="Connection"
            width={600}
            height={400}
            className="rounded-[20px] w-full h-auto"
          />
        </div>
      </div>
    </motion.section>
  );
}
