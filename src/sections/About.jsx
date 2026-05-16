import { motion } from "framer-motion";

const About = () => {
  return (
    <div role="region" aria-label="About me" className="w-full h-auto min-h-screen overflow-visible pb-16 snap-none md:snap-start md:min-h-0 md:h-full flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-16 px-4 sm:px-8 md:px-20 md:pb-0">
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-center md:h-full md:max-h-none md:overflow-visible max-h-[70vh] overflow-y-auto">
      {/* RIGHT COLUMN — Profile Photo */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="flex-1 flex items-center justify-center w-full mt-12 md:mt-0 md:order-last"
      >
        {/* Outer glow ring */}
        <div className="relative">

          {/* Animated cyan glow behind the photo */}
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-sys-cyan/20 via-sys-purple/10 to-transparent blur-xl" />

          {/* Gradient border wrapper — 2px gradient border */}
          <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-sys-cyan via-sys-purple to-sys-cyan/20">

            {/* Photo container — aspect-[3/4] so it scales with column width */}
            <div className="relative w-64 md:w-full aspect-[3/4] max-w-xs rounded-2xl overflow-hidden bg-black mx-auto">

              <img
                src="/Thrivikram.png"
                alt="Pudi Thrivikram"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />

              {/* Scan line overlay for sci-fi feel */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)"
                }}
              />

              {/* Bottom gradient fade */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Corner accents */}
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-sys-cyan/70" />
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-sys-cyan/70" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-sys-purple/70" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-sys-purple/70" />

              {/* Name tag overlaid on bottom of photo */}
              <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
                <span className="font-mono text-xs text-white/80 tracking-widest uppercase">Pudi Thrivikram</span>
                <span className="font-mono text-[10px] text-sys-cyan/70 tracking-widest uppercase mt-0.5">Full Stack Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

        {/* LEFT COLUMN — Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="flex-1 flex items-center w-full md:order-first"
      >
        <div className="glass-panel p-6 pb-16 sm:p-10 rounded-2xl max-w-2xl border border-sys-cyan/20 w-full text-left">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-sys-purple"></div>
            <span className="text-sys-purple font-mono text-sm tracking-widest uppercase">System Logs</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-white">
            Architecting <span className="text-gradient">Scalable</span> Web Experiences
          </h2>
          
          <div className="space-y-4 text-gray-400 font-light text-sm md:text-base leading-relaxed">
            <p>
              I am a product-focused full stack engineer driven by a passion for interactive 
              UI systems and robust backend architecture. My approach treats every project 
              not just as code, but as a holistic digital system.
            </p>
            <p>
              From engineering real-time applications with Socket.IO and Docker to 
              experimenting with AI and NLP models, I build scalable systems that are 
              both technically powerful and visually immersive.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs text-sys-cyan">
            <span className="bg-sys-cyan/10 px-3 py-1.5 rounded-full border border-sys-cyan/20">System Builder</span>
            <span className="bg-sys-cyan/10 px-3 py-1.5 rounded-full border border-sys-cyan/20">Product Engineer</span>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default About;