"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Vision", href: "#vision" },
  { label: "Traction", href: "#traction" },
];

const scrollTo = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between h-16">
        {/* Logo - left */}
        <button onClick={() => scrollTo("#top")} className="flex items-center gap-0.5 cursor-pointer shrink-0">
          <span className="font-bold text-foreground text-lg">Research</span>
          <span className="font-bold text-brand-accent text-lg">Guide</span>
        </button>

        {/* Desktop nav - centered */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA - right */}
        <div className="hidden md:block shrink-0">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button size="sm" onClick={() => scrollTo("#join-form")}>Get Early Access</Button>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground ml-auto" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border bg-background px-6 pb-4"
        >
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => { scrollTo(l.href); setOpen(false); }}
              className="block w-full text-left py-3 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {l.label}
            </button>
          ))}
          <Button size="sm" className="w-full mt-2" onClick={() => { scrollTo("#join-form"); setOpen(false); }}>
            Get Early Access
          </Button>
        </motion.div>
      )}
    </motion.nav>
  );
}
