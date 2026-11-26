import type { GameStat } from "../types/profile.ts";
import { initialGames } from "../data/profileData.ts";

// Saved data is untrusted: fall back to demo stats if the whole payload is invalid.
export function parseSavedGames(value: string | null): GameStat[] {
  if (value === null) return initialGames;
  try {
    const data: unknown = JSON.parse(value);
    if (!Array.isArray(data)) return initialGames;
    const ids = new Set<number>();
    const names = new Set<string>();
    for (const game of data) {
      if (!game || typeof game !== 'object' || !Number.isSafeInteger(game.id) ||
          typeof game.name !== 'string' || !game.name.trim() || game.name.length > 80 ||
          typeof game.rank !== 'string' || !game.rank.trim() || game.rank.length > 40 ||
          typeof game.hoursPlayed !== 'number' || !Number.isFinite(game.hoursPlayed) || game.hoursPlayed < 0 ||
          !Number.isSafeInteger(game.highestScore) || game.highestScore < 0 ||
          ids.has(game.id) || names.has(game.name.trim().toLowerCase())) return initialGames;
      ids.add(game.id);
      names.add(game.name.trim().toLowerCase());
    }
    return data;
  } catch {
    return initialGames;
  }
}
