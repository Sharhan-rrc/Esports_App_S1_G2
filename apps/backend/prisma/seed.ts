import { prisma } from "../src/db.js";
import { gameTestData } from "./gameData.js";
import { leaderboardTestData } from "./leaderboardData.js";
try {
  // Seed only an empty installation; never restore user-deleted records on restart.
  if (await prisma.game.count() === 0) {
    await prisma.$transaction(async tx => {
      for (const game of gameTestData) await tx.game.create({ data: game });
      for (const score of leaderboardTestData) {
        const game = await tx.game.findUniqueOrThrow({ where: { name: score.game } });
        const player = await tx.player.upsert({ where: { nameKey: score.name.toLowerCase() }, create: { nameKey: score.name.toLowerCase(), name: score.name }, update: {} });
        await tx.score.create({ data: { id: score.id, gameId: game.id, playerId: player.id, score: score.score } });
      }
    });
  }
} finally { await prisma.$disconnect(); }
