import type { Analysis } from "../lib/types";

interface StatProps {
  label: string;
  value: number;
  accent: "cream" | "gold" | "sage" | "rust" | "crimson" | "blue";
}

function Stat({ label, value, accent }: StatProps) {
  const colorClasses: Record<StatProps["accent"], string> = {
    cream: "text-cream",
    gold: "text-gold",
    sage: "text-sage-light",
    rust: "text-rust",
    crimson: "text-crimson",
    blue: "text-blue-light",
  };
  return (
    <div className="rounded-xl bg-navy-light/50 border border-cream-muted/10 px-5 py-4">
      <div className={`text-3xl font-semibold ${colorClasses[accent]}`}>
        {value.toLocaleString()}
      </div>
      <div className="text-xs uppercase tracking-wider text-cream-muted/60 mt-1">
        {label}
      </div>
    </div>
  );
}

export function Stats({ analysis }: { analysis: Analysis }) {
  const { dataset, notFollowingBack, youDontFollowBack, mutuals } = analysis;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <Stat label="Followers" value={dataset.followers.length} accent="cream" />
      <Stat label="Following" value={dataset.following.length} accent="cream" />
      <Stat label="Mutuals" value={mutuals.length} accent="sage" />
      <Stat
        label="Doesn't follow back"
        value={notFollowingBack.length}
        accent="crimson"
      />
      <Stat
        label="You don't follow back"
        value={youDontFollowBack.length}
        accent="gold"
      />
      <Stat
        label="Pending requests sent"
        value={dataset.pendingSent.length}
        accent="blue"
      />
    </div>
  );
}
