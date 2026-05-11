import { motion } from "framer-motion";

const SkillGroup = ({ title, skills, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="glass-panel p-6 rounded-xl border border-white/5"
  >
    <h3 className="text-sys-purple font-mono text-sm tracking-widest uppercase mb-4">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, i) => (
        <span 
          key={i} 
          className="text-sm px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-gray-300 hover:border-sys-cyan/50 hover:bg-sys-cyan/10 hover:text-white transition-all cursor-default"
        >
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const categories = [
    { title: "Frontend", skills: ["React", "JavaScript", "Tailwind", "UI/UX", "Three.js", "Framer Motion"] },
    { title: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"] },
    { title: "Database", skills: ["PostgreSQL", "MongoDB", "MySQL"] },
    { title: "Systems & DevOps", skills: ["Docker", "Kafka", "Redis", "Git", "Socket.IO"] },
    { title: "AI / NLP", skills: ["TF-IDF", "NLP Evaluation", "Text Processing", "Python"] }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-12">
      <div className="w-full max-w-5xl">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-12 bg-sys-cyan"></div>
          <h2 className="text-sys-cyan font-mono text-sm tracking-widest uppercase">System Capabilities</h2>
          <div className="h-px flex-1 bg-white/5"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className={i >= 3 ? "lg:col-span-1.5" : ""}>
              <SkillGroup title={cat.title} skills={cat.skills} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;