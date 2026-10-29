import { profileRepository } from "../repositories/profileRepository.ts";
import { validateStats, summarizeGames } from "./profileRules.ts";
import type { StatsForm } from "../types/profile.ts";

export function createProfileService(repository = profileRepository) {
  function save(form: StatsForm, id?: number) {
    if (id !== undefined && !repository.getById(id)) throw new Error("These stats no longer exist.");
    const error = validateStats(form, repository.getAll(), id);
    if (error) throw new Error(error);
    const draft = { name: form.name.trim(), hoursPlayed: Number(form.hoursPlayed),
      highestScore: Number(form.highestScore), rank: form.rank.trim() || "Unranked" };
    return id === undefined ? repository.create(draft) : repository.update(id, draft);
  }
  return {
    getSnapshot: repository.getSnapshot,
    subscribe: repository.subscribe,
    add: (form: StatsForm) => save(form),
    update: (id: number, form: StatsForm) => save(form, id),
    remove: repository.delete,
    setRemember: repository.setRemember,
    summarize: summarizeGames,
  };
}
export const profileService = createProfileService();
