import { useState } from "react";
import type { Analysis, User } from "../lib/types";
import { Stats } from "./Stats";
import { UserList } from "./UserList";

type Tab =
  | "not_following_back"
  | "you_dont_follow_back"
  | "mutuals"
  | "pending_sent"
  | "recently_unfollowed";

interface TabDef {
  key: Tab;
  label: string;
  users: (a: Analysis) => User[];
  hint: string;
  empty: string;
}

const TABS: TabDef[] = [
  {
    key: "not_following_back",
    label: "Doesn't follow back",
    hint: "People you follow who don't follow you. Pending requests are excluded.",
    empty: "Everyone you follow follows you back. 🎉",
    users: (a) => a.notFollowingBack,
  },
  {
    key: "you_dont_follow_back",
    label: "You don't follow back",
    hint: "People who follow you but you don't follow.",
    empty: "You follow every follower back.",
    users: (a) => a.youDontFollowBack,
  },
  {
    key: "mutuals",
    label: "Mutuals",
    hint: "You follow each other.",
    empty: "No mutuals found.",
    users: (a) => a.mutuals,
  },
  {
    key: "pending_sent",
    label: "Pending requests",
    hint: "Follow requests you've sent that haven't been accepted yet.",
    empty: "No pending follow requests.",
    users: (a) => a.dataset.pendingSent,
  },
  {
    key: "recently_unfollowed",
    label: "Recently unfollowed",
    hint: "Accounts you recently unfollowed (per Instagram's export).",
    empty: "No recent unfollows in the export.",
    users: (a) => a.dataset.recentlyUnfollowed,
  },
];

export function Dashboard({
  analysis,
  onReset,
}: {
  analysis: Analysis;
  onReset: () => void;
}) {
  const [active, setActive] = useState<Tab>("not_following_back");
  const currentTab = TABS.find((t) => t.key === active) ?? TABS[0];
  const users = currentTab.users(analysis);

  return (
    <div className="space-y-6">
      <Stats analysis={analysis} />

      <div className="flex flex-wrap gap-2 items-center">
        {TABS.map((t) => {
          const count = t.users(analysis).length;
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gold text-navy"
                  : "bg-navy-light/60 text-cream-muted hover:text-cream hover:bg-navy-light"
              }`}
            >
              {t.label}
              <span
                className={`ml-2 text-xs ${isActive ? "text-navy/70" : "text-cream-muted/50"}`}
              >
                {count.toLocaleString()}
              </span>
            </button>
          );
        })}
        <button
          onClick={onReset}
          className="ml-auto text-sm text-cream-muted/60 hover:text-cream underline underline-offset-4"
        >
          Upload different files
        </button>
      </div>

      <p className="text-sm text-cream-muted/70">{currentTab.hint}</p>

      <UserList users={users} emptyLabel={currentTab.empty} />
    </div>
  );
}
