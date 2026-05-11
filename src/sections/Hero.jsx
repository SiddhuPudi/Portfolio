import { motion } from "framer-motion";

const Hero = () => {
  const scrollToProjects = () => {
    // Projects section is at index 2 of 6 (0‑5). Each occupies full viewport height.
    const target = document.body.scrollHeight * (2 / 6);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-end px-8 sm:px-12 md:px-24 pb-20 overflow-hidden">
      {/* Watermark — subtle, positioned behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[18rem] md:text-[22rem] font-black text-white/[0.02] leading-none">PT</span>
      </div>

      {/* Content — left-aligned editorial layout */}
      <div className="relative z-10 max-w-3xl">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-sys-cyan" />
          <span className="text-sys-cyan text-[11px] font-mono tracking-[0.35em] uppercase">
            Full Stack Systems Engineer
          </span>
        </motion.div>

        {/* Name — large editorial type */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95]"
        >
          Pudi
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sys-cyan to-sys-purple">
            Thrivikram
          </span>
        </motion.h1>

        {/* Descriptor line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="mt-6 text-gray-500 text-sm md:text-base font-light tracking-wide max-w-md"
        >
          Building scalable systems · Real-time architecture · Interactive UI
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.4 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <button
            onClick={scrollToProjects}
            className="bg-white text-black font-mono text-xs font-semibold px-8 py-3.5 rounded-full hover:bg-sys-cyan hover:text-black transition-all duration-300 tracking-wider uppercase"
          >
            View Projects →
          </button>
          <a
            href="/PUDI_THRIVIKRAM.pdf"
            download="Pudi_Thrivikram_Resume.pdf"
            className="border border-white/15 text-white/80 font-mono text-xs px-8 py-3.5 rounded-full hover:border-white/40 hover:text-white transition-all duration-300 tracking-wider uppercase"
          >
            Download Resume ↓
          </a>
        </motion.div>
      </div>

      {/* Bottom stats bar — absolute, bottom-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 right-8 sm:right-12 md:right-24 flex items-center gap-8"
      >
        <div className="text-right">
          <div className="text-2xl font-light text-white tracking-tight">5+</div>
          <div className="font-mono text-[10px] text-gray-600 tracking-widest mt-0.5 uppercase">Projects</div>
        </div>
        <div className="h-6 w-px bg-white/10" />
        <div className="text-right">
          <div className="text-2xl font-light text-white tracking-tight">2+</div>
          <div className="font-mono text-[10px] text-gray-600 tracking-widest mt-0.5 uppercase">Years Coding</div>
        </div>
        <div className="h-6 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-[10px] text-gray-600 uppercase tracking-wider">Open to Work</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
