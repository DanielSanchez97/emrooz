import { motion } from "motion/react";

const title = "emrooz";

const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 2.2 + i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center">
      {/* Layered background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 35%, rgba(27,58,107,0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(122,31,61,0.08) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 70%, rgba(160,82,45,0.06) 0%, transparent 40%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Title */}
        <h1 className="font-display text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight">
          {title.split("").map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              className="inline-block"
              style={{
                background: "linear-gradient(180deg, #F0E8D0 0%, #C69320 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Farsi subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.6, ease: "easeOut" }}
          className="font-display text-4xl sm:text-5xl mt-4 font-semibold text-cream/80"
          dir="rtl"
        >
          امروز
        </motion.p>

        {/* Decorative medallion line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.8, ease: "easeOut" }}
          className="mx-auto mt-6 flex items-center gap-3 justify-center"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
          <svg width="12" height="12" viewBox="0 0 12 12" className="text-gold/50">
            <polygon points="6,0 7.5,4.5 12,6 7.5,7.5 6,12 4.5,7.5 0,6 4.5,4.5" fill="currentColor" />
          </svg>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="absolute bottom-8 flex flex-col items-center text-gold/30"
        style={{ animation: "bounce-down 2s ease-in-out infinite" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
}
