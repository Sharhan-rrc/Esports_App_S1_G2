import { test } from "node:test";
import assert from "node:assert/strict";
import { createApiRepository } from "../apps/frontend/src/repositories/apiRepository.ts";
test("API cache waits for confirmation, shares loads and preserves data on failures", async () => {
  const original = globalThis.fetch;
  const repo = createApiRepository("/scores");
  let calls = 0;
  globalThis.fetch = async (_url, options = {}) => {
    calls++;
    if (options.method === "POST") return Response.json({id:1,...JSON.parse(options.body)}, {status:201});
    return Response.json([]);
  };
  try {
    await Promise.all([repo.load(), repo.load()]); assert.equal(calls, 1);
    const before = repo.getAll();
    const saving = repo.create({game:"Valorant",name:"Trial",score:700});
    assert.equal(repo.getAll(), before);
    await saving; assert.equal(repo.getAll().length, 1);
    const confirmed = repo.getAll();
    globalThis.fetch = async () => Response.json({message:"Duplicate"}, {status:409});
    await assert.rejects(repo.update(1,{game:"Valorant",name:"Trial",score:800}), /Duplicate/);
    assert.equal(repo.getAll(), confirmed); assert.equal(repo.getState().saving, false);
    globalThis.fetch = async () => { throw Error("offline"); };
    await assert.rejects(repo.load(true), /Cannot reach/);
    assert.equal(repo.getAll(), confirmed);
  } finally { globalThis.fetch = original; }
});
