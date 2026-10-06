export interface GameCard {
  id: number;
  name: string;
  genre: string;
  topPlayer: string;
}

export interface LiveStream {
  id: number;
  title: string;
  game: string;
  platform: string;
}

export interface Player {
  id: number;
  name: string;
  score: number;
  position: number;
}

export interface GameLeaderboard {
  name: string;
  players: Player[];
}

export interface GameStat {
  id: number;
  name: string;
  hoursPlayed: number;
  highestScore: number;
  rank: string;
}