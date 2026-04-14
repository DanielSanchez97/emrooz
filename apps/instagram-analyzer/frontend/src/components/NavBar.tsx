import type { View } from "../App";

interface NavBarProps {
  active: View;
  onNavigate: (view: View) => void;
}

const LINKS: Array<{ view: View; label: string }> = [
  { view: "analyzer", label: "Analyzer" },
  { view: "how-to-export", label: "How to export" },
];

export function NavBar({ active, onNavigate }: NavBarProps) {
  return (
    <nav className="border-b border-cream-muted/10 bg-navy/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-6">
        <button
          onClick={() => onNavigate("analyzer")}
          className="flex items-center gap-2 text-cream font-semibold hover:text-gold transition-colors"
        >
          <span>📸</span>
          <span>Instagram Analyzer</span>
        </button>
        <div className="flex items-center gap-1 ml-auto">
          {LINKS.map((l) => (
            <button
              key={l.view}
              onClick={() => onNavigate(l.view)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                active === l.view
                  ? "bg-gold text-navy"
                  : "text-cream-muted hover:text-cream hover:bg-navy-light/60"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
