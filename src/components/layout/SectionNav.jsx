import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TbMenu2, TbX } from "react-icons/tb";

const sections = ["Hero", "About", "Projects", "Skills", "Education", "Contact"];

const SectionNav = ({ currentSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (index) => {
    setMenuOpen(false);
    // 6 sections total, viewport height is 600vh.
    const maxSections = sections.length - 1;
    const targetScroll = (index / maxSections) * (document.body.scrollHeight - window.innerHeight);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* Desktop Dot Nav */}
      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-50 pointer-events-auto">
        {sections.map((label, index) => {
          const isActive = currentSection === index;
          return (
            <div 
              key={index}
              className="group relative flex items-center justify-center w-6 h-6 cursor-pointer"
              onClick={() => scrollToSection(index)}
            >
              {/* Tooltip */}
              <div className="absolute right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs text-sys-cyan bg-black/60 px-2 py-1 rounded border border-sys-cyan/20 whitespace-nowrap pointer-events-none">
                {label}
              </div>

              {/* Dot */}
              <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isActive ? "bg-sys-cyan" : "bg-white/10"}`} />

              {/* Active Pulse */}
              {isActive && (
                <motion.div
                  layoutId="activeNavDot"
                  className="absolute inset-0 rounded-full border border-sys-cyan"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden fixed top-6 right-6 z-[60] pointer-events-auto">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-md"
        >
          {menuOpen ? <TbX size={24} /> : <TbMenu2 size={24} />}
        </button>
      </div>

      {/* Mobile Full-Width Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col gap-8 w-full px-8">
              {sections.map((label, index) => {
                const isActive = currentSection === index;
                return (
                  <button
                    key={index}
                    onClick={() => scrollToSection(index)}
                    className={`text-2xl font-mono uppercase tracking-widest text-center py-4 w-full transition-colors ${isActive ? "text-sys-cyan font-bold" : "text-white/70"}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionNav;
