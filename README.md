# Esports App

## Local setup

Use Node 22 or newer. From the repository root:

```powershell
npm install
Copy-Item apps/backend/.env.example apps/backend/.env
Copy-Item apps/frontend/.env.example apps/frontend/.env
npm run db:setup
npm run dev
```

Frontend: http://localhost:5173. API: http://localhost:3000.
If either environment file already exists, keep its values rather than overwriting it.
`npm run dev:frontend` and `npm run dev:backend` run the apps separately.

## Sprint 4 Leaderboard

Scores follow component → useLeaderboard → frontend service → API repository → Express route → validation → controller → Prisma service → SQLite.
Games and players have their own tables; Score references their IDs. Case-normalized player keys prevent duplicate player/game scores. Rank is calculated rather than stored. Existing theme and score validation are retained. Loading, pending writes and failures are shown in the UI; failed submissions keep form values.

SQLite is the local SQL development database. Each developer has their own ignored database file. Apply committed migrations with `npm run db:setup`; create new migrations with `npm run db:migrate -- --name description`. Seed data is only added to an empty catalogue. Starting the API does not reseed it.

The demo Login does not authenticate users. CORS allows configured frontend origins; originless API tools are allowed for testing. This is a local development setup. A PostgreSQL/cloud deployment requires provider-specific migrations and deployment configuration.

## Sprint 4 Dashboard

Dashboard and Administration share the same stream list. Use Dashboard or Administration to add, edit, or delete a stream. The stream API stores changes in SQLite and rejects duplicate titles for the same game and platform. Reload the page to verify that saved streams are still present. Profile stats and favourites retain their Sprint 3 behavior.

## Checks

```powershell
npm run build
npm run lint
npm test
```

Run database setup before tests. API tests create uniquely named test records and clean them up. They cover persistent CRUD, another Prisma connection, API restart, invalid requests, duplicate conflicts and CORS. Frontend tests cover failed requests and confirmed-cache updates.

Windows environments that block workspace symlinks may need dependencies installed separately with `npm install --prefix apps/frontend --workspaces=false` and `npm install --prefix apps/backend --workspaces=false`. Standard root installation remains the normal workflow.

Dependency audit currently reports advisories in the inherited frontend/tooling tree and Prisma CLI dependencies. Review and patch these before a production deployment; do not apply untested major-version upgrades with audit --force.
