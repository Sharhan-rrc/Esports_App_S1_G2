import { test } from "node:test";
import assert from "node:assert/strict";
import { createLeaderboardRepository } from "../src/repositories/leaderboardRepository.ts";
import { leaderboardTestData } from "../src/data/leaderboardData.ts";

test("test data preserves 25 entries with unique resource IDs", () => {
  assert.equal(leaderboardTestData.length, 25);
  assert.equal(new Set(leaderboardTestData.map(entry => entry.id)).size, 25);
});

test("CRUD publishes immutable snapshots, notifies both consumers, and unsubscribes", () => {
  const repository = createLeaderboardRepository([]);
  const before = repository.getAll();
  let formUpdates = 0;
  let tableUpdates = 0;
  const unsubscribe = repository.subscribe(() => formUpdates++);
  repository.subscribe(() => tableUpdates++);
  const entry = repository.create({ game: "Valorant", name: "Trial", score: 100 });
  assert.equal(repository.getById(entry.id).score, 100);
  assert.equal(before.length, 0);
  assert.equal(Object.isFrozen(repository.getAll()), true);
  assert.equal(Object.isFrozen(entry), true);
  repository.update(entry.id, { game: "Valorant", name: "Trial", score: 200 });
  assert.equal(repository.getById(entry.id).score, 200);
  unsubscribe();
  repository.delete(entry.id);
  assert.equal(repository.getById(entry.id), undefined);
  assert.equal(formUpdates, 2);
  assert.equal(tableUpdates, 3);
  assert.throws(() => repository.update(entry.id, { game: "Valorant", name: "Trial", score: 1 }));
  assert.throws(() => repository.delete(entry.id));
  const next = repository.create({ game: "Valorant", name: "New", score: 0 });
  assert.ok(next.id > entry.id);
});

import { createLeaderboardService } from "../src/services/leaderboardService.ts";

const makeService = (seed = []) => createLeaderboardService(createLeaderboardRepository(seed), ["Valorant", "Dota 2"]);

test("service validates raw scores and games without changing data on failure", () => {
  const service = makeService();
  for (const score of ["", " ", "500", "1.5", "Infinity", "NaN", "9007199254740992"]) {
    assert.throws(() => service.addScore({ game: "Valorant", name: "Player", score }));
  }
  assert.throws(() => service.addScore({ game: "Unknown", name: "Player", score: "1" }));
  assert.throws(() => service.addScore({ game: "Valorant", name: "  ", score: "1" }));
  assert.throws(() => service.addScore({ game: "Valorant", name: "AB", score: "501" }));
  assert.throws(() => service.addScore({ game: "Valorant", name: "A".repeat(41), score: "1" }));
  assert.equal(service.getSnapshot().length, 0);
  const entry = service.addScore({ game: "Valorant", name: "  Player  ", score: "501" });
  assert.equal(entry.name, "Player");
  assert.equal(entry.score, 501);
});

test("one score per player per game; edits can retain their own name", () => {
  const service = makeService();
  const entry = service.addScore({ game: "Valorant", name: "Player", score: "501" });
  assert.throws(() => service.addScore({ game: "Valorant", name: " PLAYER ", score: "502" }));
  service.updateScore(entry.id, { game: "Valorant", name: "Player", score: "503" });
  service.addScore({ game: "Dota 2", name: "Player", score: "504" });
  assert.throws(() => service.updateScore(entry.id, { game: "Dota 2", name: "Player", score: "505" }));
  assert.equal(service.getEntry(entry.id).score, 503);
});

test("ties share ranks, search preserves ranks, and filtering does not mutate data", () => {
  const service = makeService([
    { id: 1, game: "Valorant", name: "Third", score: 50 },
    { id: 2, game: "Valorant", name: "First", score: 100 },
    { id: 3, game: "Valorant", name: "Tied", score: 100 },
    { id: 4, game: "Dota 2", name: "Other", score: 1 },
  ]);
  const snapshot = service.getSnapshot();
  assert.deepEqual(service.getLeaderboards(snapshot, "Valorant")[0].players.map(p => p.position), [1, 1, 3]);
  const filtered = service.getLeaderboards(snapshot, "Valorant", " THIRD ");
  assert.equal(filtered[0].players[0].position, 3);
  assert.equal(service.getSnapshot(), snapshot);
  assert.equal(snapshot[0].name, "Third");
  service.deleteScore(2);
  service.deleteScore(3);
  assert.equal(service.getLeaderboards(service.getSnapshot(), "Valorant")[0].players[0].position, 1);
  service.deleteScore(1);
  assert.deepEqual(service.getLeaderboards(service.getSnapshot(), "Valorant")[0].players, []);
});
