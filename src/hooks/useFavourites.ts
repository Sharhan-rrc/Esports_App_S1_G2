import { useSyncExternalStore } from "react";
import { favouriteService } from "../services/favouriteService.ts";
import { useGames } from "./useGames.ts";
import { useActionFeedback } from "./useActionFeedback.ts";

/** Returns games (catalogue), favourites (joined games), error/notice/clear feedback,
 * add(gameId) and remove(gameId) service actions returning true on success.
 * The shared repository, not a separate hook instance, owns favourite data.
 */
export function useFavourites() {
  const games = useGames();
  const entries = useSyncExternalStore(
    favouriteService.subscribe, favouriteService.getSnapshot, favouriteService.getSnapshot,
  );
  const { error, notice, clear, run } = useActionFeedback();
  return {
    games,
    favourites: favouriteService.getGames(entries, games),
    error, notice, clear,
    add: (gameId: number) => run(() => { favouriteService.addFavourite(gameId); }, "Favourite added."),
    remove: (gameId: number) => run(() => { favouriteService.removeFavourite(gameId); }, "Favourite removed."),
  };
}
