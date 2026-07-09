import { motion } from 'framer-motion';
import CommandBadge from '../../components/CommandBadge';
import ExperienceCard from '../../components/ExperienceCard';
import ProjectCard from '../../components/ProjectCard';
import SectionHeader from '../../components/SectionHeader';
import SiteShell from '../../components/SiteShell';
import { communityProjects, softwareProjects } from '../../data/projects';
import { fadeUp } from '../../lib/animations';

function Projects() {
  return (
    <SiteShell>
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <motion.section initial="hidden" animate="visible" variants={fadeUp} className="mb-16">
          <CommandBadge className="mb-6">ls -la ./projetos_e_comunidade</CommandBadge>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Meu <span className="text-accent">Portfólio</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Uma coleção do meu código, contribuições acadêmicas e atuação na comunidade de tecnologia.
          </p>
        </motion.section>

        <section className="mb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <SectionHeader title="Engenharia de" accent="Software" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {softwareProjects.map((project, index) => (
              <ProjectCard key={project.titulo} project={project} index={index} />
            ))}
          </div>
        </section>

        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <SectionHeader title="Atuação" accent="Acadêmica & Liderança" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {communityProjects.map((item, index) => (
              <ExperienceCard key={item.titulo} item={item} index={index} />
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

export default Projects;
