/*
  Warnings:

  - You are about to drop the column `coloerHex` on the `Resume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "coloerHex",
ADD COLUMN     "colorHex" TEXT NOT NULL DEFAULT '#000000';
