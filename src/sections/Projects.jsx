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
          aria-label="Close project details"
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
              aria-label={`View ${project.displayName || project.name} source code on GitHub`}
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
              aria-label={`View ${project.displayName || project.name} live demo`}
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
  const [activeIndex, setActiveIndex] = useState(0);
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

  return (
    <section role="region" aria-label="Selected projects" className="w-full h-full flex flex-col items-center justify-center px-6 sm:px-10 md:px-20 py-10">

      {/* ── HEADER ── */}
      <div className="w-full max-w-6xl mb-8 flex items-end justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-12 bg-sys-cyan" />
            <span className="font-mono text-xs text-sys-cyan tracking-widest uppercase">
              03 // Work
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-none">
            Selected <span className="text-gradient">Work.</span>
          </h2>
          <div className="h-[2px] w-16 bg-sys-cyan mt-4" />
        </motion.div>

        {/* All Repositories button — top right of header */}
        <motion.a
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          href="https://github.com/SiddhuPudi?tab=repositories"
          target="_blank"
          rel="noreferrer"
          aria-label="View all repositories on GitHub"
          className="group hidden md:flex items-center gap-3 border border-white/10 hover:border-sys-cyan/50 bg-white/[0.03] hover:bg-sys-cyan/5 px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-black/20"
        >
          <GithubIcon size={16} className="text-gray-400 group-hover:text-sys-cyan transition-colors duration-300" />
          <span className="font-mono text-xs text-gray-400 group-hover:text-white tracking-wider transition-colors duration-300">
            All Repositories
          </span>
          <ExternalLink size={14} className="text-gray-600 group-hover:text-sys-cyan transition-colors duration-300" />
        </motion.a>
      </div>

      {/* ── CAROUSEL ROW ── */}
      {loading ? (
        <div className="flex gap-4 w-full max-w-6xl">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 h-[400px] rounded-2xl bg-white/[0.02] animate-pulse border border-white/[0.03]" />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 w-full max-w-6xl overflow-x-auto pb-4 hide-scrollbar">
          {projects.map((p, i) => {
            const isActive = i === activeIndex;
            const colors = getColors(i);

            return (
              <motion.div
                key={p.id}
                layout
                role="button"
                tabIndex={0}
                aria-label={`${isActive ? 'Selected project' : 'Select project'}: ${p.displayName || p.id}`}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    setActiveIndex((i + 1) % projects.length);
                  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    setActiveIndex((i - 1 + projects.length) % projects.length);
                  } else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(i);
                  }
                }}
                className={
                  `relative rounded-2xl cursor-pointer flex flex-col justify-between flex-shrink-0 transition-colors duration-500 overflow-hidden ` +
                  (isActive
                    ? `w-[360px] min-h-[420px] p-8 bg-gradient-to-br ${colors.gradient} text-white`
                    : `w-[130px] min-h-[420px] p-6 bg-white/[0.03] border border-white/10 text-gray-400 hover:bg-white/[0.05]`)
                }
                transition={{ layout: { duration: 0.45, ease: [0.25, 1, 0.5, 1] } }}
                whileHover={{ scale: isActive ? 1 : 1.02 }}
              >
                {/* Watermark number */}
                <div className={`font-mono font-black select-none pointer-events-none ${
                  isActive
                    ? "text-6xl text-white/10"
                    : "text-4xl text-white/5"
                }`}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Arrow top-right */}
                <div className="absolute top-4 right-4">
                  <ArrowUpRight size={18} className={
                    isActive ? "text-white/60" : "text-white/15"
                  } />
                </div>

                {/* ACTIVE card content */}
                {isActive ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    className="relative z-10 mt-2 flex-1 flex flex-col"
                  >
                    {/* Category badge */}
                    <span className="self-start font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 border border-white/20 px-3 py-1 rounded-full mb-4">
                      {p.category}
                    </span>

                    {/* Project name */}
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                      {p.displayName}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 text-xs font-light leading-relaxed mb-4">
                      {p.description}
                    </p>

                    {/* Tags */}
                    {p.tags && p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.tags.map((tag, idx) => (
                          <span key={idx} className="inline-block text-xs px-2 py-0.5 rounded-full border border-white/20 bg-white/5 text-white/80">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="h-px bg-white/20 mb-4" />

                    {/* Features list */}
                    <div className="space-y-2 flex-1">
                      {p.features?.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2.5">
                          <div className="w-4 h-px bg-white/40 flex-shrink-0" />
                          <span className="font-mono text-xs text-white/80">
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech tags + Details button */}
                    <div className="mt-5 pt-4 border-t border-white/20">
                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tech?.map((t, idx) => (
                          <span key={idx} className="font-mono text-[10px] bg-black/20 border border-white/20 px-2.5 py-1 rounded-lg text-white/70 uppercase tracking-wider">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Bottom row: links + Details button */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {p.html_url && (
                            <a
                              href={p.html_url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={e => e.stopPropagation()}
                              aria-label={`View ${p.displayName || p.id} source code on GitHub`}
                              className="w-8 h-8 rounded-lg border border-white/20 bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
                            >
                              <Code size={14} />
                            </a>
                          )}
                          {p.homepage && (
                            <a
                              href={p.homepage}
                              target="_blank"
                              rel="noreferrer"
                              onClick={e => e.stopPropagation()}
                              aria-label={`View ${p.displayName || p.id} live demo`}
                              className="w-8 h-8 rounded-lg border border-white/20 bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>

                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedProject(p);
                          }}
                          aria-label={`View details for ${p.displayName || p.id}`}
                          className="flex items-center gap-2 font-mono text-xs font-bold text-white border border-white/30 hover:border-white/60 bg-black/20 hover:bg-black/40 px-4 py-2 rounded-xl transition-all duration-200"
                        >
                          Details
                          <Maximize2 size={11} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* INACTIVE card — vertical rotated title */
                  <div className="flex flex-col items-start justify-end flex-1 mt-4">
                    <div
                      className="text-sm font-semibold text-gray-500 whitespace-nowrap"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        letterSpacing: "0.05em"
                      }}
                    >
                      {p.displayName}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Mobile repos link */}
      <div className="w-full max-w-6xl mt-4 md:hidden">
        <a
          href="https://github.com/SiddhuPudi?tab=repositories"
          target="_blank"
          rel="noreferrer"
          aria-label="View all repositories on GitHub"
          className="flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-sys-cyan transition-colors"
        >
          <GithubIcon size={13} />
          All Repositories
          <ExternalLink size={11} />
        </a>
      </div>

      {/* ── PROJECT MODAL — untouched ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

    </section>
  );
};

export default Projects;