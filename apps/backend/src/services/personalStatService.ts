import { prisma } from "../db.js";
import { HttpError } from "../middleware/errors.js";
import type { PersonalStatInput } from "../validations/personalStatSchema.js";
function dto(row: { id:number; hoursPlayed:number; highestScore:number; rank:string; game:{ name:string } }) { return { id:row.id, name:row.game.name, hoursPlayed:row.hoursPlayed, highestScore:row.highestScore, rank:row.rank }; }
const profileKey = "demo-rudra";
async function draft(input:PersonalStatInput) {
  const game = await prisma.game.findUnique({where:{name:input.name}});
  if (!game) throw new HttpError(400,"Select a game from the catalogue.");
  return { gameId:game.id, profileKey, hoursPlayed:input.hoursPlayed, highestScore:input.highestScore, rank:input.rank };
}
async function requireOwn(id:number) {
  if (!await prisma.personalStat.findFirst({where:{id,profileKey}})) throw new HttpError(404,"These stats no longer exist.");
}
export const personalStatService = {
  async list() { return (await prisma.personalStat.findMany({where:{profileKey}, orderBy:{id:"asc"}, include:{game:true}})).map(dto); },
  async create(input:PersonalStatInput) { return dto(await prisma.personalStat.create({data:await draft(input), include:{game:true}})); },
  async update(id:number,input:PersonalStatInput) { await requireOwn(id); return dto(await prisma.personalStat.update({where:{id},data:await draft(input), include:{game:true}})); },
  async remove(id:number) { await requireOwn(id); await prisma.personalStat.delete({where:{id}}); },
};
