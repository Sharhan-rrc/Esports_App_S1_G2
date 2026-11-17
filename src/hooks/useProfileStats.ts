import { useSyncExternalStore } from "react";
import { profileService } from "../services/profileService.ts";
import { useActionFeedback } from "./useActionFeedback.ts";
import type { StatsForm } from "../types/profile.ts";

/** Both the cards/form and summary subscribe to the same personal-stat resource. */
export function useProfileStats() {
  const state = useSyncExternalStore(profileService.subscribe, profileService.getSnapshot, profileService.getSnapshot);
  const feedback = useActionFeedback();
  return {
    ...state, error: feedback.error, message: feedback.notice,
    summary: profileService.summarize(state.games),
    add: (form: StatsForm) => feedback.run(() => { profileService.add(form); }, "Game stats added."),
    update: (id: number, form: StatsForm) => feedback.run(() => { profileService.update(id, form); }, "Game stats updated."),
    remove: (id: number) => feedback.run(() => profileService.remove(id), "Game stats removed."),
    setRemember: profileService.setRemember,
  };
}
