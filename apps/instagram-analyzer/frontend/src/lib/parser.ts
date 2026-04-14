import type { FileKind, ParsedFile, User } from "./types";

// Raw shapes as emitted by Instagram's data export.
interface RawStringEntry {
  href: string;
  value?: string;
  timestamp: number;
}

interface RawRelationshipEntry {
  title?: string;
  string_list_data: RawStringEntry[];
}

// Map of top-level key → FileKind for keyed-object files.
const KEYED_FILE_KIND: Record<string, FileKind> = {
  relationships_following: "following",
  relationships_follow_requests_sent: "pending_sent",
  relationships_follow_requests_received: "pending_received",
  relationships_close_friends: "close_friends",
  relationships_unfollowed_users: "recently_unfollowed",
  relationships_permanent_follow_requests: "recent_follow_requests",
  relationships_hide_stories_from: "hide_story_from",
  relationships_dismissed_suggested_users: "dismissed_suggestions",
};

export class ParseError extends Error {
  constructor(
    public filename: string,
    message: string,
  ) {
    super(`${filename}: ${message}`);
  }
}

// Extract the username from an entry. followers_*.json puts the username in
// `string_list_data[0].value`; following.json puts it in `title`.
function entryToUser(entry: RawRelationshipEntry): User | null {
  const s = entry.string_list_data?.[0];
  if (!s) return null;
  const username = entry.title?.trim() || s.value?.trim() || "";
  if (!username) return null;
  return {
    username,
    href: s.href ?? "",
    timestamp: typeof s.timestamp === "number" ? s.timestamp : 0,
  };
}

function entriesToUsers(entries: RawRelationshipEntry[]): User[] {
  const out: User[] = [];
  const seen = new Set<string>();
  for (const e of entries) {
    const u = entryToUser(e);
    if (!u || seen.has(u.username)) continue;
    seen.add(u.username);
    out.push(u);
  }
  return out;
}

export function parseFileContent(filename: string, text: string): ParsedFile {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (err) {
    throw new ParseError(
      filename,
      `invalid JSON: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  // Bare array → must be followers_*.json
  if (Array.isArray(raw)) {
    const base = (filename.split("/").pop() ?? filename)
      .toLowerCase()
      .replace(/\.json$/, "");
    if (!/^followers(_\d+)?$/.test(base)) {
      throw new ParseError(
        filename,
        "bare-array files are only recognized as followers_N.json",
      );
    }
    return { kind: "followers", filename, users: entriesToUsers(raw) };
  }

  if (!raw || typeof raw !== "object") {
    throw new ParseError(filename, "unsupported JSON shape");
  }

  const obj = raw as Record<string, unknown>;
  const key = Object.keys(obj).find((k) => k in KEYED_FILE_KIND);
  if (!key) {
    throw new ParseError(
      filename,
      `no known relationship key found (got: ${Object.keys(obj).join(", ") || "none"})`,
    );
  }

  const entries = obj[key];
  if (!Array.isArray(entries)) {
    throw new ParseError(filename, `${key} is not an array`);
  }

  return {
    kind: KEYED_FILE_KIND[key],
    filename,
    users: entriesToUsers(entries as RawRelationshipEntry[]),
  };
}

export async function parseUploadedFile(file: File): Promise<ParsedFile> {
  const text = await file.text();
  // file.name may be just the basename or a relative path (webkitRelativePath)
  // — use whichever is more informative for error messages.
  const webkitPath = (file as File & { webkitRelativePath?: string })
    .webkitRelativePath;
  const filename = webkitPath && webkitPath.length > 0 ? webkitPath : file.name;
  return parseFileContent(filename, text);
}
