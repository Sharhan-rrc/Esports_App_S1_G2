/** One player's highest score in one game. Rank is calculated, never stored. */
export interface LeaderboardEntry {
  readonly id: number;
  readonly game: string;
  readonly name: string;
  readonly score: number;
}
export type LeaderboardDraft = Omit<LeaderboardEntry, "id">;
/** Raw form values are validated by the service before reaching a repository. */
export interface LeaderboardInput {
  game: string;
  name: string;
  score: string;
}
export interface RankedPlayer extends LeaderboardEntry {
  position: number;
}
export interface GameLeaderboard {
  name: string;
  players: RankedPlayer[];
}

