import { createMemoryRepository } from "./memoryRepository.ts";
import { initialGames } from "../data/profileData.ts";
import { parseSavedGames } from "./profileParser.ts";
import type { GameStat } from "../types/profile.ts";

const key = "esports.profile.rudra.stats.v1";
const consentKey = key + ".remember";
export function createProfileRepository(storage?: Pick<Storage, "getItem" | "setItem" | "removeItem">) {
  let remember = false;
  let storageError = "";
  let seed = initialGames;
  try {
    remember = storage?.getItem(consentKey) === "true";
    if (remember) seed = parseSavedGames(storage?.getItem(key) ?? null);
  } catch { storageError = "Device storage is unavailable; stats will stay in this session."; }
  const repository = createMemoryRepository<GameStat>(seed);
  const listeners = new Set<() => void>();
  let snapshot = { games: repository.getAll(), remember, storageError };
  function publish() {
    snapshot = { games: repository.getAll(), remember, storageError };
    listeners.forEach(listener => listener());
  }
  repository.subscribe(() => {
    if (remember) {
      try {
        if (!storage) throw new Error("Storage unavailable");
        storage.setItem(key, JSON.stringify(repository.getAll()));
        storageError = "";
      } catch { storageError = "Stats changed for this session, but could not be saved on this device."; }
    }
    publish();
  });
  return {
    ...repository,
    getSnapshot: () => snapshot,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    setRemember(enabled: boolean) {
      remember = enabled;
      try {
        if (!storage) throw new Error("Storage unavailable");
        if (enabled) {
          storage.setItem(key, JSON.stringify(repository.getAll()));
          storage.setItem(consentKey, "true");
        } else { storage.removeItem(consentKey); storage.removeItem(key); }
        storageError = "";
      } catch { storageError = "Could not update device storage. Browser settings may block it."; }
      publish();
    },
  };
}
function deviceStorage() {
  try { return typeof localStorage === "undefined" ? undefined : localStorage; } catch { return undefined; }
}
export const profileRepository = createProfileRepository(deviceStorage());
