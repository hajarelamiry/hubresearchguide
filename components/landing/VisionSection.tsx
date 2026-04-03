"use client";
import { motion } from "framer-motion";

const pillars = ["Researchers", "Universities", "Industry", "Investors"];
const goals = ["Research collaboration", "Innovation commercialization", "Technology transfer"];

export default function VisionSection() {
  return (
    <section id="vision" className="py-24 bg-hero">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-brand-accent font-semibold text-sm uppercase tracking-wider mb-3">The Vision</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The global ecosystem where research meets opportunity
          </h2>
          <p className="opacity-70 text-lg mb-8">A platform connecting:</p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {pillars.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/10 border border-white/15 px-4 py-2 rounded-full text-sm font-medium"
              >
                {p}
              </motion.span>
            ))}
          </div>

          <p className="opacity-70 text-lg mb-6">Our goal is to accelerate:</p>
          <div className="flex flex-wrap justify-center gap-6">
            {goals.map((g) => (
              <span key={g} className="font-semibold text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                {g}
              </span>
            ))}
          </div>

          {/* Stats */}
<div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 border-t border-white/10 pt-12">
  {[
    { value: "+2000", label: "Experts" },
    { value: "+100", label: "Universities" },
    { value: "+50", label: "Companies" },
  ].map((stat, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="text-center"
    >
      <p className="text-4xl font-black text-brand-accent">{stat.value}</p>
      <p className="text-white/60 mt-1 text-xs uppercase tracking-widest">{stat.label}</p>
    </motion.div>
  ))}
</div>
        </motion.div>
      </div>
    </section>
  );
}
