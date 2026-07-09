import { motion } from 'framer-motion';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { cardMotion } from '../lib/animations';

function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={cardMotion(index)}
      className="group flex h-full flex-col rounded-lg border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-accent/50 hover:bg-zinc-900 hover:shadow-[0_10px_30px_rgba(230,57,70,0.1)]"
    >
      <div className="mb-6 flex items-start justify-between">
        <FolderGit2 className="text-accent" size={32} />
        <a
          href={project.link}
          className="text-zinc-500 transition-colors hover:text-white"
          target="_blank"
          rel="noreferrer"
          aria-label={`Abrir ${project.titulo}`}
        >
          <ExternalLink size={20} />
        </a>
      </div>

      <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-accent">{project.titulo}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-400">{project.descricao}</p>

      <div className="mt-auto flex flex-wrap gap-2">
        {project.techs.map((tech) => (
          <span key={tech} className="rounded border border-accent/20 bg-black/50 px-2 py-1 font-mono text-xs text-accent">
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default ProjectCard;
