"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Feature1 from "@/components/features/Feature1";
import Feature2 from "@/components/features/Feature2";
import Feature3 from "@/components/features/Feature3";
import Testimonial from "@/components/Testimonial";
import Events from "@/components/Events";
import Founder from "@/components/Founder";
import Story from "@/components/Story";
import Socials from "@/components/Socials";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const reveal = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid-mobile grid-desktop"
    >
      <main className="row-start-2">
        {[
          Hero,
          Intro,
          Feature1,
          Feature2,
          Feature3,
          Testimonial,
          Events,
          Founder,
          Story,
          Socials,
        ].map((Component, idx) => (
          <motion.section
            key={idx}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
          >
            <Component />
          </motion.section>
        ))}
      </main>
    </motion.div>
  );
}
