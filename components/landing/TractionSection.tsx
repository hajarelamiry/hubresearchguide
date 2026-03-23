"use client";
import { motion } from "framer-motion";
import { Globe, TrendingUp, FlaskConical, Rocket } from "lucide-react";

const stats = [
  { value: "129", label: "Countries reached", Icon: Globe },
  { value: "Growing", label: "Research community interest", Icon: TrendingUp },
  { value: "Active", label: "Pilot discussions with labs", Icon: FlaskConical },
  { value: "Rising", label: "Demand for research promotion", Icon: Rocket },
];

export default function TractionSection() {
  return (
    <section id="traction" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-brand-accent font-semibold text-sm uppercase tracking-wider mb-3">Early Traction</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Global reach from day one
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card text-center"
            >
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mx-auto mb-3">
                <s.Icon size={20} className="text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground tabular-nums mb-1">{s.value}</div>
              <p className="text-muted-foreground text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
