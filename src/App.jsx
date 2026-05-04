import CanvasLayout from "./three/CanvasLayout";
import { useState, useEffect } from "react";
import Overlay from "./components/layout/Overlay";

function App() {
  const [section, setSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = Math.round(window.scrollY / window.innerHeight);
      setSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-[400vh] bg-black">
      <CanvasLayout section={section} />
      <Overlay section={section} />
    </div>
  );
}

export default App;