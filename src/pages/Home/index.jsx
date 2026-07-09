import { motion } from 'framer-motion';
import { Code2, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommandBadge from '../../components/CommandBadge';
import ProjectCard from '../../components/ProjectCard';
import SectionHeader from '../../components/SectionHeader';
import SiteShell from '../../components/SiteShell';
import { softwareProjects } from '../../data/projects';
import { fadeUp } from '../../lib/animations';

function Home() {
  return (
    <SiteShell>
      <main>
        <section className="mx-auto flex min-h-[calc(100vh-84px)] w-full max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8">
            <CommandBadge>system.init("Noid")</CommandBadge>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl"
          >
            CODANDO O <span className="text-accent">FUTURO.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.4 }}
            className="mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl"
          >
            Estudante de Ciência da Computação na UFRN. Construindo soluções elegantes para problemas complexos,
            desde algoritmos em C++ até arquiteturas robustas em Java e Spring Boot.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.6 }}
            className="flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center"
          >
            <Link
              to="/projetos"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-8 py-4 font-bold uppercase tracking-wider text-white transition-all hover:bg-red-600 hover:shadow-[0_0_20px_rgba(230,57,70,0.4)]"
            >
              <Code2 size={20} />
              Ver Projetos
            </Link>

            <a
              href="https://github.com/lucas1noid"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/20 px-8 py-4 font-bold uppercase tracking-wider text-zinc-300 transition-all hover:border-accent hover:text-accent"
            >
              <GitBranch size={20} />
              GitHub
            </a>
          </motion.div>
        </section>

        <section id="projetos" className="mx-auto w-full max-w-6xl px-6 py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <SectionHeader title="Projetos em" accent="Destaque" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {softwareProjects.map((project, index) => (
              <ProjectCard key={project.titulo} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

export default Home;
