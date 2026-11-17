import type { Stream } from "../types/stream.ts";
/** Parneet's unique resource: ten typed stream records using shared game IDs. */
export const streamTestData: readonly Stream[] = [
  { id: 1, title: "Valorant Finals", gameId: 1, platform: "YouTube" },
  { id: 2, title: "LoL Championship", gameId: 2, platform: "Twitch" },
  { id: 3, title: "CS:GO Major", gameId: 3, platform: "YouTube" },
  { id: 4, title: "Dota 2 Playoffs", gameId: 4, platform: "Twitch" },
  { id: 5, title: "Fortnite Arena", gameId: 5, platform: "YouTube" },
  { id: 6, title: "Apex Invitational", gameId: 6, platform: "Twitch" },
  { id: 7, title: "Rocket League Championship", gameId: 7, platform: "YouTube" },
  { id: 8, title: "Overwatch Team Finals", gameId: 8, platform: "Twitch" },
  { id: 9, title: "PUBG Global Match", gameId: 9, platform: "YouTube" },
  { id: 10, title: "Siege Playoffs", gameId: 10, platform: "Twitch" },
];
