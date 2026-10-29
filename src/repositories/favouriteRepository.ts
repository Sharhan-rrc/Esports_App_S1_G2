import { createMemoryRepository } from "./memoryRepository.ts";
import type { Favourite } from "../types/game.ts";

/** Favourites initially remain empty, as in the existing app. */
export const favouriteRepository = createMemoryRepository<Favourite>([]);
