-- Immediate NO ACTION constraints retain deletion protection and report PostgreSQL
-- foreign_key_violation (23503), which Prisma 6 maps to P2003 / HTTP 409.
ALTER TABLE "Score" DROP CONSTRAINT "Score_gameId_fkey";
ALTER TABLE "Score" DROP CONSTRAINT "Score_playerId_fkey";
ALTER TABLE "Score" ADD CONSTRAINT "Score_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "Score" ADD CONSTRAINT "Score_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
