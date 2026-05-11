import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Server, Database, Cpu, Brain } from "lucide-react";

const skillData = [
  {
    id: "frontend",
    title: "Frontend",
    icon: <Layout size={18} />,
    subtitle: "Client-side systems & interactive UI",
    skills: [
      { name: "React", tier: "core" },
      { name: "JavaScript", tier: "core" },
      { name: "Tailwind", tier: "core" },
      { name: "Three.js", tier: "strong" },
      { name: "Framer Motion", tier: "strong" },
      { name: "UI/UX", tier: "strong" }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    icon: <Server size={18} />,
    subtitle: "Server architecture & API design",
    skills: [
      { name: "Node.js", tier: "core" },
      { name: "Express.js", tier: "core" },
      { name: "REST APIs", tier: "core" },
      { name: "JWT Authentication", tier: "strong" }
    ]
  },
  {
    id: "database",
    title: "Database",
    icon: <Database size={18} />,
    subtitle: "Data persistence & query optimization",
    skills: [
      { name: "PostgreSQL", tier: "strong" },
      { name: "MongoDB", tier: "strong" },
      { name: "MySQL", tier: "familiar" }
    ]
  },
  {
    id: "systems",
    title: "Systems & DevOps",
    icon: <Cpu size={18} />,
    subtitle: "Infrastructure, containers & real-time",
    skills: [
      { name: "Docker", tier: "strong" },
      { name: "Socket.IO", tier: "strong" },
      { name: "Redis", tier: "strong" },
      { name: "Kafka", tier: "familiar" },
      { name: "Git", tier: "core" }
    ]
  },
  {
    id: "ai",
    title: "AI / NLP",
    icon: <Brain size={18} />,
    subtitle: "Language models, evaluation & text processing",
    skills: [
      { name: "Python", tier: "strong" },
      { name: "TF-IDF", tier: "strong" },
      { name: "NLP Evaluation", tier: "familiar" },
      { name: "Text Processing", tier: "familiar" }
    ]
  }
];

const getTierColor = (tier) => {
  switch (tier) {
    case "core": return "bg-sys-cyan";
    case "strong": return "bg-sys-purple";
    case "familiar": return "bg-white/30";
    default: return "bg-white/30";
  }
};

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = skillData[activeIndex];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-12 pointer-events-auto">
      <div className="w-full max-w-5xl">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-12 bg-sys-cyan"></div>
          <h2 className="text-sys-cyan font-mono text-sm tracking-widest uppercase">System Capabilities</h2>
          <div className="h-px flex-1 bg-white/5"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Categories Nav */}
          <div className="w-full md:w-1/3 flex flex-col gap-2">
            {skillData.map((cat, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveIndex(i)}
                  className={`w-full text-left font-mono text-sm py-3 px-4 rounded-lg flex items-center gap-3 transition-colors ${
                    isActive 
                      ? "bg-sys-cyan/10 border border-sys-cyan/20 border-l-2 border-l-sys-cyan text-sys-cyan" 
                      : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {cat.icon}
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Category Details */}
          <div className="w-full md:w-2/3 glass-panel rounded-2xl border border-white/5 p-8 min-h-[280px] flex flex-col relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col h-full w-full"
              >
                <h3 className="text-xl font-light text-white mb-2">{activeCategory.title}</h3>
                <p className="text-gray-500 font-mono text-xs mb-8">{activeCategory.subtitle}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCategory.skills.map((skill, i) => (
                    <div 
                      key={i}
                      className="glass-panel rounded-lg px-4 py-3 border border-white/5 hover:border-sys-cyan/30 hover:bg-sys-cyan/5 transition-all duration-300 flex items-center gap-3 cursor-default group"
                    >
                      <span className={`w-2 h-2 rounded-full ${getTierColor(skill.tier)}`}></span>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Proficiency Legend */}
            <div className="mt-auto pt-6 border-t border-white/5 flex gap-6 text-xs font-mono text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sys-cyan"></span>
                <span>Core</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sys-purple"></span>
                <span>Strong</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/30"></span>
                <span>Familiar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;