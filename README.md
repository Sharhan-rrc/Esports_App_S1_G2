# Esports App — Sprint 4

Node 22+, Prisma 6, Express, React and PostgreSQL. The Leaderboard theme and frontend architecture are unchanged.

## Start locally (Windows PostgreSQL installed)

From the repository root, run `npm install`. Copy `apps/backend/.env.example` to `apps/backend/.env` and `apps/frontend/.env.example` to `apps/frontend/.env` only if those files do not exist.

Terminal 1:
```powershell
npm run db:local
```
This runs a separate development cluster on localhost:5433, outside OneDrive, in your Documents/Codex/esports-postgres-data folder. It does not change the installed PostgreSQL service on port 5432. Keep the terminal open. `PG_BIN` and `ESPORTS_PG_DATA` can override the executable and data paths.

Terminal 2:
```powershell
npm run db:setup
npm run dev
```
Frontend: http://localhost:5173. API: http://localhost:3000.

## Docker alternative (same database connection)

With Docker Desktop running, use `npm run db:up` instead of `npm run db:local`. Compose runs PostgreSQL 17 with a health check and a named volume. Stop the local instance before using Docker: both use port 5433.

`npm run db:down` stops the container without deleting its volume. `npm run db:local:stop` stops the native cluster. These are separate stores: switching between them does not transfer records automatically.

The example credentials are for this loopback-only development setup. For another PostgreSQL server, configure DATABASE_URL in apps/backend/.env.

## Database and architecture

Component → useLeaderboard → frontend service → API repository → Express route → validation/controller → Prisma service → PostgreSQL.

Game and Player each have many Scores. Score stores gameId and playerId, with one score per player/game. Rankings are calculated. Loading, pending writes, validation, duplicate conflicts and failures remain visible in the existing UI.

`npm run db:setup` generates the client, applies committed PostgreSQL migrations and seeds only an empty catalogue. Explicit seed/import IDs reset PostgreSQL sequences so later inserts receive unused IDs. `npm run db:migrate -- --name description` creates future migrations; `npm run db:studio` opens Prisma Studio.

The previous SQLite database is left untouched. Its migrations are archived under apps/backend/prisma/legacy-sqlite-migrations and are not applied to PostgreSQL. An existing JSON export can be transferred to an empty migrated database with:
```powershell
npm exec -w @esports/backend -- tsx prisma/importSqlite.ts "path/to/export.json"
```
Import before db:setup seeds an empty database; use prisma generate and prisma migrate deploy first. Imports are transactional and refuse to overwrite existing records.

## Checks
```powershell
npm run build
npm run lint
npm test
```
Run database setup and keep PostgreSQL running before testing. API tests create unique records and clean them up; they check CRUD, validation, conflicts and persistence using another connection and an API restart. Manually add/edit a score, refresh, then delete and refresh again.

Dashboard streams and Profile personal stats now use the same PostgreSQL database as Leaderboard. Admin manages the shared catalogue and streams; foreign keys prevent deleting referenced games. Profile uses a fixed demo-rudra profile key, not authentication. Its personal highest score is independent of a competitive Leaderboard score. Favourites remain session data. Demo login is not authentication.

Reference: instructor's [front-and-backend branch](https://github.com/ScottWachal/Monster-React-Prisma/tree/front-and-backend), which uses PostgreSQL and Docker Compose. This project retains Prisma 6 rather than requiring a Prisma 7 upgrade.
