import type { Prisma } from "@prisma/client";
// Explicit seed/import IDs do not advance PostgreSQL SERIAL sequences.
export async function resetSequences(tx: Prisma.TransactionClient) {
  await tx.$queryRaw`SELECT setval(pg_get_serial_sequence('"Game"', 'id'), COALESCE(MAX(id), 1), COUNT(*) > 0) FROM "Game"`;
  await tx.$queryRaw`SELECT setval(pg_get_serial_sequence('"Player"', 'id'), COALESCE(MAX(id), 1), COUNT(*) > 0) FROM "Player"`;
  await tx.$queryRaw`SELECT setval(pg_get_serial_sequence('"Score"', 'id'), COALESCE(MAX(id), 1), COUNT(*) > 0) FROM "Score"`;
}
