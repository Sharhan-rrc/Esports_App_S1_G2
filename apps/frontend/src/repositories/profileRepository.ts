import type { GameStat } from "../types/profile.ts";
import { createApiRepository } from "./apiRepository.ts";
export const profileRepository = createApiRepository<GameStat>("/personal-stats");
