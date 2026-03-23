import { motion } from "framer-motion";
import { FlaskConical, GraduationCap, Building, TrendingUp } from "lucide-react";

const useCases = [
  {
    title: "For Researchers",
    Icon: FlaskConical,
    points: [
      "Showcase research and innovations",
      "Access funding opportunities",
      "Find collaborators and mentors",
    ],
  },
  {
    title: "For Universities & Labs",
    Icon: GraduationCap,
    points: [
      "Discover talent",
      "Promote research projects",
      "Build partnerships with industry",
    ],
  },
  {
    title: "For Companies",
    Icon: Building,
    points: [
      "Discover research innovations",
      "Partner with scientists",
      "Access deep-tech expertise",
    ],
  },
  {
    title: "For Investors",
    Icon: TrendingUp,
    points: [
      "Curated deeptech deals from labs",
      "Spot innovations early with AI",
      "Explore emerging tech",
      "Connect with researchers",
    ],
  },
];

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-brand-accent font-semibold text-sm uppercase tracking-wider mb-3">Use Cases</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Built for every actor in the research ecosystem
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-7 shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-4">
                <uc.Icon size={20} className="text-accent-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-4">{uc.title}</h3>
              <ul className="space-y-3">
                {uc.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-brand-accent mt-0.5 font-bold">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
