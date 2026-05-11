import { motion } from "framer-motion";
import { Download } from "lucide-react";

const Resume = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-12 rounded-3xl max-w-xl w-full text-center border border-sys-purple/20 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sys-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="text-sys-purple font-mono text-xs tracking-[0.3em] uppercase mb-8 relative z-10">
          System Blueprint
        </div>
        
        <h2 className="text-3xl font-light text-white mb-6 relative z-10">
          Download Engineering Profile
        </h2>
        
        <p className="text-gray-400 font-light mb-10 text-sm relative z-10">
          Acquire the complete technical specifications, work history, and educational background.
        </p>
        
        <motion.a
          href="/Pudi_Thrivikram_Resume.pdf"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-sys-purple/10 border border-sys-purple/30 rounded-full text-sys-purple hover:bg-sys-purple/20 hover:border-sys-purple/50 transition-colors"
        >
          <span className="font-mono text-sm tracking-widest uppercase">Initialize Download</span>
          <Download size={18} />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Resume;
