/*
  Warnings:

  - Added the required column `clerkUserId` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkUserId` to the `materials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "clerkUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "materials" ADD COLUMN     "clerkUserId" TEXT NOT NULL;
