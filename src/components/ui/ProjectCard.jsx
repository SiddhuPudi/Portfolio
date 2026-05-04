const ProjectCard = ({ project }) => {
    return(
        <div className="
            bg-white/5
            backdrop-blur-lg
            border border-white/10
            rounder-xl
            p-6
            hover:scale-105
            transition
            cursor-pointer
        ">
            <h2 className="text-xl font-semibold mb-2">
                {project.displayName}
            </h2>
            <p className="text-gray-400 mb-3">
                {project.description}
            </p>
            <div className="flex gap-2 flex-wrap mb-3">
                {project.tech.map((t, i) => (
                    <span
                        key={i}
                        className="text-xs bg-cyan-500/20 px-2 py-1 rounded-md"
                    >
                        {t}
                    </span>
                ))}
            </div>
            <a
                href={project.html_url}
                target="_blank"
                className="text-cyan-400 text-sm"
            >
                View on GitHub →
            </a>
        </div>
    );
};

export default ProjectCard;