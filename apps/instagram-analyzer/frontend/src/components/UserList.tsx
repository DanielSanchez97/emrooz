import { useMemo, useState } from "react";
import type { User } from "../lib/types";

function formatRelativeTime(unixSeconds: number): string {
  if (!unixSeconds) return "";
  const now = Date.now() / 1000;
  const delta = now - unixSeconds;
  if (delta < 0) return "just now";
  const units: Array<[number, string]> = [
    [60 * 60 * 24 * 365, "y"],
    [60 * 60 * 24 * 30, "mo"],
    [60 * 60 * 24 * 7, "w"],
    [60 * 60 * 24, "d"],
    [60 * 60, "h"],
    [60, "m"],
  ];
  for (const [s, label] of units) {
    const n = Math.floor(delta / s);
    if (n >= 1) return `${n}${label} ago`;
  }
  return "just now";
}

type SortKey = "recent" | "oldest" | "name";

export function UserList({
  users,
  emptyLabel,
}: {
  users: User[];
  emptyLabel: string;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = q
      ? users.filter((u) => u.username.toLowerCase().includes(q))
      : users;
    list = [...list].sort((a, b) => {
      if (sort === "name") return a.username.localeCompare(b.username);
      if (sort === "oldest") return a.timestamp - b.timestamp;
      return b.timestamp - a.timestamp;
    });
    return list;
  }, [users, query, sort]);

  if (users.length === 0) {
    return (
      <div className="text-center py-16 text-cream-muted/60">{emptyLabel}</div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Filter by username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-navy-light/60 border border-cream-muted/15 text-cream placeholder:text-cream-muted/40 focus:outline-none focus:border-gold/60"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="px-3 py-2 rounded-lg bg-navy-light/60 border border-cream-muted/15 text-cream focus:outline-none focus:border-gold/60"
        >
          <option value="recent">Most recent</option>
          <option value="oldest">Oldest</option>
          <option value="name">A–Z</option>
        </select>
      </div>

      <div className="text-xs text-cream-muted/60 mb-2">
        Showing {filtered.length.toLocaleString()} of{" "}
        {users.length.toLocaleString()}
      </div>

      <ul className="divide-y divide-cream-muted/10 rounded-xl border border-cream-muted/10 overflow-hidden">
        {filtered.map((u) => (
          <li
            key={u.username}
            className="flex items-center justify-between px-4 py-3 hover:bg-navy-light/40"
          >
            <a
              href={u.href || `https://www.instagram.com/${u.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream hover:text-gold font-medium"
            >
              @{u.username}
            </a>
            <span className="text-xs text-cream-muted/50 tabular-nums">
              {formatRelativeTime(u.timestamp)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
