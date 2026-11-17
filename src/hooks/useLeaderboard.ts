import { useMemo, useState, useSyncExternalStore } from "react";
import { leaderboardService } from "../services/leaderboardService.ts";
import type { LeaderboardInput } from "../types/leaderboard.ts";

/**
 * Reusable presentation logic. Every consumer observes the same repository through
 * the service subscription; separate hook calls do not create separate score lists.
 *
 * Returned values:
 * - entries: immutable full resource snapshot, useful for counts and edit lookup.
 * - games: supported game choices supplied by the service.
 * - gameLeaderboards: ranked lists matching this consumer's filters.
 * - search / setSearch: this consumer's controlled player-search field.
 * - selectedGame / setSelectedGame: game filter; empty string shows every game.
 * - error / clearError: accessible action feedback and its dismiss/reset action.
 * - addScore / updateScore / deleteScore: service-backed actions; true means
 *   success, false means error contains a message. All consumers refresh together.
 *
 * Only UI state and error display belong here. Validation/ranking live in the
 * service; storage, IDs and subscriptions live in the repository.
 */
export function useLeaderboard() {
  const entries = useSyncExternalStore(
    leaderboardService.subscribe,
    leaderboardService.getSnapshot,
    leaderboardService.getSnapshot,
  );
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [error, setError] = useState("");
  const gameLeaderboards = useMemo(
    () => leaderboardService.getLeaderboards(entries, selectedGame, search),
    [entries, selectedGame, search],
  );

  function tryAction(action: () => void) {
    try {
      action();
      setError("");
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to change this score. Please try again.");
      return false;
    }
  }

  return {
    entries,
    games: leaderboardService.getGames(),
    gameLeaderboards,
    search,
    setSearch,
    selectedGame,
    setSelectedGame,
    error,
    clearError: () => setError(""),
    addScore: (input: LeaderboardInput) => tryAction(() => { leaderboardService.addScore(input); }),
    updateScore: (id: number, input: LeaderboardInput) => tryAction(() => { leaderboardService.updateScore(id, input); }),
    deleteScore: (id: number) => tryAction(() => { leaderboardService.deleteScore(id); }),
  };
}
