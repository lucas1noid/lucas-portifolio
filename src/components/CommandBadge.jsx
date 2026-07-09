import { Terminal } from 'lucide-react';

function CommandBadge({ children, className = "" }) {
  return (
    <div
      className={`inline-flex max-w-full items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-zinc-400 backdrop-blur-sm sm:text-sm ${className}`}
    >
      <Terminal size={16} className="shrink-0 text-accent" />
      <span className="truncate">{children}</span>
    </div>
  );
}

export default CommandBadge;
