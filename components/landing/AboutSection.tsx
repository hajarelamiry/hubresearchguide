"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const cards = [
  {
    iconSrc: "../images/favicon.svg",
    title: "Connecting Ideas to Experts",
    description:
      "ResearchGuide is a platform that connects organizations with vetted researchers, PhDs, and on-demand R&D experts, streamlining the path from idea to innovation. It offers pre-project consulting, dedicated R&D teams, post-project support, and smart matchmaking to ensure the right expertise is applied at every stage. Developed by MONARK IT, ResearchGuide is built to transform complex research processes into a seamless, results-driven experience.",
    topBar: "bg-gradient-to-r from-orange-400 to-orange-600",
    iconBg: "bg-orange-50",
  },
  {
    iconSrc: "../images/Favicon MONARK IT WHITE.svg",
    title: "Behind the Vision",
    description:
      "MONARK IT was founded by Dr. Salim El Bouanani, a PhD and seasoned entrepreneur, with a simple but powerful vision: serious innovation requires serious talent. Drawing on his own research background, he set out to connect ambitious projects with the rare professionals who can truly deliver. From early collaborations in Europe and North America to its official launch in Qatar in 2025 and incubation at QSTP in 2026, ResearchGuide has grown into a trusted network of researchers, PhDs, and on-demand experts, turning complexity into measurable impact.",
    topBar: "bg-gradient-to-r from-violet-800/90 to-indigo-600",
    iconBg: "bg-violet-800/90",
  },
];

export default function AboutUsSection() {
  return (
    <section id="about" className="py-24 bg-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-screen-2xl relative">
        {/* Header */}
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
            The Story Behind the Platform
          </h2>
        </motion.div>

        {/* 2 Cards côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Barre colorée en haut */}
              <div className={`h-1.5 w-full ${card.topBar}`} />

              <div className="p-10 md:p-12 flex flex-col flex-1">
                {/* Icône + Titre sur la même ligne */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                    <Image
                      src={card.iconSrc}
                      alt={card.title}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                    {card.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-base leading-relaxed flex-1">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}