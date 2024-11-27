/*
  Warnings:

  - Added the required column `address` to the `Personal_Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Personal_Data" ADD COLUMN     "address" VARCHAR(200) NOT NULL;

-- DropEnum
DROP TYPE "Gender";
