import { gameRepository } from "../repositories/gameRepository.ts";
import { leaderboardRepository } from "../repositories/leaderboardRepository.ts";
import type { LeaderboardRepository } from "../repositories/leaderboardRepository.ts";
import type { GameLeaderboard, LeaderboardDraft, LeaderboardEntry, LeaderboardInput } from "../types/leaderboard.ts";

/** Business rules for this resource. UI state and data storage stay in other layers. */
export function createLeaderboardService(
  repository: LeaderboardRepository = leaderboardRepository,
  games?: readonly string[],
) {
  const getGames = () => games ?? gameRepository.getAll().map((game) => game.name);
  let previousEntries = repository.getAll();
  let previousGames = gameRepository.getAll();
  let snapshot = previousEntries;
  function getSnapshot() {
    const entries = repository.getAll();
    const catalogue = gameRepository.getAll();
    if (entries !== previousEntries || catalogue !== previousGames) {
      previousEntries = entries; previousGames = catalogue;
      snapshot = Object.freeze([...entries]);
    }
    return snapshot;
  }
  function validate(input: LeaderboardInput, editingId?: number): LeaderboardDraft {
    const name = input.name.trim();
    const scoreText = input.score.trim();
    const score = Number(scoreText);
    if (!getGames().includes(input.game)) throw new Error("Select a supported game.");
    if (name.length < 3 || name.length >= 40) throw new Error("Enter a player name between 3 and 39 characters.");
    if (!scoreText || !Number.isSafeInteger(score) || score <= 500) {
      throw new Error("Enter a whole-number score greater than 500, within the safe number range.");
    }
    const duplicate = repository.getAll().some((entry) =>
      entry.id !== editingId && entry.game === input.game &&
      entry.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );
    if (duplicate) throw new Error("This player already has a score in this game. Edit their existing entry.");
    return { game: input.game, name, score };
  }

  return {
    getGames,
    // Stable data-access adapters let hooks subscribe without importing a repository.
    subscribe(listener: () => void) {
      const stopScores = repository.subscribe(listener);
      const stopGames = gameRepository.subscribe(listener);
      return () => { stopScores(); stopGames(); };
    },
    getSnapshot,
    getEntry: repository.getById,
    addScore: (input: LeaderboardInput) => repository.create(validate(input)),
    updateScore: (id: number, input: LeaderboardInput) => repository.update(id, validate(input, id)),
    deleteScore: (id: number) => repository.delete(id),

    /** Competition ranking: equal scores share positions (1, 1, 3).
     * Search is applied AFTER ranking, so finding a player never changes their rank.
     */
    getLeaderboards(
      entries: readonly LeaderboardEntry[],
      selectedGame = "",
      search = "",
    ): GameLeaderboard[] {
      const query = search.trim().toLocaleLowerCase();
      return getGames().filter((game) => !selectedGame || game === selectedGame).map((game) => {
        const sorted = entries.filter((entry) => entry.game === game)
          .sort((a, b) => b.score - a.score || a.id - b.id);
        let position = 0;
        const players = sorted.map((entry, index) => {
          if (index === 0 || entry.score !== sorted[index - 1].score) position = index + 1;
          return { ...entry, position };
        }).filter((entry) => entry.name.toLocaleLowerCase().includes(query));
        return { name: game, players };
      });
    },
  };
}
export const leaderboardService = createLeaderboardService();
