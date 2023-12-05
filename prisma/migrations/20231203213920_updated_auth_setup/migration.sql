/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pairings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThankYou` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WishList` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateEnum
CREATE TYPE "public"."role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."inviteStatus" AS ENUM ('INVITED', 'DECLINED', 'ACCEPTED');

-- DropForeignKey
ALTER TABLE "public"."Pairings" DROP CONSTRAINT "Pairings_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Pairings" DROP CONSTRAINT "Pairings_personId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Pairings" DROP CONSTRAINT "Pairings_santaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ThankYou" DROP CONSTRAINT "ThankYou_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ThankYou" DROP CONSTRAINT "ThankYou_toUserId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ThankYou" DROP CONSTRAINT "ThankYou_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserStatus" DROP CONSTRAINT "UserStatus_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserStatus" DROP CONSTRAINT "UserStatus_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WishList" DROP CONSTRAINT "WishList_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WishList" DROP CONSTRAINT "WishList_userId_fkey";

-- DropTable
DROP TABLE "public"."Event";

-- DropTable
DROP TABLE "public"."Pairings";

-- DropTable
DROP TABLE "public"."Profile";

-- DropTable
DROP TABLE "public"."ThankYou";

-- DropTable
DROP TABLE "public"."UserStatus";

-- DropTable
DROP TABLE "public"."WishList";

-- DropEnum
DROP TYPE "public"."InviteStatus";

-- DropEnum
DROP TYPE "public"."Role";

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "public"."role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."userStatus" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "status" "public"."inviteStatus" NOT NULL DEFAULT 'INVITED',

    CONSTRAINT "userStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sendReminder" BOOLEAN NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pairings" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT NOT NULL,
    "santaId" UUID NOT NULL,
    "personId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pairings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."thankYou" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "toUserId" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "thankYou_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wishList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL,
    "eventId" TEXT NOT NULL,
    "siteImage" TEXT NOT NULL,
    "siteTitle" TEXT NOT NULL,
    "siteDescription" TEXT NOT NULL,

    CONSTRAINT "wishList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "public"."profiles"("email");

-- AddForeignKey
ALTER TABLE "public"."userStatus" ADD CONSTRAINT "userStatus_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."userStatus" ADD CONSTRAINT "userStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pairings" ADD CONSTRAINT "pairings_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pairings" ADD CONSTRAINT "pairings_santaId_fkey" FOREIGN KEY ("santaId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pairings" ADD CONSTRAINT "pairings_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."thankYou" ADD CONSTRAINT "thankYou_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."thankYou" ADD CONSTRAINT "thankYou_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."thankYou" ADD CONSTRAINT "thankYou_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wishList" ADD CONSTRAINT "wishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wishList" ADD CONSTRAINT "wishList_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
