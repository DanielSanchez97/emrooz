import { useCallback, useRef, useState } from "react";
import { parseUploadedFile, ParseError } from "../lib/parser";
import { isZipFile, parseZipFile } from "../lib/zip";
import type { ParsedFile } from "../lib/types";

interface UploaderProps {
  onFiles: (parsed: ParsedFile[]) => void;
}

interface FileError {
  filename: string;
  message: string;
}

export function Uploader({ onFiles }: UploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<FileError[]>([]);
  const [busy, setBusy] = useState(false);

  const handleFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const allFiles = Array.from(fileList);
      const zips = allFiles.filter(isZipFile);
      const jsons = allFiles.filter(
        (f) => !isZipFile(f) && f.name.toLowerCase().endsWith(".json"),
      );

      if (zips.length === 0 && jsons.length === 0) {
        setErrors([
          {
            filename: "(none)",
            message: "no .zip or .json files selected",
          },
        ]);
        return;
      }

      setBusy(true);
      const parsed: ParsedFile[] = [];
      const errs: FileError[] = [];

      // Process zip files — each may contain multiple JSON files.
      for (const z of zips) {
        try {
          parsed.push(...(await parseZipFile(z)));
        } catch (err) {
          errs.push({
            filename: z.name,
            message: err instanceof Error ? err.message : String(err),
          });
        }
      }

      // Process individual JSON files.
      for (const f of jsons) {
        try {
          parsed.push(await parseUploadedFile(f));
        } catch (err) {
          if (err instanceof ParseError) {
            errs.push({ filename: err.filename, message: err.message });
          } else {
            errs.push({
              filename: f.name,
              message: err instanceof Error ? err.message : String(err),
            });
          }
        }
      }

      setErrors(errs);
      setBusy(false);
      if (parsed.length > 0) onFiles(parsed);
    },
    [onFiles],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (e.dataTransfer.files) void handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed px-8 py-14 text-center transition-colors ${
          dragging
            ? "border-gold bg-gold/5"
            : "border-cream-muted/30 hover:border-gold/60 hover:bg-navy-light/40"
        }`}
      >
        <div className="text-5xl mb-3">📁</div>
        <div className="text-cream font-medium text-lg mb-1">
          {busy ? "Parsing..." : "Drop your Instagram export here"}
        </div>
        <div className="text-cream-muted/60 text-sm">
          or click to choose &middot; accepts the <code>.zip</code> directly
          from Instagram, or individual <code>.json</code> files
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json,application/zip,.zip"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) void handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {errors.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm">
          {errors.map((e, i) => (
            <li key={i} className="text-crimson/90">
              <span className="font-mono">{e.filename}</span> — {e.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
