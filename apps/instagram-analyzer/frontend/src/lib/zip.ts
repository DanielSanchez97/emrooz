import { unzipSync } from "fflate";
import { parseFileContent } from "./parser";
import type { ParsedFile } from "./types";

// Instagram exports put relevant files under connections/followers_and_following/.
// Accept any .json file that lives inside a `followers_and_following` directory
// regardless of how many parent segments the zip has above it.
const JSON_PATH_RE = /followers_and_following\/[^/]+\.json$/i;

export async function parseZipFile(file: File): Promise<ParsedFile[]> {
  const buffer = await file.arrayBuffer();
  const entries = unzipSync(new Uint8Array(buffer));

  const parsed: ParsedFile[] = [];
  const errors: Array<{ path: string; message: string }> = [];

  for (const [path, data] of Object.entries(entries)) {
    if (!JSON_PATH_RE.test(path)) continue;

    const text = new TextDecoder().decode(data);
    // Use just the filename for parser detection (e.g. "followers_1.json").
    const filename = path.split("/").pop() ?? path;
    try {
      parsed.push(parseFileContent(filename, text));
    } catch (err) {
      errors.push({
        path,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  if (parsed.length === 0) {
    const detail =
      errors.length > 0
        ? errors.map((e) => `${e.path}: ${e.message}`).join("; ")
        : "no followers_and_following/*.json files found in the archive";
    throw new Error(`Could not parse zip: ${detail}`);
  }

  return parsed;
}

export function isZipFile(file: File): boolean {
  return (
    file.name.toLowerCase().endsWith(".zip") ||
    file.type === "application/zip" ||
    file.type === "application/x-zip-compressed"
  );
}
