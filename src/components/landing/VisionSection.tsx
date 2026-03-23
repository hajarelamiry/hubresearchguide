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
        </motion.div>
      </div>
    </section>
  );
}
