import { prisma } from "../db.js";
import { HttpError } from "../middleware/errors.js";
import type { StreamInput } from "../validations/streamSchema.js";
function dto(row: { id:number; gameId:number; title:string; platform:string }) { return { id:row.id, gameId:row.gameId, title:row.title, platform:row.platform }; }
async function draft(input:StreamInput) {
  const game = await prisma.game.findUnique({where:{id:input.gameId}});
  if (!game) throw new HttpError(400,"Select an existing game.");
  return input;
}
export const streamService = {
  async list() { return (await prisma.stream.findMany({orderBy:{id:"asc"}})).map(dto); },
  async create(input:StreamInput) { return dto(await prisma.stream.create({data:await draft(input)})); },
  async update(id:number,input:StreamInput) { return dto(await prisma.stream.update({where:{id},data:await draft(input)})); },
  async remove(id:number) { await prisma.stream.delete({where:{id}}); },
};
