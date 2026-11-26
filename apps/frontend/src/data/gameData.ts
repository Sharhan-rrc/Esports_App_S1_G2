import type { GameCard } from "../types/game.ts";

/** Shared demo catalogue. IDs are used by streams, statistics and favourites. */
export const gameTestData: readonly GameCard[] = [
  { id: 1, name: "Valorant", genre: "FPS", topPlayer: "AceHunter" },
  { id: 2, name: "League of Legends", genre: "MOBA", topPlayer: "ShadowFox" },
  { id: 3, name: "CS:GO", genre: "FPS", topPlayer: "NeonBlade" },
  { id: 4, name: "Dota 2", genre: "MOBA", topPlayer: "MysticBlade" },
  { id: 5, name: "Fortnite", genre: "Battle Royale", topPlayer: "PixelStorm" },
  { id: 6, name: "Apex Legends", genre: "Battle Royale", topPlayer: "StormRunner" },
  { id: 7, name: "Rocket League", genre: "Sports", topPlayer: "SkyRocket" },
  { id: 8, name: "Overwatch 2", genre: "FPS", topPlayer: "Nova" },
  { id: 9, name: "PUBG", genre: "Battle Royale", topPlayer: "EagleEye" },
  { id: 10, name: "Rainbow Six Siege", genre: "FPS", topPlayer: "Sentinel" },
];
