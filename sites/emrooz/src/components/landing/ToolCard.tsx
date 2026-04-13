interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  status: "planned" | "in-progress" | "live";
  path: string;
}

const statusStyles = {
  planned: "bg-gold/10 text-gold border-gold/20",
  "in-progress": "bg-blue/10 text-blue-light border-blue/20",
  live: "bg-sage/10 text-sage-light border-sage/20",
};

const statusLabels = {
  planned: "Coming Soon",
  "in-progress": "In Progress",
  live: "Live",
};

export default function ToolCard({ title, description, icon, status, path }: ToolCardProps) {
  const isClickable = status === "live";
  const Tag = isClickable ? "a" : "div";

  return (
    <Tag
      {...(isClickable ? { href: path } : {})}
      className={`
        group block relative rounded-2xl p-6 overflow-hidden
        border border-gold/10 bg-navy-light/80 backdrop-blur-sm
        transition-all duration-500
        ${isClickable ? "hover:border-gold/30 hover:shadow-[0_0_30px_rgba(198,147,32,0.08)] hover:-translate-y-1 cursor-pointer" : ""}
      `}
    >
      {/* Subtle carpet texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(198,147,32,0.3) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{icon}</span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyles[status]}`}>
            {statusLabels[status]}
          </span>
        </div>
        <h3 className="font-display text-xl font-semibold text-cream mb-2">{title}</h3>
        <p className="text-cream-muted/60 text-sm leading-relaxed">{description}</p>
        {isClickable && (
          <div className="mt-4 text-gold text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Open
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </div>
        )}
      </div>
    </Tag>
  );
}
