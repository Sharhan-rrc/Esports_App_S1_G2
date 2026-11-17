import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { streamService } from "../services/streamService.ts";
import { useGames } from "./useGames.ts";
import { useAsyncFeedback } from "./useAsyncFeedback.ts";
import type { StreamInput } from "../types/stream.ts";
export function useStreams() {
  const status = useSyncExternalStore(streamService.subscribe, streamService.getState, streamService.getState);
  useEffect(() => { void streamService.load().catch(() => undefined); }, []);
  const streams = useSyncExternalStore(streamService.subscribe, streamService.getSnapshot, streamService.getSnapshot);
  const games = useGames();
  const [selectedGame, setSelectedGame] = useState("");
  const { error, notice, clear, run } = useAsyncFeedback();
  const activeGame = games.some((game) => String(game.id) === selectedGame) ? selectedGame : "";
  const visibleStreams = useMemo(() => streamService.filter(streams, activeGame), [streams, activeGame]);
  return {
    streams, visibleStreams, games, selectedGame: activeGame, setSelectedGame,
    error,
    loadError: status.loadError,
    notice,
    clear,
    loading: status.loading,
    saving: status.saving,
    loaded: status.loaded,
    retry: () => { void streamService.load(true).catch(() => undefined); },
    add: (input: StreamInput) => run(() => streamService.add(input), "Stream added."),
    update: (id: number, input: StreamInput) => run(() => streamService.update(id, input), "Stream updated."),
    remove: (id: number) => run(() => streamService.remove(id), "Stream removed."),
  };
}
