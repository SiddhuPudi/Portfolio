import About from "../../sections/About";
import Projects from "../../sections/Projects";
import Skills from "../../sections/Skills";

const Overlay = ({ section }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10">
            {section === 1 && <About />}
            {section === 2 && <Projects />}
            {section === 3 && <Skills />}
        </div>
    );
};

export default Overlay;