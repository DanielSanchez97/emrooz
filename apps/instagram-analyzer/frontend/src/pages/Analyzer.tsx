import { useMemo, useState } from "react";
import { Uploader } from "../components/Uploader";
import { Dashboard } from "../components/Dashboard";
import { analyze, buildDataset } from "../lib/analyzer";
import type { ParsedFile, FileKind } from "../lib/types";

const KIND_LABELS: Record<FileKind, string> = {
  followers: "Followers",
  following: "Following",
  pending_sent: "Pending (sent)",
  pending_received: "Pending (received)",
  close_friends: "Close friends",
  recently_unfollowed: "Recently unfollowed",
  recent_follow_requests: "Recent follow requests",
  hide_story_from: "Hidden-from-story",
  dismissed_suggestions: "Dismissed suggestions",
};

interface AnalyzerProps {
  onNavigateToGuide: () => void;
}

export function Analyzer({ onNavigateToGuide }: AnalyzerProps) {
  const [files, setFiles] = useState<ParsedFile[]>([]);

  const analysis = useMemo(() => {
    if (files.length === 0) return null;
    const dataset = buildDataset(files);
    if (dataset.followers.length === 0 && dataset.following.length === 0) {
      return null;
    }
    return analyze(dataset);
  }, [files]);

  const handleFiles = (parsed: ParsedFile[]) => {
    setFiles((prev) => {
      const merged: ParsedFile[] = [];
      const replacedKinds = new Set<FileKind>();
      for (const f of parsed) {
        if (f.kind !== "followers") replacedKinds.add(f.kind);
      }
      for (const f of prev) {
        if (!replacedKinds.has(f.kind)) merged.push(f);
      }
      merged.push(...parsed);
      return merged;
    });
  };

  const showDashboard = analysis !== null;
  const hasPartialUpload = files.length > 0 && analysis === null;

  return (
    <>
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📸</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-cream">
            Instagram Analyzer
          </h1>
        </div>
        <p className="text-cream-muted/70 max-w-2xl">
          Upload your Instagram data export to see who doesn't follow you back,
          who you don't follow back, and your mutuals. Everything is processed
          locally in your browser — nothing is uploaded anywhere.
        </p>
      </header>

      {!showDashboard && (
        <section className="space-y-6">
          <Uploader onFiles={handleFiles} />

          <div className="rounded-xl bg-navy-light/40 border border-cream-muted/10 p-5 text-sm text-cream-muted/80">
            <div className="font-medium text-cream mb-2">
              Don't have the export yet?
            </div>
            <p>
              Follow the{" "}
              <button
                onClick={onNavigateToGuide}
                className="text-gold hover:underline font-medium"
              >
                step-by-step guide
              </button>{" "}
              to request your follower/following data from Instagram. It
              usually arrives within a few minutes.
            </p>
          </div>

          {hasPartialUpload && (
            <div className="rounded-xl bg-burgundy/20 border border-burgundy/40 p-4 text-sm text-cream">
              Parsed {files.length} file(s), but both followers and following
              are empty. Make sure you're uploading the files from{" "}
              <code>connections/followers_and_following/</code>.
            </div>
          )}

          {files.length > 0 && (
            <div className="text-sm text-cream-muted/60">
              Loaded:{" "}
              {files.map((f, i) => (
                <span key={i}>
                  {i > 0 && ", "}
                  <span className="text-cream">{KIND_LABELS[f.kind]}</span>
                  <span className="text-cream-muted/40">
                    {" "}
                    ({f.users.length})
                  </span>
                </span>
              ))}
            </div>
          )}
        </section>
      )}

      {showDashboard && analysis && (
        <Dashboard analysis={analysis} onReset={() => setFiles([])} />
      )}
    </>
  );
}
