import { readFileSync } from "node:fs";
import type { Prisma } from "@prisma/client";
import { prisma } from "../src/db.js";
import { resetSequences } from "./resetSequences.js";
const file = process.argv[2];
if (!file) throw new Error("Supply the JSON export path.");
const data = JSON.parse(readFileSync(file, "utf8")) as {
  games: Prisma.GameCreateManyInput[];
  players: Prisma.PlayerCreateManyInput[];
  scores: Prisma.ScoreCreateManyInput[];
};
try {
  await prisma.$transaction(async tx => {
    if (await tx.game.count() || await tx.player.count() || await tx.score.count()) {
      throw new Error("Import requires an empty database; existing data will not be overwritten.");
    }
    await tx.game.createMany({ data: data.games });
    await tx.player.createMany({ data: data.players });
    await tx.score.createMany({ data: data.scores });
    await resetSequences(tx);
  });
  console.log("Imported games, players and scores from the SQLite export.");
} finally { await prisma.$disconnect(); }
