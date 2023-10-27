/*
  Warnings:

  - A unique constraint covering the columns `[target_name]` on the table `path` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "path_target_name_key" ON "path"("target_name");
