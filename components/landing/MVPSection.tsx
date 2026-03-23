"use client";
import { motion } from "framer-motion";
import { FlaskConical, Building2, Briefcase, Globe } from "lucide-react";

const points = [
{ icon: FlaskConical, text: "Researchers showcase their research projects and innovations" },
{ icon: Building2, text: "Institutions connect with experts and collaborators" },
{ icon: Briefcase, text: "Companies discover cutting-edge technologies and research talent" },
{ icon: Globe, text: "Users access global funding opportunities" }];


export default function MVPSection() {
  return (
    <section id="solution" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          
          <p className="text-brand-accent font-semibold text-sm uppercase tracking-wider mb-3">OUR SOLUTION</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            A Smart Research & Innovation Marketplace
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            ResearchGuide is building an AI-powered platform where:
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 text-left">
          {points.map((p, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 items-center bg-card rounded-xl p-5 shadow-card">
            
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <p.icon size={18} className="text-accent-foreground" />
              </div>
              <p className="text-foreground font-medium text-sm">{p.text}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}