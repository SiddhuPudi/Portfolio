import CanvasLayout from "./three/CanvasLayout";
import CustomCursor from "./components/CustomCursor";
import { useState, useEffect, Suspense } from "react";
import Overlay from "./components/layout/Overlay";
import Preloader from "./components/layout/Preloader";
import ScrollProgress from "./components/layout/ScrollProgress";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

function App() {
  const [section, setSection] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (!loaded) return;
      // 6 sections total (0 to 5)
      const maxSections = 5;
      const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const current = Math.min(Math.round(scrollProgress * maxSections), maxSections);
      
      setSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loaded]);

  return (
    <div className="h-[600vh] bg-sys-bg">
      <ScrollProgress />
      <CustomCursor />
      <AnimatePresence mode="wait">
        {!loaded ? (
          <Preloader key="preloader" onComplete={() => setLoaded(true)} />
        ) : (
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            <Suspense fallback={
              <div className="fixed top-0 left-0 w-full h-screen z-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <span className="text-gray-600 text-sm font-mono tracking-wider">Loading 3D scene…</span>
              </div>
            }>
              <CanvasLayout section={section} />
            </Suspense>
            <AnimatePresence>
              <Overlay section={section} setSection={setSection} />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;