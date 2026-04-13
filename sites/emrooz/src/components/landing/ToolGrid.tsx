import { motion } from "motion/react";
import ToolCard from "./ToolCard";

interface Tool {
  title: string;
  description: string;
  icon: string;
  status: "planned" | "in-progress" | "live";
  path: string;
}

interface ToolGridProps {
  tools: Tool[];
}

export default function ToolGrid({ tools }: ToolGridProps) {
  return (
    <section className="relative max-w-3xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl font-bold text-cream">What's Inside</h2>
        <div className="mt-4 mx-auto flex items-center gap-2 justify-center">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-rust/40" />
          <div className="h-px w-6 bg-gold/40" />
          <svg width="8" height="8" viewBox="0 0 8 8" className="text-gold/40">
            <polygon points="4,0 5,3 8,4 5,5 4,8 3,5 0,4 3,3" fill="currentColor" />
          </svg>
          <div className="h-px w-6 bg-gold/40" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-rust/40" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.path}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
          >
            <ToolCard {...tool} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
