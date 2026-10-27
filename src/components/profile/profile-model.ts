export type GameStat = {
  id: number;
  name: string;
  hoursPlayed: number;
  highestScore: number;
  rank: string;
};

export type StatsForm = Record<'name' | 'hoursPlayed' | 'highestScore' | 'rank', string>;

export const initialGames: GameStat[] = [
  { id: 1, name: 'Valorant', hoursPlayed: 120, highestScore: 32, rank: 'Gold' },
  { id: 2, name: 'League of Legends', hoursPlayed: 200, highestScore: 18, rank: 'Platinum' },
  { id: 3, name: 'CS:GO', hoursPlayed: 90, highestScore: 27, rank: 'Silver' },
];

export function validateStats(form: StatsForm, games: GameStat[]): string {
  const name = form.name.trim();
  if (!name || name.length > 80) return 'Enter a game name of 1–80 characters.';
  if (games.some(game => game.name.toLowerCase() === name.toLowerCase())) {
    return 'This game already has stats. Remove its card before adding replacement stats.';
  }
  if (!form.hoursPlayed.trim() || !Number.isFinite(Number(form.hoursPlayed)) || Number(form.hoursPlayed) < 0) {
    return 'Enter valid hours played, zero or greater.';
  }
  if (!form.highestScore.trim() || !Number.isSafeInteger(Number(form.highestScore)) || Number(form.highestScore) < 0) {
    return 'Enter a whole-number score, zero or greater.';
  }
  if (form.rank.trim().length > 40) return 'Keep the rank to 40 characters or fewer.';
  return '';
}

export function summarizeGames(games: GameStat[]) {
  return {
    gamesPlayed: games.length,
    totalHours: games.reduce((total, game) => total + game.hoursPlayed, 0),
    mostPlayed: games.reduce<GameStat | null>((best, game) =>
      !best || game.hoursPlayed > best.hoursPlayed ? game : best, null),
  };
}

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
