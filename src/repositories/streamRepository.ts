import { createMemoryRepository } from "./memoryRepository.ts";
import { streamTestData } from "../data/streamData.ts";
import type { Stream } from "../types/stream.ts";
/** Parneet's typed stream repository: CRUD, IDs and shared snapshots.
* No stream validation or filtering belongs in this data-access layer.
*/
export const createStreamRepository = (seed: readonly Stream[] = streamTestData) =>
  createMemoryRepository<Stream>(seed);
export const streamRepository = createStreamRepository();
