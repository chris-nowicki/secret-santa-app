/*
  Warnings:

  - The primary key for the `event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `pairings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `id` on the `event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventId` on the `thankYou` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventId` on the `userStatus` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventId` on the `wishList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."pairings" DROP CONSTRAINT "pairings_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."pairings" DROP CONSTRAINT "pairings_personId_fkey";

-- DropForeignKey
ALTER TABLE "public"."pairings" DROP CONSTRAINT "pairings_santaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."thankYou" DROP CONSTRAINT "thankYou_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."thankYou" DROP CONSTRAINT "thankYou_toUserId_fkey";

-- DropForeignKey
ALTER TABLE "public"."thankYou" DROP CONSTRAINT "thankYou_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."userStatus" DROP CONSTRAINT "userStatus_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."userStatus" DROP CONSTRAINT "userStatus_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."wishList" DROP CONSTRAINT "wishList_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."wishList" DROP CONSTRAINT "wishList_userId_fkey";

-- AlterTable
ALTER TABLE "public"."event" DROP CONSTRAINT "event_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "event_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."thankYou" DROP COLUMN "eventId",
ADD COLUMN     "eventId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."userStatus" DROP COLUMN "eventId",
ADD COLUMN     "eventId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."wishList" DROP COLUMN "eventId",
ADD COLUMN     "eventId" UUID NOT NULL;

-- DropTable
DROP TABLE "public"."pairings";

-- DropTable
DROP TABLE "public"."profiles";

-- CreateTable
CREATE TABLE "public"."profile" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "public"."role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pairing" (
    "id" SERIAL NOT NULL,
    "eventId" UUID NOT NULL,
    "santaId" UUID NOT NULL,
    "personId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pairing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_email_key" ON "public"."profile"("email");

-- AddForeignKey
ALTER TABLE "public"."userStatus" ADD CONSTRAINT "userStatus_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."userStatus" ADD CONSTRAINT "userStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pairing" ADD CONSTRAINT "pairing_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pairing" ADD CONSTRAINT "pairing_santaId_fkey" FOREIGN KEY ("santaId") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pairing" ADD CONSTRAINT "pairing_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."thankYou" ADD CONSTRAINT "thankYou_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."thankYou" ADD CONSTRAINT "thankYou_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."thankYou" ADD CONSTRAINT "thankYou_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wishList" ADD CONSTRAINT "wishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wishList" ADD CONSTRAINT "wishList_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
