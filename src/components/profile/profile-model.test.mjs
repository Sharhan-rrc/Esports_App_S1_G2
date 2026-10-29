import test from 'node:test';
import assert from 'node:assert/strict';
import { initialGames, validateStats, summarizeGames, parseSavedGames } from './profile-model.ts';

const valid = { name: '  Test Game  ', hoursPlayed: '1.5', highestScore: '0', rank: '' };
test('accepts trimmed names, fractional hours, zero scores and optional rank', () => {
  assert.equal(validateStats(valid, initialGames), '');
});
test('rejects blank and duplicate game names regardless of case', () => {
  for (const name of [' ', ' VALORANT ', 'a'.repeat(81)]) {
    assert.ok(validateStats({ ...valid, name }, initialGames));
  }
});
test('rejects invalid hours and scores instead of silently converting to zero', () => {
  for (const hoursPlayed of ['', ' ', '-1', 'NaN', 'Infinity', '1e309']) {
    assert.ok(validateStats({ ...valid, hoursPlayed }, []));
  }
  for (const highestScore of ['', '-1', '0.5', 'Infinity', '9007199254740992']) {
    assert.ok(validateStats({ ...valid, highestScore }, []));
  }
  assert.ok(validateStats({ ...valid, rank: 'a'.repeat(41) }, []));
});
test('summaries reflect additions, removals and empty lists without comparing game scores', () => {
  assert.deepEqual(summarizeGames([]), { gamesPlayed: 0, totalHours: 0, mostPlayed: null });
  assert.equal(summarizeGames(initialGames).totalHours, initialGames.reduce((sum, game) => sum + game.hoursPlayed, 0));
  assert.equal(summarizeGames(initialGames).mostPlayed.name, 'League of Legends');
  assert.equal(summarizeGames(initialGames.slice(1)).gamesPlayed, initialGames.length - 1);
});
test('restores saved stats and preserves deliberately empty lists', () => {
  assert.deepEqual(parseSavedGames(JSON.stringify(initialGames)), initialGames);
  assert.deepEqual(parseSavedGames('[]'), []);
});
test('falls back safely for malformed, invalid and duplicate saved records', () => {
  for (const value of [null, '{', '{}', '[null]', JSON.stringify([{ ...initialGames[0], hoursPlayed: -1 }]),
    JSON.stringify([initialGames[0], initialGames[0]])]) {
    assert.deepEqual(parseSavedGames(value), initialGames);
  }
});
