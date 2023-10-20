/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `sensor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `average_speed` to the `forklift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forklift" ADD COLUMN     "average_speed" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sensor_name_key" ON "sensor"("name");
