// components/Events.jsx
"use client";

import { useState } from "react";
import EventSignupModal from "@/components/EventSignupModal";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/page";
import WaveAnimation from "../components/ui/Wavify";
import { events } from "@/lib/events";

// Floating animation variant
const popVariant = {
  animate: (i) => ({
    y: [0, -10, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      delay: i * 0.3,
    },
  }),
};

export default function Events() {
  // sort events by date ascending, then take next 4 upcoming
  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  return (
    <section id="popup" className="col-span-12 py-16 px-6">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="font-display text-h2">
          Don’t miss out! Our next pop‑up events
        </h2>
      </div>

      {/* Grid of floating cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 max-w-7xl mx-auto">
        {upcoming.map((e, i) => {
          // format date
          const dt = new Date(e.date);
          const day = dt.toLocaleString(undefined, {
            day: "numeric",
            month: "short",
          });
          const time = dt.toLocaleString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <motion.div
              key={e.id}
              custom={i}
              variants={popVariant}
              animate="animate"
              className="relative flex flex-col overflow-hidden rounded-2xl shadow-lg w-full justify-center text-center bg-white"
            >
              {/* Wave animation at bottom */}
              <div className="absolute inset-x-0 bottom-0 z-1">
                <WaveAnimation
                  fill="var(--color-soft-beige)"
                  height={20}
                  amplitude={20}
                  speed={0.05}
                  points={3}
                />
              </div>

              {/* Header info */}
              <div className="border border-[var(--color-light-green)] p-6 flex-1 flex flex-col rounded-tl-2xl rounded-tr-2xl justify-between z-10">
                <h4 className="font-display text-h4 text-[var(--color-dark-green)]">
                  {e.title}
                </h4>
                <p className="font-subtitle text-h3 text-[var(--color-dark-green)]">
                  {day}
                </p>
                <p className="font-subtitle text-h3 text-[var(--color-dark-green)]">
                  {time}
                </p>
              </div>

              {/* Image */}
              <Link href={`/events/${e.id}`} className="block">
                <Image
                  src={e.image}
                  alt={e.title}
                  width={400}
                  height={400}
                  className="w-full object-cover"
                />
              </Link>

              {/* Footer info + button */}
              <div className="border border-[var(--color-light-green)] p-6 flex-1 flex flex-col rounded-bl-2xl rounded-br-2xl justify-between z-10">
                <p className="font-body text-body mb-4 hidden sm:block">
                  {e.description.length > 80
                    ? `${e.description.slice(0, 80)}…`
                    : e.description}
                </p>
                <Link href={`/events/${e.id}`}>
                  <Button
                    variant={
                      e.status === "sold out" ? "outlinePrimary" : "secondary"
                    }
                    disabled={e.status === "sold out"}
                  >
                    {e.status === "sold out" ? "Sold Out" : "Sign Up"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          );
        })}

        {/* Calendar CTA */}
        <div className="col-span-2 lg:col-span-4 flex justify-center items-center">
          <Link href="/calendar">
            <Button variant="outlinePrimary">VIEW FULL CALENDAR</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
