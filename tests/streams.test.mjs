import { test } from "node:test";
import assert from "node:assert/strict";
import { createStreamRepository } from "../src/repositories/streamRepository.ts";
import { createStreamService } from "../src/services/streamService.ts";
import { streamTestData } from "../src/data/streamData.ts";
test("Parneet has ten typed seed records and independent CRUD", () => {
  assert.equal(streamTestData.length, 10);
  const repo = createStreamRepository([]);
  const service = createStreamService(repo);
  let calls = 0;
  const unsubscribe = service.subscribe(() => calls++);
  const original = service.getSnapshot();
  const stream = service.add({ title: " New Finals ", gameId: "1", platform: "Twitch" });
  assert.equal(stream.title, "New Finals");
  assert.equal(repo.getById(stream.id).gameId, 1);
  assert.equal(original.length, 0);
  service.update(stream.id, { title: "Updated Finals", gameId: "2", platform: "YouTube" });
  assert.equal(service.filter(service.getSnapshot(), "1").length, 0);
  assert.equal(service.filter(service.getSnapshot(), "2").length, 1);
  service.remove(stream.id);
  assert.equal(service.getSnapshot().length, 0);
  assert.equal(calls, 3);
  unsubscribe();
  service.add({ title: "Another Finals", gameId: "1", platform: "Twitch" });
  assert.equal(calls, 3);
});
test("stream business rules reject invalid and duplicate records", () => {
  const service = createStreamService(createStreamRepository([]));
  const valid = { title: "Finals", gameId: "1", platform: "Twitch" };
  for (const bad of [
    { ...valid, title: " " }, { ...valid, title: "x".repeat(101) },
    { ...valid, gameId: "999" }, { ...valid, gameId: "" },
    { ...valid, platform: "Unknown" },
  ]) assert.throws(() => service.add(bad));
  const entry = service.add(valid);
  assert.throws(() => service.add({ ...valid, title: " FINALS " }));
  service.update(entry.id, valid);
  assert.equal(service.getSnapshot().length, 1);
  assert.throws(() => service.remove(999));
});
