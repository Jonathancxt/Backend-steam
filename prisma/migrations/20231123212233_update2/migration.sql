/*
  Warnings:

  - You are about to drop the `UserPrefence` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userPreferenceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserPrefence" DROP CONSTRAINT "UserPrefence_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userPreferenceId" INTEGER;

-- DropTable
DROP TABLE "UserPrefence";

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" SERIAL NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userPreferenceId_key" ON "User"("userPreferenceId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPreferenceId_fkey" FOREIGN KEY ("userPreferenceId") REFERENCES "UserPreference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
