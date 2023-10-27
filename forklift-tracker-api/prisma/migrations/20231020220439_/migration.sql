/*
  Warnings:

  - The primary key for the `forklift` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "forklift" DROP CONSTRAINT "forklift_pkey",
ADD CONSTRAINT "forklift_pkey" PRIMARY KEY ("name", "warehouse_id");
