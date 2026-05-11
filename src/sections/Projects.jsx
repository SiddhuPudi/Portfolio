import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";
import { featuredProjects, projectMeta } from "../data/projects";
import { fetchRepos } from "../utils/github";

const ProjectSkeleton = () => (
  <div className="glass-panel p-6 rounded-2xl border border-white/5 h-[320px] flex flex-col justify-between overflow-hidden relative">
    <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
  </div>
);

const ProjectModule = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-sys-cyan/30 transition-all duration-500 group relative overflow-hidden h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sys-cyan/5 to-sys-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sys-cyan font-mono text-xs tracking-wider uppercase mb-2">
                {project.category}
              </div>
              <h3 className="text-2xl font-light text-white mb-2">{project.displayName || project.name}</h3>
            </div>
            <div className="flex gap-3">
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
            </div>
          </div>

          <p className="text-gray-400 font-light text-sm mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="mb-6">
            <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Architecture Highlights</div>
            <ul className="space-y-1">
              {project.features?.map((feature, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-sys-purple"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech?.map((t, i) => (
            <span key={i} className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300 font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-12 py-20 overflow-y-auto pointer-events-auto">
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
              <ProjectModule key={p.id} project={p} index={i} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;