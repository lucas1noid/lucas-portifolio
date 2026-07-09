function SectionHeader({ title, accent }) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
        {title} <span className="text-accent">{accent}</span>
      </h2>
      <div className="h-px w-full flex-1 bg-white/10" />
    </div>
  );
}

export default SectionHeader;
