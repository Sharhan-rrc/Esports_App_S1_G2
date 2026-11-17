import { useMemo, useState, useSyncExternalStore } from "react";
import { streamService } from "../services/streamService.ts";
import { useGames } from "./useGames.ts";
import { useActionFeedback } from "./useActionFeedback.ts";
import type { StreamInput } from "../types/stream.ts";
/** Parneet's custom hook, reused in StreamList and StreamManager.
* streams: immutable full resource; visibleStreams: filtered display list.
* games: shared choices; selectedGame/setSelectedGame: local filter state.
* error/notice/clear: action feedback. add/update/remove return success booleans.
* Validation/filter rules are delegated to the service; the repository owns data.
*/
export function useStreams() {
  const streams = useSyncExternalStore(streamService.subscribe, streamService.getSnapshot, streamService.getSnapshot);
  const games = useGames();
  const [selectedGame, setSelectedGame] = useState("");
  const { error, notice, clear, run } = useActionFeedback();
  const activeGame = games.some((game) => String(game.id) === selectedGame) ? selectedGame : "";
  const visibleStreams = useMemo(() => streamService.filter(streams, activeGame), [streams, activeGame]);
  return {
    streams, visibleStreams, games, selectedGame: activeGame, setSelectedGame,
    error, notice, clear,
    add: (input: StreamInput) => run(() => { streamService.add(input); }, "Stream added."),
    update: (id: number, input: StreamInput) => run(() => { streamService.update(id, input); }, "Stream updated."),
    remove: (id: number) => run(() => { streamService.remove(id); }, "Stream removed."),
  };
}
