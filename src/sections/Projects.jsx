import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ExternalLink, ArrowUpRight } from "lucide-react";
import { featuredProjects, projectMeta } from "../data/projects";
import { fetchRepos } from "../utils/github";

/* Per-project accent gradients for visual richness */
const projectGradients = [
  { from: "#06b6d4", to: "#8b5cf6", bg: "from-[#06b6d4]/15 to-[#8b5cf6]/5" },
  { from: "#8b5cf6", to: "#ec4899", bg: "from-[#8b5cf6]/15 to-[#ec4899]/5" },
  { from: "#06b6d4", to: "#0891b2", bg: "from-[#06b6d4]/15 to-[#0891b2]/5" },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const repos = await fetchRepos();
        if (repos && repos.length > 0) {
          const mapped = featuredProjects.map(name => {
            const repo = repos.find(r => r.name.toLowerCase() === name.toLowerCase()) || {};
            return { id: name, ...repo, ...projectMeta[name] };
          });
          setProjects(mapped);
        } else {
          const fallback = featuredProjects.map(name => ({ id: name, ...projectMeta[name] }));
          setProjects(fallback);
        }
      } catch {
        const fallback = featuredProjects.map(name => ({ id: name, ...projectMeta[name] }));
        setProjects(fallback);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const active = projects[hoveredIndex];
  const gradient = projectGradients[hoveredIndex % projectGradients.length];

  return (
    <section className="w-full h-screen flex flex-col justify-center px-8 sm:px-12 md:px-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-10 bg-sys-cyan" />
            <h2 className="text-sys-cyan font-mono text-xs tracking-widest uppercase">03 // WORK</h2>
            <span className="h-px flex-1 bg-white/5" />
          </div>
          <div className="flex items-end justify-between mb-10">
            <h3 className="text-4xl md:text-5xl font-bold text-white leading-none">
              Selected<br />
              <span className="text-gradient">Work.</span>
            </h3>
            <span className="hidden md:block font-mono text-[10px] text-gray-600 tracking-widest uppercase">
              {projects.length} featured projects
            </span>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-14">
          {/* LEFT — Interactive Project List */}
          <div className="w-full md:w-[50%] flex flex-col">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 rounded-2xl bg-white/[0.02] animate-pulse border border-white/[0.03]" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {projects.map((proj, i) => {
                  const isActive = hoveredIndex === i;
                  const grad = projectGradients[i % projectGradients.length];
                  return (
                    <motion.div
                      key={proj.id}
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setHoveredIndex(i)}
                      layout
                    >
                      {/* Active glow background */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="projectGlow"
                            className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${grad.bg} blur-sm`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </AnimatePresence>

                      <motion.div
                        className={`relative rounded-xl p-5 flex items-center gap-5 transition-all duration-300 border ${
                          isActive
                            ? "bg-white/[0.04] border-white/[0.08]"
                            : "bg-transparent border-transparent hover:bg-white/[0.02]"
                        }`}
                        animate={{ scale: isActive ? 1 : 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Large index number */}
                        <div
                          className="text-4xl md:text-5xl font-black font-mono leading-none transition-colors duration-300 min-w-[60px]"
                          style={{
                            color: isActive ? grad.from : "rgba(255,255,255,0.04)",
                            WebkitTextStroke: isActive ? "none" : "1px rgba(255,255,255,0.06)"
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>

                        {/* Project info */}
                        <div className="flex-1 min-w-0">
                          <div className={`text-lg font-semibold transition-colors duration-200 ${isActive ? "text-white" : "text-gray-500"}`}>
                            {proj.displayName || proj.name}
                          </div>
                          <div className={`text-xs font-mono mt-1 transition-colors duration-200 ${isActive ? "text-gray-400" : "text-gray-700"}`}>
                            {proj.category}
                          </div>
                        </div>

                        {/* Arrow indicator */}
                        <motion.div
                          animate={{
                            opacity: isActive ? 1 : 0,
                            x: isActive ? 0 : -8,
                            rotate: isActive ? 0 : -45,
                          }}
                          transition={{ duration: 0.25 }}
                          className="flex-shrink-0"
                        >
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${grad.from}20, ${grad.to}20)`,
                              border: `1px solid ${grad.from}30`
                            }}
                          >
                            <ArrowUpRight size={16} style={{ color: grad.from }} />
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Explore All CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 pt-6 border-t border-white/[0.04]"
            >
              <a
                href="https://github.com/SiddhuPudi?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 font-mono text-sm text-gray-500 hover:text-white transition-colors duration-300"
              >
                <span className="w-8 h-px bg-white/20 group-hover:bg-sys-cyan group-hover:w-12 transition-all duration-300" />
                <span>Explore all repositories</span>
                <ExternalLink size={14} className="text-gray-600 group-hover:text-sys-cyan transition-colors duration-300" />
              </a>
              <p className="mt-1.5 ml-11 font-mono text-[10px] text-gray-700">
                github.com/SiddhuPudi
              </p>
            </motion.div>
          </div>

          {/* RIGHT — Premium Preview Card */}
          <div className="w-full md:w-[50%] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="relative w-full max-w-[460px]"
                >
                  {/* Glow behind card */}
                  <div
                    className="absolute -inset-4 rounded-3xl blur-2xl opacity-40"
                    style={{
                      background: `radial-gradient(ellipse at top left, ${gradient.from}25, transparent 60%), radial-gradient(ellipse at bottom right, ${gradient.to}20, transparent 60%)`
                    }}
                  />

                  {/* Card with gradient border */}
                  <div
                    className="relative p-[1px] rounded-2xl"
                    style={{
                      background: `linear-gradient(160deg, ${gradient.from}40, transparent 40%, transparent 60%, ${gradient.to}30)`
                    }}
                  >
                    <div className="rounded-2xl bg-[#0a0a0a] p-8 flex flex-col">
                      {/* Top row: category + links */}
                      <div className="flex justify-between items-start mb-6">
                        <div
                          className="text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border"
                          style={{
                            color: gradient.from,
                            borderColor: `${gradient.from}30`,
                            background: `${gradient.from}08`
                          }}
                        >
                          {active.category}
                        </div>
                        <div className="flex gap-2">
                          {active.html_url && (
                            <a
                              href={active.html_url}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200"
                              aria-label="Source code"
                            >
                              <Code size={14} />
                            </a>
                          )}
                          {active.homepage && (
                            <a
                              href={active.homepage}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200"
                              aria-label="Live demo"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Large project number watermark */}
                      <div
                        className="text-[7rem] font-black font-mono leading-none -mt-4 mb-2 select-none"
                        style={{ color: `${gradient.from}06` }}
                      >
                        {String(hoveredIndex + 1).padStart(2, "0")}
                      </div>

                      {/* Title */}
                      <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 -mt-8 relative z-10">
                        {active.displayName || active.name}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                        {active.description}
                      </p>

                      {/* Features with animated indicators */}
                      {active.features && (
                        <div className="space-y-3 mb-6">
                          {active.features.map((f, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + idx * 0.08, duration: 0.3 }}
                              className="flex items-center gap-3 text-xs"
                            >
                              <div
                                className="w-5 h-px flex-shrink-0"
                                style={{ background: `linear-gradient(to right, ${gradient.from}, transparent)` }}
                              />
                              <span className="text-white/70 font-mono tracking-wide">{f}</span>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Divider */}
                      <div
                        className="h-px mb-5"
                        style={{
                          background: `linear-gradient(to right, ${gradient.from}20, transparent)`
                        }}
                      />

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2">
                        {active.tech?.map((t, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 * idx, duration: 0.2 }}
                            className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border"
                            style={{
                              color: `${gradient.from}cc`,
                              borderColor: `${gradient.from}15`,
                              background: `${gradient.from}08`
                            }}
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>

                      {/* Corner accents matching About photo style */}
                      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r rounded-tr-sm" style={{ borderColor: `${gradient.from}30` }} />
                      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l rounded-tl-sm" style={{ borderColor: `${gradient.from}30` }} />
                      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r rounded-br-sm" style={{ borderColor: `${gradient.to}30` }} />
                      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l rounded-bl-sm" style={{ borderColor: `${gradient.to}30` }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;