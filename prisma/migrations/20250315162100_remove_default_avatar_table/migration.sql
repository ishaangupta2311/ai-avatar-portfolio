/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `DefaultAvatar` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Avatar" ALTER COLUMN "fileName" SET DEFAULT 'Man.glb';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio";

-- DropTable
DROP TABLE "DefaultAvatar";
