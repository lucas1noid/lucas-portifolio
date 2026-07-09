import { GitBranch } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  [
    "rounded-sm border px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all sm:text-sm",
    isActive
      ? "border-accent/40 bg-accent/10 text-white"
      : "border-transparent text-zinc-400 hover:border-white/10 hover:text-accent",
  ].join(" ");

function SiteShell({ children }) {
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
    </div>
  );
}

export default SiteShell;
