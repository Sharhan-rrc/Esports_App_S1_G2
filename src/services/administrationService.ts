import { gameService } from "./gameService.ts";
import { gameRepository } from "../repositories/gameRepository.ts";
import { streamRepository } from "../repositories/streamRepository.ts";
import { profileRepository } from "../repositories/profileRepository.ts";
import { favouriteRepository } from "../repositories/favouriteRepository.ts";
import { leaderboardRepository } from "../repositories/leaderboardRepository.ts";
import type { GameInput } from "../types/game.ts";

/** Shared integration rules. Prevent deleting games that other pages still use.
 * Game names remain the existing Leaderboard resource key; other resources use IDs.
 * Apply after all three individual feature branches have been integrated.
 */
export const administrationService = {
  addGame: (input: GameInput) => gameService.addGame(input),
  removeGame(id: number) {
    const game = gameRepository.getById(id);
    if (!game) throw new Error("This game no longer exists.");
    const referenced = streamRepository.getAll().some((item) => item.gameId === id) ||
      profileRepository.getAll().some((item) => item.name.toLowerCase() === game.name.toLowerCase()) ||
      favouriteRepository.getAll().some((item) => item.gameId === id) ||
      leaderboardRepository.getAll().some((item) => item.game === game.name);
    if (referenced) {
      throw new Error("Remove this game's streams, personal stats, favourites and scores before deleting the game.");
    }
    gameRepository.delete(id);
  },
};
