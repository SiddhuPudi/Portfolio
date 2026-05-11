import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ExternalLink, X, Star, GitFork } from "lucide-react";
import { featuredProjects, projectMeta } from "../data/projects";
import { fetchRepos } from "../utils/github";

const ProjectSkeleton = () => (
  <div className="glass-panel p-6 rounded-2xl border border-white/5 h-[160px] flex flex-col justify-between overflow-hidden relative">
    <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
  </div>
);

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="glass-panel rounded-2xl border border-sys-cyan/20 p-8 max-w-2xl w-full mx-4 z-50 relative max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sys-cyan font-mono text-xs tracking-wider uppercase mb-2">
              {project.category}
            </div>
            <h3 className="text-2xl font-light text-white">{project.displayName || project.name}</h3>
          </div>
          <div className="flex gap-4 items-center">
            {project.html_url && (
              <a href={project.html_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Code size={20} />
              </a>
            )}
            {project.homepage && (
              <a href={project.homepage} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <ExternalLink size={20} />
              </a>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors ml-2">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-white/5 my-6"></div>

        <p className="text-gray-400 font-light text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {project.stargazers_count !== undefined && (
          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-2 text-sys-cyan font-mono text-xs">
              <Star size={14} />
              <span>{project.stargazers_count} Stars</span>
            </div>
            <div className="flex items-center gap-2 text-sys-cyan font-mono text-xs">
              <GitFork size={14} />
              <span>{project.forks_count || 0} Forks</span>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-6 mb-3">Architecture Highlights</div>
          <ul className="space-y-2">
            {project.features?.map((feature, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sys-purple shrink-0"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech?.map((t, i) => (
            <span key={i} className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300 font-mono">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ProjectModule = ({ project, index, onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={() => onOpen(project)}
      className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-sys-cyan/30 transition-all duration-500 group relative overflow-hidden h-full cursor-pointer flex flex-col"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sys-cyan/5 to-sys-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <div className="text-sys-cyan font-mono text-xs tracking-wider uppercase mb-2">
            {project.category}
          </div>
          <h3 className="text-2xl font-light text-white">{project.displayName || project.name}</h3>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto mb-4">
          {project.tech?.map((t, i) => (
            <span key={i} className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300 font-mono">
              {t}
            </span>
          ))}
        </div>
        
        <div className="text-right">
          <span className="font-mono text-xs text-sys-cyan group-hover:text-white transition-colors">
            View Module →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const repos = await fetchRepos();
        if (repos && repos.length > 0) {
          const mapped = featuredProjects.map(name => {
            const repo = repos.find(r => r.name.toLowerCase() === name.toLowerCase()) || {};
            return {
              id: name,
              ...repo,
              ...projectMeta[name]
            };
          });
          setProjects(mapped);
        } else {
          // Fallback to local data
          const fallback = featuredProjects.map(name => ({
            id: name,
            ...projectMeta[name]
          }));
          setProjects(fallback);
        }
      } catch (err) {
        // Fallback to local data on error
        const fallback = featuredProjects.map(name => ({
          id: name,
          ...projectMeta[name]
        }));
        setProjects(fallback);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-12 py-20 overflow-y-auto pointer-events-auto relative">
      <div className="w-full max-w-6xl my-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-12 bg-sys-cyan"></div>
          <h2 className="text-sys-cyan font-mono text-sm tracking-widest uppercase">Core System Modules</h2>
          <div className="h-px flex-1 bg-white/5"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {loading ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : (
            projects.map((p, i) => (
              <ProjectModule key={p.id} project={p} index={i} onOpen={setSelectedProject} />
            ))
          )}
        </div>
      </div>

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