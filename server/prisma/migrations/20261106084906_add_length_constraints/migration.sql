/*
  Warnings:

  - You are about to alter the column `username` on the `Entry` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `location` on the `Entry` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `message` on the `Entry` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(185)`.

*/
-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "username" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "location" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "message" SET DATA TYPE VARCHAR(185);
