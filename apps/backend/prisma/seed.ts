import { prisma } from "../src/db.js";
import { gameTestData } from "./gameData.js";
import { leaderboardTestData } from "./leaderboardData.js";
import { streamTestData } from "./streamData.js";
try {
  // Seed only an empty installation; never restore user-deleted records on restart.
  if (await prisma.game.count() === 0) {
    await prisma.$transaction(async tx => {
      for (const game of gameTestData) await tx.game.create({ data: game });
      for (const score of leaderboardTestData) {
        const player = await tx.player.upsert({ where: { nameKey: score.name.toLowerCase() }, create: { nameKey: score.name.toLowerCase(), name: score.name }, update: {} });
        await tx.score.create({ data: { id: score.id, gameId: score.gameId, playerId: player.id, score: score.score } });
      }
    });
  }
  if (await prisma.stream.count() === 0) {
    for (const stream of streamTestData) await prisma.stream.create({data:stream});
  }
} finally { await prisma.$disconnect(); }
