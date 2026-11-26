import { profileRepository } from "../repositories/profileRepository.ts";
import { validateStats, summarizeGames } from "./profileRules.ts";
import type { StatsForm } from "../types/profile.ts";
function draft(form:StatsForm,id?:number) {
  const error=validateStats(form,profileRepository.getAll(),id); if(error) throw new Error(error);
  return {name:form.name.trim(),hoursPlayed:Number(form.hoursPlayed),highestScore:Number(form.highestScore),rank:form.rank.trim()||"Unranked"};
}
export const profileService={
  getSnapshot:profileRepository.getAll, getState:profileRepository.getState, subscribe:profileRepository.subscribe,
  load:profileRepository.load, summarize:summarizeGames,
  add:(form:StatsForm)=>profileRepository.create(draft(form)),
  update:(id:number,form:StatsForm)=>profileRepository.update(id,draft(form,id)),
  remove:profileRepository.delete,
};
