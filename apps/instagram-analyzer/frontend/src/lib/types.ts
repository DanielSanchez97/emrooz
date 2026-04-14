// A single Instagram relationship entry, normalized from the export format.
export interface User {
  username: string;
  href: string;
  timestamp: number; // unix seconds
}

// Every file in the export is one of these logical kinds.
export type FileKind =
  | "followers"
  | "following"
  | "pending_sent"
  | "pending_received"
  | "close_friends"
  | "recently_unfollowed"
  | "recent_follow_requests"
  | "hide_story_from"
  | "dismissed_suggestions";

export interface ParsedFile {
  kind: FileKind;
  filename: string;
  users: User[];
}

export interface Dataset {
  followers: User[];
  following: User[];
  pendingSent: User[]; // follow requests you sent that haven't been accepted
  pendingReceived: User[];
  closeFriends: User[];
  recentlyUnfollowed: User[];
  recentFollowRequests: User[];
  hideStoryFrom: User[];
  dismissedSuggestions: User[];
  // which kinds were present in the uploaded files
  loaded: Set<FileKind>;
}

export interface Analysis {
  dataset: Dataset;
  // you follow them, they don't follow you (excludes pending_sent — those are in flight)
  notFollowingBack: User[];
  // they follow you, you don't follow them
  youDontFollowBack: User[];
  // both directions
  mutuals: User[];
}
