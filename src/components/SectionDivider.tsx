interface SectionDividerProps {
  variant?: "line" | "pattern" | "geometric";
}

const SectionDivider = ({ variant = "line" }: SectionDividerProps) => {
  if (variant === "pattern") {
    return (
      <div className="h-32 w-full flex items-center justify-center overflow-hidden pointer-events-none opacity-40">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-border to-transparent" />
        <div className="absolute h-12 w-full divider-pattern" />
      </div>
    );
  }

  if (variant === "geometric") {
    return (
      <div className="flex items-center justify-center gap-8 py-16 pointer-events-none scale-75 md:scale-100">
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-zinc-border" />
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
        </div>
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-zinc-border" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-border to-transparent opacity-50" />
    </div>
  );
};

export default SectionDivider;
