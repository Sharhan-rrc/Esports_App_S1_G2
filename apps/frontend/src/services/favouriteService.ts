import { favouriteRepository } from "../repositories/favouriteRepository.ts";
import { gameRepository } from "../repositories/gameRepository.ts";
import type { Favourite, GameCard } from "../types/game.ts";

export const favouriteService = {
  subscribe: favouriteRepository.subscribe,
  getSnapshot: favouriteRepository.getAll,
  getGames(favourites: readonly Favourite[], games: readonly GameCard[]) {
    return games.filter((game) => favourites.some((favourite) => favourite.gameId === game.id));
  },
  addFavourite(gameId: number) {
    if (!gameRepository.getById(gameId)) throw new Error("Select an existing game.");
    if (favouriteRepository.getAll().some((item) => item.gameId === gameId)) {
      throw new Error("This game is already a favourite.");
    }
    return favouriteRepository.create({ gameId });
  },
  removeFavourite(gameId: number) {
    const item = favouriteRepository.getAll().find((favourite) => favourite.gameId === gameId);
    if (!item) throw new Error("This favourite no longer exists.");
    favouriteRepository.delete(item.id);
  },
};
