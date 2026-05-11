import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ExternalLink, ArrowUpRight, Maximize2, X } from "lucide-react";
import { featuredProjects, projectMeta } from "../data/projects";
import { fetchRepos } from "../utils/github";

/* Inline GitHub SVG — lucide-react v1.x removed brand icons */
const GithubIcon = ({ size = 15, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

/* ─── Project Detail Modal ──────────────────────────────── */
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative glass-panel rounded-2xl border border-white/10 max-w-2xl w-full max-h-[85vh] overflow-y-auto hide-scrollbar p-10"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all z-10"
        >
          <X size={16} />
        </button>

        {/* Category badge */}
        <div className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-sys-cyan/80 bg-sys-cyan/8 border border-sys-cyan/15 px-3 py-1.5 rounded-full mb-6">
          {project.category}
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {project.displayName || project.name}
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-base font-light leading-relaxed mb-8">
          {project.description}
        </p>

        {/* Features */}
        {project.features && (
          <div className="mb-8">
            <div className="font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-4">Key Features</div>
            <div className="space-y-3">
              {project.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-px bg-gradient-to-r from-sys-cyan to-transparent flex-shrink-0" />
                  <span className="text-white/80 text-sm font-mono">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tech stack */}
        <div className="mb-8">
          <div className="font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-4">Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.tech?.map((t, i) => (
              <span
                key={i}
                className="font-mono text-xs bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-lg text-gray-300 uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-6 border-t border-white/[0.06]">
          {project.html_url && (
            <a
              href={project.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-sys-cyan/40 hover:bg-sys-cyan/5 text-gray-300 hover:text-white transition-all duration-200 font-mono text-xs tracking-wider"
            >
              <Code size={14} />
              Source Code
            </a>
          )}
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sys-cyan/10 border border-sys-cyan/20 hover:bg-sys-cyan/20 text-sys-cyan transition-all duration-200 font-mono text-xs tracking-wider"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main Projects Section ─────────────────────────────── */
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const getColors = (idx) => {
    if (idx === 0) return { gradient: 'from-[#06b6d4] to-[#8b5cf6]', text: 'text-sys-cyan', border: 'border-sys-cyan', borderHalf: 'border-sys-cyan/50', bg: 'bg-sys-cyan', bgLight: 'bg-sys-cyan/10', hex: '#06b6d4' };
    if (idx === 1) return { gradient: 'from-[#8b5cf6] to-[#ec4899]', text: 'text-sys-purple', border: 'border-sys-purple', borderHalf: 'border-sys-purple/50', bg: 'bg-sys-purple', bgLight: 'bg-sys-purple/10', hex: '#8b5cf6' };
    return { gradient: 'from-[#10b981] to-[#3b82f6]', text: 'text-emerald-400', border: 'border-emerald-400', borderHalf: 'border-emerald-400/50', bg: 'bg-emerald-400', bgLight: 'bg-emerald-400/10', hex: '#10b981' };
  };

  const activeColors = getColors(hoveredIndex);

  return (
    <div className="w-full h-full flex flex-col px-8 md:px-16 justify-center gap-8">
      {/* HEADER ROW */}
      <div className="flex items-end justify-between">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-10 bg-sys-cyan" />
            <p className="font-mono text-xs text-sys-cyan tracking-[0.3em] uppercase">
              03 // Work
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-none">
            Selected <span className="text-gradient">Work.</span>
          </h2>
        </motion.div>
        
        {/* Explore repos CTA */}
        <motion.a
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          href="https://github.com/SiddhuPudi?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="group hidden md:flex items-center gap-3 border border-white/10 hover:border-sys-cyan/50 bg-white/[0.03] hover:bg-sys-cyan/5 px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-black/20"
        >
          <GithubIcon size={16} className="text-gray-400 group-hover:text-sys-cyan transition-colors duration-300" />
          <span className="font-mono text-xs text-gray-400 group-hover:text-white tracking-wider transition-colors duration-300">
            All Repositories
          </span>
          <ExternalLink size={14} className="text-gray-600 group-hover:text-sys-cyan transition-colors duration-300" />
        </motion.a>
      </div>

      {/* MAIN CONTENT ROW */}
      <div className="flex gap-8 md:gap-14 items-stretch flex-1 min-h-0 max-h-[480px]">
        {/* LEFT — PROJECT LIST */}
        <div className="flex flex-col justify-between w-2/5 min-w-0">
          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 rounded-2xl bg-white/[0.02] animate-pulse border border-white/[0.03]" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 relative z-10">
              {projects.map((p, i) => {
                const isActive = hoveredIndex === i;
                const colors = getColors(i);
                
                return (
                  <motion.div
                    key={p.id}
                    onClick={() => setSelectedProject(p)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`group relative flex items-center gap-5 p-5 rounded-2xl cursor-pointer transition-all duration-300 border overflow-hidden ${
                      isActive
                        ? `border-white/10 bg-white/[0.04] shadow-lg shadow-black/40 scale-[1.02]`
                        : "border-transparent hover:border-white/5 hover:bg-white/[0.02] scale-100 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* Active glow background */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="projectGlowLeft"
                          className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-10 blur-xl pointer-events-none`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active left bar */}
                    <div
                      className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full transition-all duration-300 ${
                        isActive ? `${colors.bg} opacity-100` : "bg-transparent opacity-0"
                      }`}
                    />

                    {/* Number */}
                    <span
                      className={`font-mono text-2xl font-black w-10 flex-shrink-0 transition-colors duration-300 ${
                        isActive ? colors.text : "text-white/10"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Text */}
                    <div className="flex-1 min-w-0 relative z-10">
                      <h3
                        className={`font-bold text-base transition-colors duration-300 truncate ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {p.displayName}
                      </h3>
                      <p className={`font-mono text-xs mt-1 truncate transition-colors duration-300 ${
                        isActive ? colors.text : "text-gray-600"
                      }`}>
                        {p.category}
                      </p>
                    </div>

                    {/* Click hint — arrow icon */}
                    <div
                      className={`flex-shrink-0 transition-all duration-300 ${
                        isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-full border ${colors.borderHalf} ${colors.bgLight} flex items-center justify-center`}>
                        <ArrowUpRight size={15} className={colors.text} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Mobile repos link */}
          <a
            href="https://github.com/SiddhuPudi?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="md:hidden mt-4 flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-sys-cyan transition-colors"
          >
            <GithubIcon size={13} />
            All Repositories
            <ExternalLink size={11} />
          </a>
        </div>

        {/* RIGHT — PREVIEW PANEL */}
        <div className="flex-1 min-w-0 relative">
          <AnimatePresence mode="wait">
            {projects[hoveredIndex] && (
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="h-full relative rounded-3xl"
              >
                {/* Glow behind card */}
                <div
                  className={`absolute -inset-4 rounded-3xl blur-2xl opacity-20 bg-gradient-to-br ${activeColors.gradient} transition-all duration-700`}
                />

                {/* Card with gradient border */}
                <div className={`relative h-full p-[1px] rounded-3xl bg-gradient-to-br ${activeColors.gradient} bg-opacity-20`}>
                  <div className="h-full rounded-[23px] bg-[#080808]/95 backdrop-blur-xl p-8 flex flex-col relative overflow-hidden">
                    
                    {/* Watermark Number */}
                    <div 
                      className={`absolute -right-6 -top-10 text-[12rem] font-black font-mono leading-none select-none opacity-5 transition-colors duration-700 ${activeColors.text}`}
                    >
                      {String(hoveredIndex + 1).padStart(2, "0")}
                    </div>

                    {/* Colored top accent bar per project */}
                    <div className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${activeColors.gradient}`} />

                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <span className={`font-mono text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border ${activeColors.text} ${activeColors.bgLight} ${activeColors.borderHalf}`}>
                        {projects[hoveredIndex].category}
                      </span>
                      <div className="flex gap-2">
                        {projects[hoveredIndex].html_url && (
                          <a
                            href={projects[hoveredIndex].html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 shadow-lg shadow-black/20"
                          >
                            <Code size={15} />
                          </a>
                        )}
                        {projects[hoveredIndex].homepage && (
                          <a
                            href={projects[hoveredIndex].homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 shadow-lg shadow-black/20"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Project name */}
                    <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                      {projects[hoveredIndex].displayName}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 relative z-10">
                      {projects[hoveredIndex].description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8 flex-1 relative z-10">
                      {projects[hoveredIndex].features?.map((f, idx) => (
                        <motion.div
                          key={`${hoveredIndex}-${idx}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.1, duration: 0.4 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-5 h-px flex-shrink-0 ${activeColors.bg}`} />
                          <span className="font-mono text-xs text-gray-300">{f}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tech tags + Details button at bottom */}
                    <div className="flex items-center justify-between pt-5 border-t border-white/10 relative z-10">
                      <div className="flex flex-wrap gap-2">
                        {projects[hoveredIndex].tech?.map((t, idx) => (
                          <motion.span
                            key={`${hoveredIndex}-${idx}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }}
                            className={`font-mono text-[10px] bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg uppercase tracking-wider ${activeColors.text}`}
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedProject(projects[hoveredIndex])}
                        className={`flex-shrink-0 ml-4 flex items-center gap-2 font-mono text-xs font-bold ${activeColors.text} hover:text-white border ${activeColors.borderHalf} hover:border-white/50 ${activeColors.bgLight} hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 shadow-lg shadow-black/20`}
                      >
                        Details
                        <Maximize2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* PROJECT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;