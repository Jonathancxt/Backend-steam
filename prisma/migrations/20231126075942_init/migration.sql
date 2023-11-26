/*
  Warnings:

  - You are about to drop the column `image` on the `Game` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `developer` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsive_reviewdesc` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "image",
ADD COLUMN     "developer" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "releaseDate" TEXT NOT NULL,
ADD COLUMN     "responsive_reviewdesc" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "gameTitle" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Game_title_key" ON "Game"("title");
