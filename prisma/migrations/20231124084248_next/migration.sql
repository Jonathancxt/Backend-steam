/*
  Warnings:

  - You are about to drop the column `averateRating` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Review` table. All the data in the column will be lost.
  - Added the required column `content` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "averageRating" SET DEFAULT 0,
ALTER COLUMN "averageRating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "averateRating",
DROP COLUMN "description",
ADD COLUMN     "averageRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "content" TEXT NOT NULL;
