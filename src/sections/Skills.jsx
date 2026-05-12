import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiJavascript, SiPython, SiReact, SiHtml5,
  SiCss, SiTailwindcss, SiNodedotjs, SiExpress,
  SiMongodb, SiPostgresql, SiMysql, SiGit,
  SiDocker, SiRedis, SiVercel,
  SiThreedotjs, SiFramer, SiJsonwebtokens,
  SiGithub
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
      { icon: TbBrain,        name: "TF-IDF",          color: "#8B5CF6" },
      { icon: FiLayers,       name: "NLP Evaluation",  color: "#06B6D4" },
      { icon: TbVectorBezier2,name: "Text Processing", color: "#34D399" },
      { icon: FiFileText,     name: "Document QA",     color: "#F472B6" },
    ]
  }
];

const SkillPill = ({ skill, delay }) => {
  const [showTip, setShowTip] = useState(false);
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, type: "spring", stiffness: 280, damping: 18 }}
      className="relative flex flex-col items-center"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      {/* Icon box */}
      <motion.div
        whileHover={{ scale: 1.28, y: -8, rotate: 4 }}
        whileTap={{ scale: 0.94 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center cursor-default relative"
        style={{
          background: "linear-gradient(135deg, #0d0d1a 0%, #0a0a12 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: skill.color,
          transition: "border-color 0.25s, box-shadow 0.25s, background 0.25s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = skill.color + "70";
          e.currentTarget.style.boxShadow =
            `0 0 28px ${skill.color}40, 0 0 8px ${skill.color}20`;
          e.currentTarget.style.background =
            `linear-gradient(135deg, ${skill.color}15 0%, #0a0a12 100%)`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.background =
            "linear-gradient(135deg, #0d0d1a 0%, #0a0a12 100%)";
        }}
      >
        <Icon size={30} />
      </motion.div>

      {/* Tooltip below icon on hover */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 font-mono text-[10px] text-gray-400 bg-[#0a0a12] border border-white/[0.08] px-2 py-1 rounded-md whitespace-nowrap z-10 pointer-events-none"
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
    <section role="region" aria-label="Skills and technologies" className="w-full h-full flex flex-col justify-center items-center px-8 md:px-16 py-10 overflow-y-auto hide-scrollbar">

      {/* Header — full width centered */}
      <div className="w-full max-w-5xl mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-12 bg-sys-cyan flex-shrink-0" />
          <span className="font-mono text-xs text-sys-cyan tracking-widest uppercase whitespace-nowrap">
            04 // Capabilities
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-white leading-none mt-2">
          Core <span className="text-gradient">Arsenal.</span>
        </h2>
        <div className="h-[2px] w-20 bg-sys-cyan mt-5" />
      </div>

      {/* All categories — full width, generous spacing */}
      <div className="w-full max-w-5xl flex flex-col gap-12">
        {CATEGORIES.map((cat, ci) => {
          return (
            <div key={cat.id}>

              {/* Category label with side line */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: ci * 0.07 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  {cat.label}
                </span>
                <div className="h-px flex-1 bg-white/[0.04]" />
              </motion.div>

              {/* Icon pill row — wraps on smaller screens */}
              <div className="flex flex-wrap gap-4">
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