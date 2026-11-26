import { gameService } from "./gameService.ts";
import { gameRepository } from "../repositories/gameRepository.ts";
import { favouriteRepository } from "../repositories/favouriteRepository.ts";
import type { GameInput } from "../types/game.ts";
export const administrationService = {
  addGame: (input: GameInput) => gameService.addGame(input),
  async removeGame(id: number) {
    if (favouriteRepository.getAll().some(row => row.gameId === id)) throw new Error("Remove this game from favourites before deleting it.");
    await gameRepository.load();
    await gameRepository.delete(id);
  },
};
