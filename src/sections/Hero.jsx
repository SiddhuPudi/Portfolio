import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="glass-panel p-10 md:p-16 rounded-3xl max-w-4xl w-full flex flex-col items-center border border-white/5 bg-black/30"
      >
        <div className="text-sys-cyan text-xs font-mono tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sys-cyan animate-pulse"></span>
          System Initialized
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4 text-white">
          Pudi <span className="text-gradient font-medium">Thrivikram</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
          Full Stack Systems Engineer
        </h2>
        
        <div className="mt-12 text-sm text-gray-500 font-mono tracking-widest uppercase">
          Building Interactive Digital Systems
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
