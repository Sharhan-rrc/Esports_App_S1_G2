import { createApiRepository } from "./apiRepository.ts";
import { createMemoryRepository } from "./memoryRepository.ts";
import { streamTestData } from "../data/streamData.ts";
import type { Stream } from "../types/stream.ts";
export const createStreamRepository = (seed: readonly Stream[] = streamTestData) =>
  createMemoryRepository<Stream>(seed);
export const streamRepository = createApiRepository<Stream>("/streams");
