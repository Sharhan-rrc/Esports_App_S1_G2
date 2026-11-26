import type { Prisma } from "@prisma/client";
import { prisma } from "../db.js";
import { HttpError } from "../middleware/errors.js";
import type { ScoreInput } from "../validations/scoreSchema.js";
const include = { game: true, player: true } as const;
function dto(row: { id: number; player: { name: string }; score: number; game: { name: string } }) {
  return { id: row.id, game: row.game.name, name: row.player.name, score: row.score };
}
async function draft(tx: Prisma.TransactionClient, input: ScoreInput) {
  const game = await tx.game.findUnique({ where: { name: input.game } });
  if (!game) throw new HttpError(400, "Select an existing game.");
  const player = await tx.player.upsert({ where: { nameKey: input.name.toLowerCase() }, create: { nameKey: input.name.toLowerCase(), name: input.name }, update: {} });
  return { gameId: game.id, playerId: player.id, score: input.score };
}
export const scoreService = {
  async list() { return (await prisma.score.findMany({ include, orderBy: { id: "asc" } })).map(dto); },
  async create(input: ScoreInput) { return prisma.$transaction(async tx => dto(await tx.score.create({ data: await draft(tx, input), include }))); },
  async update(id: number, input: ScoreInput) { return prisma.$transaction(async tx => { if (!await tx.score.findUnique({ where: { id } })) throw new HttpError(404, "This score no longer exists."); return dto(await tx.score.update({ where: { id }, data: await draft(tx, input), include })); }); },
  async remove(id: number) { await prisma.score.delete({ where: { id } }); },
};
