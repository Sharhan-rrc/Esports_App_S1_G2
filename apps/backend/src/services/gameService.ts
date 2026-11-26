import { prisma } from "../db.js";
export const gameService = {
  list: () => prisma.game.findMany({ orderBy: { id: "asc" } }),
  create: (input: { name: string; genre: string; topPlayer: string }) => prisma.game.create({ data: input }),
  remove: (id: number) => prisma.game.delete({ where: { id } }),
};
