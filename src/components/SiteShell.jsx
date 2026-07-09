import { ArrowUpRight, GitBranch, Mail, Send } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  [
    "rounded-sm border px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all sm:text-sm",
    isActive
      ? "border-accent/40 bg-accent/10 text-white"
      : "border-transparent text-zinc-400 hover:border-white/10 hover:text-accent",
  ].join(" ");

function SiteShell({ children }) {
  const email = "lucas1noid@gmail.com";
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Contato pelo portfolio")}`;

  return (
    <div className="min-h-screen overflow-x-hidden text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="font-mono text-xl font-bold tracking-wider transition-colors hover:text-accent">
            LUCAS<span className="text-accent">_</span>DEV
          </Link>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:overflow-visible sm:pb-0">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/projetos" className={navLinkClass}>
              Projetos
            </NavLink>
            <a
              href="https://github.com/lucas1noid"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 transition-all hover:border-accent/40 hover:text-accent sm:text-sm"
            >
              <GitBranch size={16} />
              GitHub
            </a>
          </div>
        </nav>
      </header>

      {children}

      <footer className="border-t border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-zinc-400">
              <Mail size={15} className="text-accent" />
              contato --status disponível
            </div>
            <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
              Bora construir algo <span className="text-accent">massa?</span>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Aberto para projetos, colaborações acadêmicas e conversas sobre tecnologia, backend e comunidade dev.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3 font-bold uppercase tracking-wider text-white transition-all hover:bg-red-600 hover:shadow-[0_0_20px_rgba(230,57,70,0.35)] md:w-auto"
            >
              <Send size={18} />
              Enviar Email
            </a>
            <a
              href="https://github.com/lucas1noid"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-white/10 px-5 py-3 font-bold uppercase tracking-wider text-zinc-300 transition-all hover:border-accent/50 hover:text-accent md:w-auto"
            >
              <GitBranch size={18} />
              GitHub
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SiteShell;
