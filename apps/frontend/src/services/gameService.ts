import { gameRepository } from "../repositories/gameRepository.ts";
import type { GameInput } from "../types/game.ts";

function validate(input: GameInput, id?: number): GameInput {
  const name = input.name.trim();
  const genre = input.genre.trim();
  const topPlayer = input.topPlayer.trim();
  if (!name || name.length > 60) throw new Error("Enter a game name of 1-60 characters.");
  if (!genre || !topPlayer) throw new Error("Enter a genre and top player.");
  if (gameRepository.getAll().some((game) =>
    game.id !== id && game.name.toLowerCase() === name.toLowerCase(),
  )) throw new Error("This game already exists.");
  return { name, genre, topPlayer };
}
export const gameService = {
  subscribe: gameRepository.subscribe,
  getSnapshot: gameRepository.getAll,
  addGame: (input: GameInput) => gameRepository.create(validate(input)),
};
