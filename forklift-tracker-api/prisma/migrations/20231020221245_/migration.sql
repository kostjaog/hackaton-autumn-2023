/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `forklift` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `forklift` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "forklift" ADD COLUMN     "id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "forklift_id_key" ON "forklift"("id");
