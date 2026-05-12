import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  // Apply a spring to the scroll progress for a smoother, slightly delayed trailing effect
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed left-0 top-0 w-1 md:w-1.5 h-screen bg-white/[0.03] z-[9998] pointer-events-none">
      <motion.div 
        className="w-full bg-gradient-to-b from-sys-cyan to-sys-purple origin-top shadow-[0_0_12px_#00f0ff]"
        style={{ scaleY }}
      />
    </div>
  );
};

export default ScrollProgress;
