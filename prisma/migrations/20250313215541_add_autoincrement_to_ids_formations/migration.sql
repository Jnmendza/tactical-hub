-- AlterTable
CREATE SEQUENCE league_id_seq;
ALTER TABLE "League" ALTER COLUMN "id" SET DEFAULT nextval('league_id_seq');
ALTER SEQUENCE league_id_seq OWNED BY "League"."id";

-- AlterTable
CREATE SEQUENCE team_id_seq;
ALTER TABLE "Team" ALTER COLUMN "id" SET DEFAULT nextval('team_id_seq');
ALTER SEQUENCE team_id_seq OWNED BY "Team"."id";

-- AlterTable
CREATE SEQUENCE venue_id_seq;
ALTER TABLE "Venue" ALTER COLUMN "id" SET DEFAULT nextval('venue_id_seq');
ALTER SEQUENCE venue_id_seq OWNED BY "Venue"."id";

-- CreateTable
CREATE TABLE "Formation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Formation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "formationId" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Formation" ADD CONSTRAINT "Formation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "Formation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
