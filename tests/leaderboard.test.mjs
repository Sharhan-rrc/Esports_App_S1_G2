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

