import { streamRepository } from "../repositories/streamRepository.ts";
import { createMemoryRepository } from "../repositories/memoryRepository.ts";
import { gameRepository } from "../repositories/gameRepository.ts";
import { streamPlatforms } from "../types/stream.ts";
import type { Stream,StreamInput } from "../types/stream.ts";
export function createStreamService(repository: ReturnType<typeof createMemoryRepository<Stream>> | typeof streamRepository = streamRepository) {
 function validate(input:StreamInput,editingId?:number):Omit<Stream,"id"> {
  const title=input.title.trim();const gameId=Number(input.gameId);const platform=streamPlatforms.find(value=>value===input.platform);
  if(!title||title.length>100)throw new Error("Enter a stream title of 1-100 characters.");
  if(!input.gameId.trim()||!Number.isSafeInteger(gameId)||!gameRepository.getById(gameId))throw new Error("Select an existing game.");
  if(!platform)throw new Error("Select YouTube or Twitch.");
  if(repository.getAll().some(row=>row.id!==editingId&&row.gameId===gameId&&row.platform===platform&&row.title.toLowerCase()===title.toLowerCase()))throw new Error("This stream already exists for that game and platform.");
  return {title,gameId,platform};
 }
 const idle={loading:false,saving:false,loaded:true,error:""};
 return {
  subscribe:repository.subscribe,getSnapshot:repository.getAll,
  getState:()=>"getState" in repository?repository.getState():idle,
  load:(force=false)=>"load" in repository?repository.load(force):Promise.resolve(),
  add:(input:StreamInput)=>repository.create(validate(input)),
  update:(id:number,input:StreamInput)=>repository.update(id,validate(input,id)),
  remove:repository.delete,
  filter:(entries:readonly Stream[],gameId:string)=>entries.filter(row=>!gameId||row.gameId===Number(gameId)),
 };
}
export const streamService=createStreamService();
