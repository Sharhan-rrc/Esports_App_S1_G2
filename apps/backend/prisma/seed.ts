import { streamTestData } from "./streamData.js";
import { initialGames } from "./profileData.js";
import { resetSequences } from "./resetSequences.js";
import { prisma } from "../src/db.js";
import { gameTestData } from "./gameData.js";
import { leaderboardTestData } from "./leaderboardData.js";
try {
  // Seed only an empty installation; never restore user-deleted records on restart.
  if (await prisma.game.count() === 0) {
    await prisma.$transaction(async tx => {
      for (const game of gameTestData) await tx.game.create({ data: game });
      for (const score of leaderboardTestData) {
        const player = await tx.player.upsert({ where: { nameKey: score.name.toLowerCase() }, create: { nameKey: score.name.toLowerCase(), name: score.name }, update: {} });
        await tx.score.create({ data: { id: score.id, gameId: score.gameId, playerId: player.id, score: score.score } });
      }
      for (const stream of streamTestData) await tx.stream.create({ data: stream });
      for (const stat of initialGames) {
        const game = await tx.game.findUniqueOrThrow({ where: { name: stat.name } });
        await tx.personalStat.create({ data: { gameId: game.id, profileKey: "demo-rudra", hoursPlayed: stat.hoursPlayed, highestScore: stat.highestScore, rank: stat.rank } });
      }
      await resetSequences(tx);
    });
  }
} finally { await prisma.$disconnect(); }
