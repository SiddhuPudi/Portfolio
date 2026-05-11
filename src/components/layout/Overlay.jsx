import { motion } from "framer-motion";
import Hero from "../../sections/Hero";
import About from "../../sections/About";
import Projects from "../../sections/Projects";
import Skills from "../../sections/Skills";
import Resume from "../../sections/Resume";
import Contact from "../../sections/Contact";

const overlayVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Overlay = ({ section }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10 flex flex-col justify-center">
      <motion.div
        key={section}
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-full absolute inset-0 pointer-events-auto"
      >
        {section === 0 && <Hero />}
        {section === 1 && <About />}
        {section === 2 && <Projects />}
        {section === 3 && <Skills />}
        {section === 4 && <Resume />}
        {section === 5 && <Contact />}
      </motion.div>
    </div>
  );
};

export default Overlay;