import { leaderboardTestData } from "../data/leaderboardData.ts";
import type { LeaderboardDraft, LeaderboardEntry } from "../types/leaderboard.ts";

/** In-memory data access; replace this adapter with backend requests next sprint. */
export function createLeaderboardRepository(seed: readonly LeaderboardEntry[] = leaderboardTestData) {
  let entries: readonly LeaderboardEntry[] = Object.freeze(
    seed.map((entry) => Object.freeze({ ...entry })),
  );
  let nextId = Math.max(0, ...entries.map((entry) => entry.id)) + 1;
  const listeners = new Set<() => void>();

  function publish(next: readonly LeaderboardEntry[]) {
    entries = Object.freeze(next);
    listeners.forEach((listener) => listener());
  }

  function requireEntry(id: number) {
    const entry = entries.find((item) => item.id === id);
    if (!entry) throw new Error("This score no longer exists. Refresh the list and try again.");
    return entry;
  }

  return {
    /** Stable immutable snapshot until a CRUD operation publishes a new one. */
    getAll: () => entries,
    getById: (id: number) => entries.find((entry) => entry.id === id),
    create(draft: LeaderboardDraft) {
      const entry = Object.freeze({ ...draft, id: nextId++ });
      publish([...entries, entry]);
      return entry;
    },
    update(id: number, draft: LeaderboardDraft) {
      requireEntry(id);
      const entry = Object.freeze({ ...draft, id });
      publish(entries.map((item) => item.id === id ? entry : item));
      return entry;
    },
    delete(id: number) {
      requireEntry(id);
      publish(entries.filter((entry) => entry.id !== id));
    },
    /** Notify hook consumers; unsubscribe when a component unmounts. */
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
  };
}
export type LeaderboardRepository = ReturnType<typeof createLeaderboardRepository>;
export const leaderboardRepository = createLeaderboardRepository();
