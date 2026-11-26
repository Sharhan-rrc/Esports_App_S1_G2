-- CreateTable
CREATE TABLE "Stream" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "platform" TEXT NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalStat" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "profileKey" TEXT NOT NULL,
    "hoursPlayed" DOUBLE PRECISION NOT NULL,
    "highestScore" DOUBLE PRECISION NOT NULL,
    "rank" TEXT NOT NULL,

    CONSTRAINT "PersonalStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalStat_profileKey_gameId_key" ON "PersonalStat"("profileKey", "gameId");

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalStat" ADD CONSTRAINT "PersonalStat_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

CREATE UNIQUE INDEX "Stream_game_title_platform_key" ON "Stream" ("gameId", lower("title"), "platform");
INSERT INTO "Stream" ("gameId", "title", "platform") SELECT 1, 'Valorant Finals', 'YouTube' WHERE EXISTS (SELECT 1 FROM "Game" WHERE id = 1);
INSERT INTO "Stream" ("gameId", "title", "platform") SELECT 2, 'LoL Championship', 'Twitch' WHERE EXISTS (SELECT 1 FROM "Game" WHERE id = 2);
INSERT INTO "Stream" ("gameId", "title", "platform") SELECT 3, 'CS:GO Major', 'YouTube' WHERE EXISTS (SELECT 1 FROM "Game" WHERE id = 3);
INSERT INTO "Stream" ("gameId", "title", "platform") SELECT 4, 'Dota 2 Playoffs', 'Twitch' WHERE EXISTS (SELECT 1 FROM "Game" WHERE id = 4);
INSERT INTO "Stream" ("gameId", "title", "platform") SELECT 5, 'Fortnite Arena', 'YouTube' WHERE EXISTS (SELECT 1 FROM "Game" WHERE id = 5);
INSERT INTO "Stream" ("gameId", "title", "platform") SELECT 6, 'Apex Invitational', 'Twitch' WHERE EXISTS (SELECT 1 FROM "Game" WHERE id = 6);
INSERT INTO "Stream" ("gameId", "title", "platform") SELECT 7, 'Rocket League Championship', 'YouTube' WHERE EXISTS (SELECT 1 FROM "Game" WHERE id = 7);
INSERT INTO "Stream" ("gameId", "title", "platform") SELECT 8, 'Overwatch Team Finals', 'Twitch' WHERE EXISTS (SELECT 1 FROM "Game" WHERE id = 8);
INSERT INTO "Stream" ("gameId", "title", "platform") SELECT 9, 'PUBG Global Match', 'YouTube' WHERE EXISTS (SELECT 1 FROM "Game" WHERE id = 9);
INSERT INTO "Stream" ("gameId", "title", "platform") SELECT 10, 'Siege Playoffs', 'Twitch' WHERE EXISTS (SELECT 1 FROM "Game" WHERE id = 10);
INSERT INTO "PersonalStat" ("gameId", "profileKey", "hoursPlayed", "highestScore", "rank") SELECT id, 'demo-rudra', 120, 32, 'Gold' FROM "Game" WHERE name = 'Valorant';
INSERT INTO "PersonalStat" ("gameId", "profileKey", "hoursPlayed", "highestScore", "rank") SELECT id, 'demo-rudra', 200, 18, 'Platinum' FROM "Game" WHERE name = 'League of Legends';
INSERT INTO "PersonalStat" ("gameId", "profileKey", "hoursPlayed", "highestScore", "rank") SELECT id, 'demo-rudra', 90, 27, 'Silver' FROM "Game" WHERE name = 'CS:GO';
INSERT INTO "PersonalStat" ("gameId", "profileKey", "hoursPlayed", "highestScore", "rank") SELECT id, 'demo-rudra', 40, 12, 'Unranked' FROM "Game" WHERE name = 'Dota 2';
INSERT INTO "PersonalStat" ("gameId", "profileKey", "hoursPlayed", "highestScore", "rank") SELECT id, 'demo-rudra', 50, 15, 'Unranked' FROM "Game" WHERE name = 'Fortnite';
INSERT INTO "PersonalStat" ("gameId", "profileKey", "hoursPlayed", "highestScore", "rank") SELECT id, 'demo-rudra', 60, 18, 'Unranked' FROM "Game" WHERE name = 'Apex Legends';
INSERT INTO "PersonalStat" ("gameId", "profileKey", "hoursPlayed", "highestScore", "rank") SELECT id, 'demo-rudra', 70, 21, 'Unranked' FROM "Game" WHERE name = 'Rocket League';
INSERT INTO "PersonalStat" ("gameId", "profileKey", "hoursPlayed", "highestScore", "rank") SELECT id, 'demo-rudra', 80, 24, 'Unranked' FROM "Game" WHERE name = 'Overwatch 2';
INSERT INTO "PersonalStat" ("gameId", "profileKey", "hoursPlayed", "highestScore", "rank") SELECT id, 'demo-rudra', 90, 27, 'Unranked' FROM "Game" WHERE name = 'PUBG';
INSERT INTO "PersonalStat" ("gameId", "profileKey", "hoursPlayed", "highestScore", "rank") SELECT id, 'demo-rudra', 100, 30, 'Unranked' FROM "Game" WHERE name = 'Rainbow Six Siege';
