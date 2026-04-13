import { motion } from "motion/react";

export default function AnimatedDivider() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.0, duration: 1.0 }}
      className="relative w-full overflow-hidden py-0.5"
      aria-hidden="true"
    >
      <div
        className="flex w-max opacity-40"
        style={{ animation: "scroll-left 40s linear infinite" }}
      >
        <img src="/patterns/border.svg" alt="" className="h-5 w-auto flex-shrink-0" />
        <img src="/patterns/border.svg" alt="" className="h-5 w-auto flex-shrink-0" />
        <img src="/patterns/border.svg" alt="" className="h-5 w-auto flex-shrink-0" />
        <img src="/patterns/border.svg" alt="" className="h-5 w-auto flex-shrink-0" />
      </div>
    </motion.div>
  );
}
