import { motion } from 'framer-motion';
import { Megaphone, Users } from 'lucide-react';
import { cardMotion } from '../lib/animations';

const icons = {
  megaphone: Megaphone,
  users: Users,
};

function ExperienceCard({ item, index = 0 }) {
  const Icon = icons[item.icon] ?? Users;

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={cardMotion(index)}
      className="group rounded-lg border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-accent/50 hover:bg-zinc-900"
    >
      <div className="mb-4 flex items-center gap-3">
        <Icon className="shrink-0 text-accent" size={28} />
        <h3 className="text-xl font-bold transition-colors group-hover:text-accent">{item.titulo}</h3>
      </div>
      <h4 className="mb-3 font-mono text-sm text-zinc-300">{item.cargo}</h4>
      <p className="text-sm leading-relaxed text-zinc-400">{item.descricao}</p>
    </motion.article>
  );
}

export default ExperienceCard;
