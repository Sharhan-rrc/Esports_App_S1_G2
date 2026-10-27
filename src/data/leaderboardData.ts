import type { LeaderboardEntry } from "../types/leaderboard.ts";

/** Game catalogue for this resource; coordinate shared IDs at team integration. */
export const leaderboardGames: readonly string[] = ["Valorant", "League of Legends", "CS:GO", "Dota 2", "Fortnite"];

/** Original 25 player scores with globally unique resource IDs. */
export const leaderboardTestData: readonly LeaderboardEntry[] = [
  {
    "id": 1,
    "game": "Valorant",
    "name": "Skaiser",
    "score": 2980
  },
  {
    "id": 2,
    "game": "Valorant",
    "name": "ShadowFox",
    "score": 2740
  },
  {
    "id": 3,
    "game": "Valorant",
    "name": "NeonBlade",
    "score": 2510
  },
  {
    "id": 4,
    "game": "Valorant",
    "name": "PixelStorm",
    "score": 2260
  },
  {
    "id": 5,
    "game": "Valorant",
    "name": "AceHunter",
    "score": 2040
  },
  {
    "id": 6,
    "game": "League of Legends",
    "name": "MysticBlade",
    "score": 3120
  },
  {
    "id": 7,
    "game": "League of Legends",
    "name": "VortexKing",
    "score": 2890
  },
  {
    "id": 8,
    "game": "League of Legends",
    "name": "GhostRunner",
    "score": 2650
  },
  {
    "id": 9,
    "game": "League of Legends",
    "name": "IronWolf",
    "score": 2380
  },
  {
    "id": 10,
    "game": "League of Legends",
    "name": "SilentArrow",
    "score": 2190
  },
  {
    "id": 11,
    "game": "CS:GO",
    "name": "ShadowFox",
    "score": 3260
  },
  {
    "id": 12,
    "game": "CS:GO",
    "name": "AceHunter",
    "score": 3010
  },
  {
    "id": 13,
    "game": "CS:GO",
    "name": "Skaiser",
    "score": 2780
  },
  {
    "id": 14,
    "game": "CS:GO",
    "name": "IronWolf",
    "score": 2470
  },
  {
    "id": 15,
    "game": "CS:GO",
    "name": "PixelStorm",
    "score": 2310
  },
  {
    "id": 16,
    "game": "Dota 2",
    "name": "VortexKing",
    "score": 3050
  },
  {
    "id": 17,
    "game": "Dota 2",
    "name": "NeonBlade",
    "score": 2820
  },
  {
    "id": 18,
    "game": "Dota 2",
    "name": "MysticBlade",
    "score": 2590
  },
  {
    "id": 19,
    "game": "Dota 2",
    "name": "SilentArrow",
    "score": 2420
  },
  {
    "id": 20,
    "game": "Dota 2",
    "name": "GhostRunner",
    "score": 2150
  },
  {
    "id": 21,
    "game": "Fortnite",
    "name": "AceHunter",
    "score": 3190
  },
  {
    "id": 22,
    "game": "Fortnite",
    "name": "PixelStorm",
    "score": 2930
  },
  {
    "id": 23,
    "game": "Fortnite",
    "name": "IronWolf",
    "score": 2710
  },
  {
    "id": 24,
    "game": "Fortnite",
    "name": "ShadowFox",
    "score": 2490
  },
  {
    "id": 25,
    "game": "Fortnite",
    "name": "Skaiser",
    "score": 2200
  }
];
