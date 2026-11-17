import { streamRepository } from "../repositories/streamRepository.ts";
import { gameRepository } from "../repositories/gameRepository.ts";
import { streamPlatforms } from "../types/stream.ts";
import type { Stream, StreamInput } from "../types/stream.ts";
export function createStreamService(repository = streamRepository) {
  function validate(input: StreamInput, editingId?: number): Omit<Stream, "id"> {
    const title = input.title.trim();
    const gameId = Number(input.gameId);
    const platform = streamPlatforms.find((value) => value === input.platform);
    if (!title || title.length > 100) throw new Error("Enter a stream title of 1-100 characters.");
    if (!input.gameId.trim() || !Number.isSafeInteger(gameId) || !gameRepository.getById(gameId)) {
      throw new Error("Select an existing game.");
    }
    if (!platform) throw new Error("Select YouTube or Twitch.");
    if (repository.getAll().some((stream) =>
      stream.id !== editingId && stream.gameId === gameId && stream.platform === platform &&
      stream.title.toLowerCase() === title.toLowerCase(),
    )) throw new Error("This stream already exists for that game and platform.");
    return { title, gameId, platform };
  }
  return {
    subscribe: repository.subscribe,
    getSnapshot: repository.getAll,
    add: (input: StreamInput) => repository.create(validate(input)),
    update: (id: number, input: StreamInput) => repository.update(id, validate(input, id)),
    remove: (id: number) => repository.delete(id),
    filter: (entries: readonly Stream[], gameId: string) =>
      entries.filter((stream) => !gameId || stream.gameId === Number(gameId)),
  };
}
export const streamService = createStreamService();
