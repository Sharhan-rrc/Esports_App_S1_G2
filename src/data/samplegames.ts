import type { GameCard, GameLeaderboard, GameStat } from "../types";

export const sampleGames: GameCard[] = [
  { id: 1, name: "Valorant", genre: "FPS", topPlayer: "AceHunter" },
  { id: 2, name: "League of Legends", genre: "MOBA", topPlayer: "ShadowFox" },
  { id: 3, name: "CS:GO", genre: "FPS", topPlayer: "NeonBlade" },
  { id: 4, name: "Dota 2", genre: "MOBA", topPlayer: "MysticBlade" },
  { id: 5, name: "Fortnite", genre: "Battle Royale", topPlayer: "PixelStorm" },
  { id: 6, name: "Apex Legends", genre: "Battle Royale", topPlayer: "VortexKing" },
  { id: 7, name: "Overwatch 2", genre: "Hero Shooter", topPlayer: "IronWolf" },
  { id: 8, name: "Rocket League", genre: "Sports", topPlayer: "SilentArrow" },
];

export const sampleGameStats: GameStat[] = [
  { id: 1, name: "Valorant", hoursPlayed: 120, highestScore: 32, rank: "Gold" },
  { id: 2, name: "League of Legends", hoursPlayed: 200, highestScore: 18, rank: "Platinum" },
  { id: 3, name: "CS:GO", hoursPlayed: 90, highestScore: 27, rank: "Silver" },
  { id: 4, name: "Dota 2", hoursPlayed: 145, highestScore: 24, rank: "Diamond" },
  { id: 5, name: "Fortnite", hoursPlayed: 75, highestScore: 41, rank: "Platinum" },
];

export const sampleGameLeaderboards: GameLeaderboard[] = [
  {
    name: "Valorant",
    players: [
      { id: 1, name: "Skaiser", score: 2980, position: 1 },
      { id: 2, name: "ShadowFox", score: 2740, position: 2 },
      { id: 3, name: "NeonBlade", score: 2510, position: 3 },
      { id: 4, name: "PixelStorm", score: 2260, position: 4 },
      { id: 5, name: "AceHunter", score: 2040, position: 5 },
    ],
  },
  {
    name: "League of Legends",
    players: [
      { id: 1, name: "MysticBlade", score: 3120, position: 1 },
      { id: 2, name: "VortexKing", score: 2890, position: 2 },
      { id: 3, name: "GhostRunner", score: 2650, position: 3 },
      { id: 4, name: "IronWolf", score: 2380, position: 4 },
      { id: 5, name: "SilentArrow", score: 2190, position: 5 },
    ],
  },
  {
    name: "CS:GO",
    players: [
      { id: 1, name: "ShadowFox", score: 3260, position: 1 },
      { id: 2, name: "AceHunter", score: 3010, position: 2 },
      { id: 3, name: "Skaiser", score: 2780, position: 3 },
      { id: 4, name: "IronWolf", score: 2470, position: 4 },
      { id: 5, name: "PixelStorm", score: 2310, position: 5 },
    ],
  },
  {
    name: "Dota 2",
    players: [
      { id: 1, name: "VortexKing", score: 3050, position: 1 },
      { id: 2, name: "NeonBlade", score: 2820, position: 2 },
      { id: 3, name: "MysticBlade", score: 2590, position: 3 },
      { id: 4, name: "SilentArrow", score: 2420, position: 4 },
      { id: 5, name: "GhostRunner", score: 2150, position: 5 },
    ],
  },
  {
    name: "Fortnite",
    players: [
      { id: 1, name: "AceHunter", score: 3190, position: 1 },
      { id: 2, name: "PixelStorm", score: 2930, position: 2 },
      { id: 3, name: "IronWolf", score: 2710, position: 3 },
      { id: 4, name: "ShadowFox", score: 2490, position: 4 },
      { id: 5, name: "Skaiser", score: 2200, position: 5 },
    ],
  },
  {
    name: "Apex Legends",
    players: [
      { id: 1, name: "VortexKing", score: 3410, position: 1 },
      { id: 2, name: "AceHunter", score: 3180, position: 2 },
      { id: 3, name: "NeonBlade", score: 2870, position: 3 },
      { id: 4, name: "GhostRunner", score: 2630, position: 4 },
      { id: 5, name: "IronWolf", score: 2400, position: 5 },
    ],
  },
  {
    name: "Overwatch 2",
    players: [
      { id: 1, name: "IronWolf", score: 2990, position: 1 },
      { id: 2, name: "SilentArrow", score: 2750, position: 2 },
      { id: 3, name: "ShadowFox", score: 2540, position: 3 },
      { id: 4, name: "Skaiser", score: 2310, position: 4 },
      { id: 5, name: "MysticBlade", score: 2100, position: 5 },
    ],
  },
  {
    name: "Rocket League",
    players: [
      { id: 1, name: "SilentArrow", score: 2860, position: 1 },
      { id: 2, name: "PixelStorm", score: 2670, position: 2 },
      { id: 3, name: "VortexKing", score: 2450, position: 3 },
      { id: 4, name: "NeonBlade", score: 2240, position: 4 },
      { id: 5, name: "GhostRunner", score: 2010, position: 5 },
    ],
  },
];

export const loginBenefits = [
  "Track your game stats",
  "Compete on leaderboards",
  "Watch live esports streams",
];
