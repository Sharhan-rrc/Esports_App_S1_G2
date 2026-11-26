import { useEffect,useSyncExternalStore } from "react";
import { profileService } from "../services/profileService.ts";
import { useAsyncFeedback } from "./useAsyncFeedback.ts";
import type { StatsForm } from "../types/profile.ts";
export function useProfileStats() {
  const games=useSyncExternalStore(profileService.subscribe,profileService.getSnapshot,profileService.getSnapshot);
  const status=useSyncExternalStore(profileService.subscribe,profileService.getState,profileService.getState);
  const feedback=useAsyncFeedback();
  useEffect(()=>{void profileService.load().catch(()=>undefined);},[]);
  return {games,summary:profileService.summarize(games),...status,error:feedback.error||status.error,message:feedback.notice,
    retry:()=>{void profileService.load(true).catch(()=>undefined);},
    add:(form:StatsForm)=>feedback.run(()=>profileService.add(form),"Stats saved to the database."),
    update:(id:number,form:StatsForm)=>feedback.run(()=>profileService.update(id,form),"Stats updated."),
    remove:(id:number)=>feedback.run(()=>profileService.remove(id),"Stats removed."),
  };
}
