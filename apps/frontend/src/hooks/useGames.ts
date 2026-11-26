import { useEffect, useSyncExternalStore } from "react";
import { gameService } from "../services/gameService.ts";

/** Returns the immutable shared catalogue; all consumers receive CRUD changes. */
export function useGames() {
  useEffect(() => { void gameService.load().catch(() => undefined); }, []);
  return useSyncExternalStore(gameService.subscribe, gameService.getSnapshot, gameService.getSnapshot);
}
