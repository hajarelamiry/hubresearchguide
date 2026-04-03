import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 bg-section-dark border-t border-white/10 w-full">
      <div className="w-full flex justify-between items-start px-10 md:px-20">

        {/* Logo à gauche */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 mb-2">
            <span className="font-bold text-lg text-white">Research</span>
            <span className="font-bold text-lg text-orange-500">Guide</span>
          </div>
          <p className="text-sm text-white/60">
            Ecosystem promoting Research and Scientific Innovation.
          </p>
          <p className="text-xs text-white/50 mt-1">
            © 2026 ResearchGuide. All rights reserved.
          </p>
        </div>

        {/* Contact Us à droite */}
        <div className="flex flex-col gap-3 text-base text-white/60 flex-shrink-0">
          <h4 className="font-display text-lg text-white mb-4">Contact Us</h4>

          <p className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <span className="text-white/80">MONARK IT LLC</span>
          </p>

          <p className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
              +974 3383 7805
            
          </p>

          <p className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
            <a
              href="mailto:contact@monarkit.qa"
              className="text-white/80 hover:text-white transition-colors"
            >
              contact@researchguide.net
            </a>
          </p>

          <p className="text-xs text-white/60 uppercase tracking-widest">Headquarters</p>
          <p className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />

            <a href="https://maps.app.goo.gl/FvFtdNMDUcdWmsWd6" target="_blank" rel="noopener noreferrer"
                className="hover:text-orange-500 text-white/80 underline underline-offset-2">
                Unit 210-88, Floor 2, Tech 2 Building, QSTP, Doha, Qatar
            </a>
          </p>

          <div className="mt-4 pl-2 border-l-2 border-white/40 flex flex-col gap-2">
              <p className="text-xs text-white/60 uppercase tracking-widest">Branch Offices</p>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                <a href="https://maps.app.goo.gl/BKYwJ66qBWtWyENg8" target="_blank" rel="noopener noreferrer"
                  className="hover:text-orange-500 text-white/50 underline underline-offset-2">
                  Office 18, 5th Floor, Bergis Business Center, Boulevard Safi, MARRAKECH
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                <a href="https://maps.app.goo.gl/xksoJyDuF1Smvw6P7" target="_blank" rel="noopener noreferrer"
                  className="hover:text-orange-500 text-white/50 underline underline-offset-2">
                  23 Arset Qortobi, Marrakech
                </a>
              </div>
            </div>
        </div>

      </div>
    </footer>
  );
}