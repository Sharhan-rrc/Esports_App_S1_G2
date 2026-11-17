import { gameTestData } from "../data/gameData.ts";
import type { GameCard, GameInput } from "../types/game.ts";
import { request } from "./http.ts";
let records: readonly GameCard[] = Object.freeze(gameTestData);
let loading: Promise<void> | undefined;
const listeners = new Set<() => void>();
function publish(next: readonly GameCard[]) { records = Object.freeze(next.map(game => Object.freeze({ ...game }))); listeners.forEach(listener => listener()); }
export const gameRepository = {
  getAll: () => records,
  getById: (id: number) => records.find(game => game.id === id),
  subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
  load() {
    if (!loading) loading = request<GameCard[]>("/games").then(publish).finally(() => { loading = undefined; });
    return loading;
  },
  async create(input: GameInput) { const game = await request<GameCard>("/games", "POST", input); publish([...records, game]); return game; },
  async delete(id: number) { await request("/games/" + id, "DELETE"); publish(records.filter(game => game.id !== id)); },
};
