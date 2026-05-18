import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiJavascript, SiPython, SiReact, SiHtml5,
  SiCss, SiTailwindcss, SiNodedotjs, SiExpress,
  SiMongodb, SiPostgresql, SiMysql, SiGit,
  SiDocker, SiRedis, SiVercel,
  SiThreedotjs, SiFramer, SiJsonwebtokens,
  SiGithub, SiScikitlearn, SiSpacy, SiPandas, SiHuggingface, SiNumpy
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscTerminalCmd } from "react-icons/vsc";
import { TbBrandCpp, TbBrain, TbVectorBezier2, TbApi } from "react-icons/tb";
import { FiLayers, FiFileText } from "react-icons/fi";

const CATEGORIES = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { icon: VscTerminalCmd, name: "C",          color: "#A8B9CC" },
      { icon: TbBrandCpp,     name: "C++",        color: "#00599C" },
      { icon: SiJavascript,   name: "JavaScript", color: "#F7DF1E" },
      { icon: SiPython,       name: "Python",     color: "#3776AB" },
      { icon: FaJava,         name: "Java",       color: "#ED8B00" },
    ]
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { icon: SiReact,       name: "React",         color: "#61DAFB" },
      { icon: SiHtml5,       name: "HTML5",         color: "#E34F26" },
      { icon: SiCss,        name: "CSS3",          color: "#1572B6" },
      { icon: SiTailwindcss, name: "Tailwind",      color: "#06B6D4" },
      { icon: SiThreedotjs,  name: "Three.js",      color: "#ffffff" },
      { icon: SiFramer,      name: "Framer Motion", color: "#A78BFA" },
    ]
  },
  {
    id: "backend",
    label: "Backend & Database",
    skills: [
      { icon: SiNodedotjs,     name: "Node.js",    color: "#339933" },
      { icon: SiExpress,       name: "Express.js", color: "#ffffff" },
      { icon: TbApi,           name: "REST APIs",  color: "#6366F1" },
      { icon: SiJsonwebtokens, name: "JWT Auth",   color: "#F59E0B" },
      { icon: SiMongodb,       name: "MongoDB",    color: "#47A248" },
      { icon: SiPostgresql,    name: "PostgreSQL", color: "#4479A1" },
      { icon: SiMysql,         name: "MySQL",      color: "#00758F" },
    ]
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    skills: [
      { icon: SiGit,        name: "Git",       color: "#F05032" },
      { icon: SiGithub,     name: "GitHub",    color: "#ffffff" },
      { icon: SiDocker,     name: "Docker",    color: "#2496ED" },
      { icon: SiRedis,      name: "Redis",     color: "#FF4438" },
      { icon: SiVercel,     name: "Vercel",    color: "#ffffff" },
    ]
  },
  {
    id: "ai",
    label: "AI / NLP",
    skills: [
      { icon: SiScikitlearn,   name: "scikit-learn", color: "#F7931E" },
      { icon: FiLayers,        name: "NLTK",         color: "#3776AB" },
      { icon: SiHuggingface,   name: "Hugging Face", color: "#FFD21E" },
      { icon: SiSpacy,         name: "spaCy",        color: "#09A3D5" },
      { icon: SiPandas,        name: "Pandas",       color: "#150458" },
      { icon: SiNumpy,         name: "NumPy",        color: "#4D77CF" },
    ]
  }
];

const SkillPill = ({ skill, delay }) => {
  const [showTip, setShowTip] = useState(false);
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 280, damping: 18 }}
      className="relative flex flex-col items-center w-full sm:w-auto"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      {/* Icon box */}
      <motion.div
        whileHover={{ scale: 1.28, y: -8, rotate: 4 }}
        whileTap={{ scale: 0.94 }}
        className="w-full sm:w-16 p-3 sm:p-0 h-auto sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-start sm:justify-center gap-3 sm:gap-0 cursor-default relative"
        style={{
          background: "linear-gradient(135deg, #0d0d1a 0%, #0a0a12 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: skill.color,
          transition: "border-color 0.25s, box-shadow 0.25s, background 0.25s",
        }}
        onMouseEnter={e => {
          if (window.innerWidth >= 640) {
            e.currentTarget.style.borderColor = skill.color + "70";
            e.currentTarget.style.boxShadow =
              `0 0 28px ${skill.color}40, 0 0 8px ${skill.color}20`;
            e.currentTarget.style.background =
              `linear-gradient(135deg, ${skill.color}15 0%, #0a0a12 100%)`;
          }
        }}
        onMouseLeave={e => {
          if (window.innerWidth >= 640) {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.background =
              "linear-gradient(135deg, #0d0d1a 0%, #0a0a12 100%)";
          }
        }}
      >
        <Icon size={30} className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px]" />
        {/* Mobile label */}
        <span className="sm:hidden font-mono text-xs text-gray-300 truncate">
          {skill.name}
        </span>
      </motion.div>

      {/* Tooltip below icon on hover (desktop only) */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            className="hidden sm:block absolute top-full mt-2 font-mono text-[10px] text-gray-400 bg-[#0a0a12] border border-white/[0.08] px-2 py-1 rounded-md whitespace-nowrap z-10 pointer-events-none"
          >
            {skill.name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Skills = () => {
  let delayCounter = 0;

  return (
    <section role="region" aria-label="Skills and technologies" className="w-full h-auto min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 py-10 overflow-y-auto hide-scrollbar">

      {/* Header — full width centered */}
      <div className="w-full max-w-5xl mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-12 bg-sys-cyan flex-shrink-0" />
          <span className="font-mono text-xs text-sys-cyan tracking-widest uppercase whitespace-nowrap" aria-hidden="true">
            04 // Capabilities
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-none mt-2">
          Core <span className="text-gradient">Arsenal.</span>
        </h2>
        <div className="h-[2px] w-20 bg-sys-cyan mt-5" />
      </div>

      {/* All categories — full width, generous spacing */}
      <div className="w-full max-w-5xl flex flex-col gap-12 max-h-[70vh] overflow-y-auto md:max-h-none md:overflow-visible pr-2 md:pr-0">
        {CATEGORIES.map((cat, ci) => {
          return (
            <div key={cat.id}>

              {/* Category label with side line */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: ci * 0.07 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  {cat.label}
                </span>
                <div className="h-px flex-1 bg-white/[0.04]" />
              </motion.div>

              {/* Icon pill row — wraps on smaller screens */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 w-full">
                {cat.skills.map(s => {
                  const d = 0.025 * delayCounter++;
                  return (
                    <SkillPill key={s.name} skill={s} delay={d} />
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};

export default Skills;