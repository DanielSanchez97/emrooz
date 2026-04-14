import type { Analysis, Dataset, ParsedFile, User, FileKind } from "./types";

function mergeUsers(existing: User[], incoming: User[]): User[] {
  // Merge while de-duping by username, preferring the newer timestamp.
  const byName = new Map<string, User>();
  for (const u of existing) byName.set(u.username, u);
  for (const u of incoming) {
    const prev = byName.get(u.username);
    if (!prev || u.timestamp > prev.timestamp) byName.set(u.username, u);
  }
  return [...byName.values()];
}

export function buildDataset(files: ParsedFile[]): Dataset {
  const buckets: Record<FileKind, User[]> = {
    followers: [],
    following: [],
    pending_sent: [],
    pending_received: [],
    close_friends: [],
    recently_unfollowed: [],
    recent_follow_requests: [],
    hide_story_from: [],
    dismissed_suggestions: [],
  };
  const loaded = new Set<FileKind>();

  for (const f of files) {
    // Followers files may be paginated — merge them. All others overwrite the
    // single source (last one wins if user uploads duplicates).
    if (f.kind === "followers") {
      buckets.followers = mergeUsers(buckets.followers, f.users);
    } else {
      buckets[f.kind] = f.users;
    }
    loaded.add(f.kind);
  }

  return {
    followers: buckets.followers,
    following: buckets.following,
    pendingSent: buckets.pending_sent,
    pendingReceived: buckets.pending_received,
    closeFriends: buckets.close_friends,
    recentlyUnfollowed: buckets.recently_unfollowed,
    recentFollowRequests: buckets.recent_follow_requests,
    hideStoryFrom: buckets.hide_story_from,
    dismissedSuggestions: buckets.dismissed_suggestions,
    loaded,
  };
}

export function analyze(dataset: Dataset): Analysis {
  const followerNames = new Set(dataset.followers.map((u) => u.username));
  const followingNames = new Set(dataset.following.map((u) => u.username));
  const pendingSentNames = new Set(
    dataset.pendingSent.map((u) => u.username),
  );

  // You follow them, they don't follow you. Exclude pending sent requests —
  // those follow-backs are still in flight.
  const notFollowingBack = dataset.following.filter(
    (u) => !followerNames.has(u.username) && !pendingSentNames.has(u.username),
  );

  // They follow you, you don't follow them.
  const youDontFollowBack = dataset.followers.filter(
    (u) => !followingNames.has(u.username),
  );

  // Intersection — take the record from `following` (keeps its timestamp).
  const mutuals = dataset.following.filter((u) => followerNames.has(u.username));

  return { dataset, notFollowingBack, youDontFollowBack, mutuals };
}
