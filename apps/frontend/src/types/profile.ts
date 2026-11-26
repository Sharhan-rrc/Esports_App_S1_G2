export type GameStat = {
  id: number;
  name: string;
  hoursPlayed: number;
  highestScore: number;
  rank: string;
};

export type StatsForm = Record<'name' | 'hoursPlayed' | 'highestScore' | 'rank', string>;
