import { motion } from "framer-motion";

const sections = ["Hero", "About", "Projects", "Skills", "Education", "Contact"];

const SectionNav = ({ currentSection }) => {
  const scrollToSection = (index) => {
    // 6 sections total, viewport height is 600vh.
    const maxSections = sections.length - 1;
    const targetScroll = (index / maxSections) * (document.body.scrollHeight - window.innerHeight);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 pointer-events-auto">
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
  );
};

export default SectionNav;
