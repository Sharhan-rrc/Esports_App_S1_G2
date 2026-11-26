import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gameRepository } from '../apps/frontend/src/repositories/gameRepository.ts';
import { leaderboardService } from '../apps/frontend/src/services/leaderboardService.ts';
import { administrationService } from '../apps/frontend/src/services/administrationService.ts';
test('admin catalogue changes notify leaderboard and referenced games cannot be removed', async () => {
  const originalFetch = globalThis.fetch;
  let updates = 0;
  const stop = leaderboardService.subscribe(() => updates++);
  const originalGames = gameRepository.getAll();
  let records = [...originalGames];
  globalThis.fetch = async (_url, options = {}) => {
    if (options.method === "DELETE" && _url.endsWith("/1")) return Response.json({message:"This game is still used by other records."},{status:409});
    if (options.method === 'POST') { const game = { ...JSON.parse(options.body), id: 10000 }; records.push(game); return Response.json(game, {status:201}); }
    if (options.method === 'DELETE') { records = records.filter(game => game.id !== 10000); return new Response(null, {status:204}); }
    return Response.json(records);
  };
  try {
    const game = await administrationService.addGame({ name: 'Integration Test', genre: 'Test', topPlayer: 'Demo' });
    assert.ok(leaderboardService.getGames().includes(game.name));
    assert.equal(updates, 1);
    await administrationService.removeGame(game.id);
    assert.equal(gameRepository.getById(game.id), undefined);
    await assert.rejects(administrationService.removeGame(1), /still used/);
  } finally { globalThis.fetch = originalFetch; stop(); }
});
