import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-research.png";

const scrollToForm = () => {
  document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" });
};

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden min-h-[90vh] flex items-center"
    >
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] mb-5 text-white">
            The AI Platform Connecting{" "}
            <span className="text-brand-accent">Research</span>, Funding and Innovation
          </h1>
          <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-white/80">
            ResearchGuide helps researchers, universities and companies discover funding
            opportunities, showcase research projects, and connect with experts to turn ideas
            into real-world innovations.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }}>
              <Button variant="secondary" size="lg" onClick={scrollToForm} className="gap-2">
                Join the Research Network <ArrowRight size={16} />
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }}>
              <Button variant="hero-outline" size="lg" onClick={scrollToForm}>
                Explore Research Projects
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }}>
              <Button variant="hero-outline" size="lg" onClick={scrollToForm}>
                Discover Funding Opportunities
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
