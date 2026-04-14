import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { Analyzer } from "./pages/Analyzer";
import { HowToExport } from "./pages/HowToExport";

export type View = "analyzer" | "how-to-export";

function viewFromHash(): View {
  return window.location.hash === "#how-to-export" ? "how-to-export" : "analyzer";
}

function App() {
  const [view, setView] = useState<View>(viewFromHash);

  // Keep state and URL hash in sync so the two views are linkable /
  // bookmarkable and the browser back button works.
  useEffect(() => {
    const onHashChange = () => setView(viewFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (next: View) => {
    window.location.hash = next === "how-to-export" ? "how-to-export" : "";
    setView(next);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen">
      <NavBar active={view} onNavigate={navigate} />
      <main className="px-6 py-10 md:py-16 max-w-5xl mx-auto">
        {view === "analyzer" ? (
          <Analyzer onNavigateToGuide={() => navigate("how-to-export")} />
        ) : (
          <HowToExport />
        )}
      </main>
    </div>
  );
}

export default App;
