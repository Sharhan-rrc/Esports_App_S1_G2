/** Compatibility exports for Rudra's original model tests; implementation lives in layers. */
export type { GameStat, StatsForm } from "../../types/profile.ts";
export { initialGames } from "../../data/profileData.ts";
export { validateStats, summarizeGames } from "../../services/profileRules.ts";
export { parseSavedGames } from "../../repositories/profileParser.ts";
