import CanvasLayout from "./three/CanvasLayout";
import { useState, useEffect } from "react";
import Overlay from "./components/layout/Overlay";
import { AnimatePresence } from "framer-motion";

function App() {
  const [section, setSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 6 sections total (0 to 5)
      const maxSections = 5;
      const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const current = Math.min(Math.round(scrollProgress * maxSections), maxSections);
      
      setSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-[600vh] bg-sys-bg">
      <CanvasLayout section={section} />
      <AnimatePresence>
        <Overlay section={section} />
      </AnimatePresence>
    </div>
  );
}

export default App;