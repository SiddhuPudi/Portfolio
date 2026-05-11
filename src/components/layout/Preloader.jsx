import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fill progress from 0 to 100 over 2.2 seconds
    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 300); // Small delay to reach 2.5s total before unmounting
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] font-mono text-sys-cyan"
    >
      <div className="flex flex-col items-center w-64">
        {/* Pulsing dot */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-3 h-3 bg-sys-cyan rounded-full mb-6"
        />

        {/* Text */}
        <div className="text-sm tracking-widest uppercase mb-4 w-full text-center">
          SYSTEM INITIALIZING...
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          {/* Progress Fill */}
          <div
            className="h-full bg-sys-cyan transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <div className="mt-2 text-xs text-gray-500 font-mono self-end">
          {Math.round(progress)}%
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
