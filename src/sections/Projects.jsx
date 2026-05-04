import { useEffect, useState } from "react";
import { fetchRepos } from "../utils/github";
import { featuredProjects, projectMeta } from "../data/projects";
import ProjectCard from "../components/ui/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const load = async () => {
      const repos = await fetchRepos();
      const filtered = repos
        .filter((repo) => featuredProjects.some((name) => repo.name.toLowerCase().includes(name.toLowerCase())))
        .map((repo) => ({
          ...repo,
          ...projectMeta[repo.name],
        }));
        setProjects(filtered);
    };
    load();
  }, []);
  return (
    <div className="h-screen flex items-center justify-center text-white">
      <div className = "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {projects.map((p) => (
         <ProjectCard key={p.id} project = {p} />
        ))}
      </div>
    </div>
  );
};

export default Projects;