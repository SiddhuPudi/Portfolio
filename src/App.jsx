import CanvasLayout from "./three/CanvasLayout";
import CustomCursor from "./components/CustomCursor";
import { useState, useEffect } from "react";
import Overlay from "./components/layout/Overlay";
import Preloader from "./components/layout/Preloader";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [section, setSection] = useState(0);
  const [loaded, setLoaded] = useState(false);

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
      <CustomCursor />
      <AnimatePresence mode="wait">
        {!loaded ? (
          <Preloader key="preloader" onComplete={() => setLoaded(true)} />
        ) : (
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CanvasLayout section={section} />
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