import { useState } from "react";
import { motion } from "framer-motion";
import { Layout, Server, Database, Cpu, Brain, ArrowUpRight } from "lucide-react";

// Skill categories with gradient definitions
const skillData = [
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "Client-side systems & interactive UI",
    icon: <Layout size={20} />,
    gradient: "from-[#06b6d4] to-[#0891b2]",
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
    subtitle: "Server architecture & API design",
    icon: <Server size={20} />,
    gradient: "from-[#8b5cf6] to-[#6d28d9]",
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
    subtitle: "Data persistence & query optimization",
    icon: <Database size={20} />,
    gradient: "from-[#06b6d4] to-[#8b5cf6]",
    skills: [
      { name: "PostgreSQL", tier: "strong" },
      { name: "MongoDB", tier: "strong" },
      { name: "MySQL", tier: "familiar" }
    ]
  },
  {
    id: "systems",
    title: "Systems & DevOps",
    subtitle: "Infrastructure, containers & real-time",
    icon: <Cpu size={20} />,
    gradient: "from-[#8b5cf6] to-[#ec4899]",
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
    subtitle: "Language models, evaluation & text processing",
    icon: <Brain size={20} />,
    gradient: "from-[#06b6d4] to-[#6d28d9]",
    skills: [
      { name: "Python", tier: "strong" },
      { name: "TF-IDF", tier: "strong" },
      { name: "NLP Evaluation", tier: "familiar" },
      { name: "Text Processing", tier: "familiar" }
    ]
  }
];

const tierColors = {
  core: "bg-sys-cyan",
  strong: "bg-sys-purple",
  familiar: "bg-white/30"
};

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 md:px-24 py-12">
      {/* Header */}
      <div className="w-full max-w-6xl mb-10">
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-sys-cyan" />
          <h2 className="text-sys-cyan font-mono text-xs tracking-widest uppercase">04 // CAPABILITIES</h2>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <h3 className="text-4xl md:text-5xl font-bold text-white mt-2">Core Arsenal.</h3>
        <div className="h-[2px] w-16 bg-sys-cyan mt-4" />
      </div>

      {/* Tier legend */}
      <div className="w-full max-w-6xl flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sys-cyan" />
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Core</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sys-purple" />
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Strong</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white/30" />
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Familiar</span>
        </div>
      </div>

      {/* Carousel Row — overflow-x-auto with hidden scrollbar */}
      <div className="flex gap-4 w-full max-w-6xl overflow-x-auto pb-4 hide-scrollbar">
        {skillData.map((cat, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={cat.id}
              layout
              onClick={() => setActiveIndex(i)}
              className={
                `relative rounded-2xl cursor-pointer flex flex-col justify-between flex-shrink-0 transition-colors duration-500 ` +
                (isActive
                  ? `w-[320px] min-h-[400px] p-8 bg-gradient-to-br ${cat.gradient} text-white`
                  : `w-[120px] min-h-[400px] p-6 bg-white/[0.03] border border-white/10 text-gray-400 hover:bg-white/[0.05]`)
              }
              transition={{ layout: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }}
              whileHover={{ scale: isActive ? 1 : 1.02 }}
            >
              {/* Index number */}
              <div className={`font-mono font-black ${isActive ? "text-6xl text-white/10" : "text-4xl text-white/5"}`}>
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Arrow icon top‑right */}
              <div className="absolute top-4 right-4">
                <ArrowUpRight size={18} className={isActive ? "text-white/60" : "text-white/15"} />
              </div>

              {/* Content */}
              {isActive ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="relative z-10 mt-4 flex-1 flex flex-col"
                >
                  <h4 className="text-2xl font-semibold mb-1">{cat.title}</h4>
                  <p className="text-white/60 text-xs font-light mb-4 leading-relaxed">{cat.subtitle}</p>
                  <div className="h-px bg-white/20 mb-4" />
                  <div className="space-y-2.5 flex-1">
                    {cat.skills.map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2.5 text-white/90">
                          <span className={`${tierColors[s.tier]} w-1.5 h-1.5 rounded-full flex-shrink-0`} />
                          {s.name}
                        </div>
                        <span className="font-mono text-[10px] text-white/30 uppercase">{s.tier}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-start justify-end flex-1">
                  <div
                    className="text-sm font-semibold text-gray-500 whitespace-nowrap"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      letterSpacing: "0.05em"
                    }}
                  >
                    {cat.title}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;