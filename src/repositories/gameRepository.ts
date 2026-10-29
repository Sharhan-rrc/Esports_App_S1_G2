import { createMemoryRepository } from "./memoryRepository.ts";
import { gameTestData } from "../data/gameData.ts";
import type { GameCard } from "../types/game.ts";
export const gameRepository = createMemoryRepository<GameCard>(gameTestData);
