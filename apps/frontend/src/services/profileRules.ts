import type { GameStat, StatsForm } from "../types/profile.ts";

export function validateStats(form: StatsForm, games: readonly GameStat[], editingId?: number): string {
  const name = form.name.trim();
  if (!name || name.length > 80) return 'Enter a game name of 1–80 characters.';
  if (games.some(game => game.id !== editingId && game.name.toLowerCase() === name.toLowerCase())) {
    return 'This game already has stats. Edit the existing record instead.';
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

export function summarizeGames(games: readonly GameStat[]) {
  return {
    gamesPlayed: games.length,
    totalHours: games.reduce((total, game) => total + game.hoursPlayed, 0),
    mostPlayed: games.reduce<GameStat | null>((best, game) =>
      !best || game.hoursPlayed > best.hoursPlayed ? game : best, null),
  };
}
