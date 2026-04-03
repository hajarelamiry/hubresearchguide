"use client";
import { motion } from "framer-motion";
import { Building2, Lightbulb, Code2, Globe2 } from "lucide-react";


export default function AboutUsSection() {
  return (
    <section id="about" className="py-24 bg-muted/50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-brand-accent font-semibold text-sm uppercase tracking-wider mb-3">
            About Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
            Built by Builders Who Believe in Science
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            ResearchGuide is developed by{" "}
            <span className="text-foreground font-semibold">Monarkit</span>, a
            software company dedicated to building meaningful digital products
            that bridge technology and human progress.
          </p>
        </motion.div>

        {/* Monarkit card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-card mb-12 flex flex-col md:flex-row gap-8 items-start"
        >
          {/* Logo placeholder */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shadow-sm">
              <Building2 size={28} className="text-accent-foreground" />
            </div>
          </div>

          <div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded by Salim El Bouanani, a PhD and seasoned entrepreneur, MONARK IT was built on a simple observation: serious innovation requires serious talent. Drawing on his own research background, he set out to connect ambitious projects with the rare professionals who can truly deliver. From early partnerships across Europe and North America, to the official establishment of MONARK IT L.L.C in Qatar in 2025 and the incubation of ResearchGuide at QSTP in 2026, the platform has grown into a trusted network of vetted researchers, PhDs, and on-demand experts — transforming complexity into measurable impact.
            </p>
            
          </div>
        </motion.div>

       
      </div>
    </section>
  );
}