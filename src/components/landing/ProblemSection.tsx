import { motion } from "framer-motion";
import { Search, Eye, Link2, Users, Clock } from "lucide-react";

const challenges = [
{ icon: Search, title: "Finding Funding", desc: "Difficulty finding relevant funding opportunities" },
{ icon: Eye, title: "Limited Visibility", desc: "Limited visibility for research projects and innovations" },
{ icon: Link2, title: "Weak Connections", desc: "Weak connections between academia and industry" },
{ icon: Users, title: "Expert Discovery", desc: "Lack of tools to discover experts and collaborators" },
{ icon: Clock, title: "Slow Transfer", desc: "Slow technology transfer from research to real-world applications" }];


export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14">
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Research Innovation Is <span className="text-brand-accent">Fragmented</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Researchers, universities, research institutes, and corporate struggle to collaborate efficiently.

          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {challenges.map((c, i) =>
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="bg-card rounded-xl p-5 shadow-card hover:shadow-elevated transition-shadow">
            
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-3">
                <c.icon size={18} className="text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{c.title}</h3>
              <p className="text-muted-foreground text-xs">{c.desc}</p>
            </motion.div>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 text-muted-foreground max-w-2xl mx-auto">
          
          <span className="font-semibold text-brand-accent">ResearchGuide</span> bridges these gaps by
          creating a global research collaboration and innovation marketplace.
        </motion.p>
      </div>
    </section>);

}