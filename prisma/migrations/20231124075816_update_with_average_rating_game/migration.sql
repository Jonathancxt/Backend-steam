/*
  Warnings:

  - You are about to alter the column `averageRating` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "averageRating" SET DEFAULT 0,
ALTER COLUMN "averageRating" SET DATA TYPE INTEGER;
