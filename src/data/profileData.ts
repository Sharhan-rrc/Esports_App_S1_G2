import type { GameStat } from "../types/profile.ts";

/** Ten typed personal-stat records, preserving Rudra's original three. */
export const initialGames: GameStat[] = [
  { id: 1, name: 'Valorant', hoursPlayed: 120, highestScore: 32, rank: 'Gold' },
  { id: 2, name: 'League of Legends', hoursPlayed: 200, highestScore: 18, rank: 'Platinum' },
  { id: 3, name: 'CS:GO', hoursPlayed: 90, highestScore: 27, rank: 'Silver' },
  { id: 4, name: 'Dota 2', hoursPlayed: 40, highestScore: 12, rank: 'Unranked' },
  { id: 5, name: 'Fortnite', hoursPlayed: 50, highestScore: 15, rank: 'Unranked' },
  { id: 6, name: 'Apex Legends', hoursPlayed: 60, highestScore: 18, rank: 'Unranked' },
  { id: 7, name: 'Rocket League', hoursPlayed: 70, highestScore: 21, rank: 'Unranked' },
  { id: 8, name: 'Overwatch 2', hoursPlayed: 80, highestScore: 24, rank: 'Unranked' },
  { id: 9, name: 'PUBG', hoursPlayed: 90, highestScore: 27, rank: 'Unranked' },
  { id: 10, name: 'Rainbow Six Siege', hoursPlayed: 100, highestScore: 30, rank: 'Unranked' },
];
