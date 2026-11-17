import "dotenv/config";
import { existsSync, mkdirSync, closeSync, openSync } from "node:fs";
import { dirname, resolve, isAbsolute } from "node:path";
const url = process.env.DATABASE_URL;
if (!url?.startsWith("file:")) throw new Error("Set DATABASE_URL in apps/backend/.env to a local SQLite file URL.");
const location = url.slice(5);
const file = isAbsolute(location) ? location : resolve("prisma", location);
mkdirSync(dirname(file), { recursive: true });
if (!existsSync(file)) closeSync(openSync(file, "a"));
