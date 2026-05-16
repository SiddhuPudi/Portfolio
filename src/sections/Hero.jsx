import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainerSlow } from "../animations/variants";
import MagneticButton from "../components/MagneticButton";
import { siteConfig } from "../data/config";
const Hero = () => {
  const scrollToProjects = () => {
    // Projects section is at index 2 of 6 (0‑5). Each occupies full viewport height.
    const target = document.body.scrollHeight * (2 / 6);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section role="main" aria-label="Hero introduction" className="relative w-full h-screen flex flex-col justify-end px-4 sm:px-12 md:px-24 pb-20 md:pb-20 overflow-hidden">
      {/* Watermark — subtle, positioned behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[12rem] md:text-[22rem] font-black text-white/[0.02] leading-none">PT</span>
      </div>

      {/* Content — left-aligned editorial layout on desktop, centered on mobile */}
      <motion.div 
        variants={staggerContainerSlow}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-3xl flex flex-col items-center text-center md:items-start md:text-left pt-20 md:pt-0"
      >
        {/* Eyebrow label */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-sys-cyan" />
          <span className="text-sys-cyan text-[11px] font-mono tracking-[0.35em] uppercase">
            {siteConfig.role}
          </span>
          <span className="h-px w-10 bg-sys-cyan md:hidden" />
        </motion.div>

        {/* Name — large editorial type */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95]"
        >
          Pudi
          <br className="hidden md:block" />
          <span className="md:hidden"> </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sys-cyan to-sys-purple">
            Thrivikram
          </span>
        </motion.h1>

        {/* Descriptor line */}
        <motion.p
          variants={fadeIn}
          className="mt-6 text-gray-500 text-base md:text-base font-light tracking-wide max-w-md"
        >
          Building scalable systems · Real-time architecture · Interactive UI
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col md:flex-row gap-3 w-full md:w-auto"
        >
          <MagneticButton
            onClick={scrollToProjects}
            aria-label="View projects section"
            className="w-full md:w-auto bg-white text-black font-mono text-xs font-semibold px-8 py-4 md:py-3.5 rounded-full hover:bg-sys-cyan hover:text-black transition-all duration-300 tracking-wider uppercase block text-center min-h-[44px]"
          >
            View Projects →
          </MagneticButton>
          <MagneticButton
            href={siteConfig.resumeUrl}
            download={siteConfig.resumeDownloadName}
            aria-label="Download resume PDF"
            className="w-full md:w-auto border border-white/15 text-white/80 font-mono text-xs px-8 py-4 md:py-3.5 rounded-full hover:border-white/40 hover:text-white transition-all duration-300 tracking-wider uppercase block text-center min-h-[44px]"
          >
            Download Resume ↓
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Bottom stats bar — absolute, bottom-left */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-0 left-0 justify-center md:left-auto md:right-24 flex items-center gap-4 sm:gap-8 scale-75 sm:scale-100 md:scale-100"
      >
        {siteConfig.stats.map((s, i) => (
          <div key={s.label} className="flex items-center gap-4 sm:gap-8">
            <div className={i === 0 ? "text-right md:text-right" : "text-center md:text-right"}>
              <div className="text-2xl font-light text-white tracking-tight">{s.value}</div>
              <div className="font-mono text-[10px] text-gray-600 tracking-widest mt-0.5 uppercase">{s.label}</div>
            </div>
            <div className="h-6 w-px bg-white/10" />
          </div>
        ))}
        {siteConfig.openToWork && (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[10px] text-gray-600 uppercase tracking-wider">Open to Work</span>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Hero;
