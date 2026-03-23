import { motion } from "framer-motion";
import { FolderOpen, DollarSign, Users, Bot, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
{
  title: "Research & Innovation Portfolio",
  desc: "Researchers can publish and showcase:",
  items: ["Research projects", "Innovation concepts", "Scientific expertise", "Collaboration opportunities"],
  footer: "This creates a global portfolio of research innovation.",
  Icon: FolderOpen,
  color: "from-[#F05A26]/20 to-[#F05A26]/5",
  iconBg: "bg-[#F05A26]/20",
  iconColor: "text-[#F05A26]"
},
{
  title: "Funding Opportunity Engine",
  desc: "Discover relevant funding opportunities such as:",
  items: ["Research grants", "Innovation programs", "Industrial partnerships", "Venture funding"],
  footer: "AI helps match researchers with the most relevant funding sources.",
  Icon: DollarSign,
  color: "from-[#10B981]/20 to-[#10B981]/5",
  iconBg: "bg-[#10B981]/20",
  iconColor: "text-[#10B981]"
},
{
  title: "Researcher & Expert Directory",
  desc: "A centralized directory including:",
  items: ["Researchers", "PhD experts", "Mentors", "Institutions", "Industry partners", "Scientific journals"],
  footer: "Making it easier to discover collaborators and build research teams.",
  Icon: Users,
  color: "from-[#8B5CF6]/20 to-[#8B5CF6]/5",
  iconBg: "bg-[#8B5CF6]/20",
  iconColor: "text-[#8B5CF6]"
},
{
  title: "AI Collaboration Matchmaking",
  desc: "The platform suggests:",
  items: ["Potential collaborators", "Relevant funding opportunities", "Industry partnerships"],
  footer: "Powered by an AI orchestration layer.",
  Icon: Bot,
  color: "from-[#3B82F6]/20 to-[#3B82F6]/5",
  iconBg: "bg-[#3B82F6]/20",
  iconColor: "text-[#3B82F6]"
}];


const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }
  }
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 bg-section-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#F05A26]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-brand-accent font-semibold text-sm uppercase tracking-wider mb-4 bg-brand-accent/10 px-4 py-1.5 rounded-full">CORE FEATURES


          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Everything you need to connect
            <br />
            <span className="text-brand-accent">research & innovation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A comprehensive toolkit designed to bridge the gap between researchers, universities, research institutes, funders, and industry partners.

          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6">
          
          {features.map((f) =>
          <motion.div
            key={f.title}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className={`group relative bg-gradient-to-br ${f.color} backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/25 transition-all duration-300 cursor-default`}>
            
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-300" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 rounded-2xl ${f.iconBg} flex items-center justify-center`}>
                  
                    <f.Icon size={24} className={f.iconColor} />
                  </motion.div>
                  <ArrowRight
                  size={18}
                  className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300 mt-2" />
                
                </div>

                <h3 className="text-xl font-bold mb-3 text-white">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {f.desc}
                </p>

                <div className="space-y-2 mb-5">
                  {f.items.map((item, idx) =>
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.08 }}
                  className="flex items-center gap-2.5">
                  
                      <CheckCircle2 size={14} className={`${f.iconColor} shrink-0`} />
                      <span className="text-sm text-white/70">{item}</span>
                    </motion.div>
                )}
                </div>
                <p className="text-sm text-white/60 italic">{f.footer}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>);

}