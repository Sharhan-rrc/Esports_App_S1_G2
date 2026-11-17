import { test } from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import type { Server } from "node:http";
import { PrismaClient } from "@prisma/client";
import app from "../src/app.js";
import { prisma } from "../src/db.js";

test("persistent score CRUD, validation, conflicts and CORS", async () => {
  let server: Server = app.listen(0, "127.0.0.1");
  async function address() { if (!server.listening) await once(server, "listening"); const value = server.address(); if (!value || typeof value === "string") throw Error(); return "http://127.0.0.1:" + value.port; }
  let base = await address();
  async function call(path: string, method = "GET", body?: unknown, headers: Record<string,string> = {}) {
    return fetch(base + "/api/v1" + path, { method, headers: { ...(body === undefined ? {} : { "Content-Type": "application/json" }), ...headers }, body: body === undefined ? undefined : JSON.stringify(body) });
  }
  let gameId: number | undefined;
  let scoreId: number | undefined;
  const name = "Test" + Date.now();
  try {
    const createdGame = await call("/games", "POST", { name, genre: "Test", topPlayer: "Demo" });
    assert.equal(createdGame.status, 201); gameId = (await createdGame.json()).id;
    const input = { game: name, name: name, score: 501 };
    for (const bad of [{ ...input, score: 500 }, { ...input, score: 2.5 }, { ...input, name: "AB" }, { ...input, unexpected: true }, { ...input, game: "Missing game" }]) assert.equal((await call("/scores", "POST", bad)).status, 400);
    assert.equal((await call("/scores?unexpected=yes")).status, 400);
    assert.equal((await call("/scores/not-a-number", "DELETE")).status, 400);
    assert.equal((await call("/scores/9007199254740991", "DELETE")).status, 400);
    const created = await call("/scores", "POST", input); assert.equal(created.status, 201);
    scoreId = (await created.json()).id;
    assert.equal((await call("/scores", "POST", { ...input, name: name.toUpperCase() })).status, 409);
    assert.equal((await call("/games/" + gameId, "DELETE")).status, 409);
    const changed = await call("/scores/" + scoreId, "PUT", { ...input, score: 777 }); assert.equal(changed.status, 200);
    assert.equal((await changed.json()).score, 777);
    const separateConnection = new PrismaClient();
    try { assert.equal((await separateConnection.score.findUniqueOrThrow({ where: { id: scoreId } })).score, 777); } finally { await separateConnection.$disconnect(); }
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    server = app.listen(0, "127.0.0.1"); base = await address();
    const rows = await (await call("/scores")).json();
    assert.equal(rows.find((row: {id:number}) => row.id === scoreId).score, 777);
    const allowed = await call("/scores", "GET", undefined, { Origin: "http://localhost:5173" });
    assert.equal(allowed.headers.get("access-control-allow-origin"), "http://localhost:5173");
    assert.equal((await call("/scores", "GET", undefined, { Origin: "https://untrusted.example" })).status, 403);
    assert.equal((await call("/scores", "OPTIONS", undefined, { Origin: "http://localhost:5173", "Access-Control-Request-Method": "POST" })).status, 204);
    assert.equal((await call("/scores/" + scoreId, "DELETE")).status, 204);
    assert.equal((await call("/scores/" + scoreId, "DELETE")).status, 404); scoreId = undefined;
    assert.equal((await call("/scores/2147483647", "PUT", input)).status, 404);
  } finally {
    if (scoreId) await prisma.score.deleteMany({ where: { id: scoreId } });
    if (gameId) await prisma.game.deleteMany({ where: { id: gameId } });
    await prisma.player.deleteMany({ where: { nameKey: name.toLowerCase(), scores: { none: {} } } });
    await new Promise<void>(resolve => server.close(() => resolve()));
    await prisma.$disconnect();
  }
});
