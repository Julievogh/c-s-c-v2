import { motion } from "framer-motion";

export default function Loader() {
  const waveTransition = {
    repeat: Infinity,
    repeatType: "loop",
    duration: 1,
    ease: "easeInOut",
  };

  const waveVariants = {
    start: { y: 0 },
    end: { y: [-10, 10, -10] },
  };

  const colors = [
    "var(--color-deep-wine)",
    "var(--color-terracotta)",
    "var(--color-dark-green)",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--color-warm-white)]">
      <div className="flex gap-2">
        {colors.map((color, i) => (
          <motion.div
            key={i}
            className="w-4 h-8 rounded-full"
            style={{ backgroundColor: color }}
            variants={waveVariants}
            initial="start"
            animate="end"
            transition={{ ...waveTransition, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
