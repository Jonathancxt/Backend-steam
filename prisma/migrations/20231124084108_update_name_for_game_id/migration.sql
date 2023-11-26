/*
  Warnings:

  - You are about to drop the column `gameReviewId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_gameReviewId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "gameReviewId",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
