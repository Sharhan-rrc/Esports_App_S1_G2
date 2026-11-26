import "dotenv/config";
const value = process.env.DATABASE_URL;
if (!value) throw new Error("Set DATABASE_URL in apps/backend/.env to your PostgreSQL connection URL.");
const url = new URL(value);
if (!["postgresql:", "postgres:"].includes(url.protocol)) {
  throw new Error("DATABASE_URL must use PostgreSQL (postgresql://). SQLite is no longer used.");
}
