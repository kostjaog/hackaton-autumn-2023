/*
  Warnings:

  - You are about to drop the column `id` on the `forklift` table. All the data in the column will be lost.
  - You are about to drop the column `forklift_id` on the `order` table. All the data in the column will be lost.
  - Added the required column `forklift_name` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouse_id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_forklift_id_fkey";

-- DropIndex
DROP INDEX "forklift_id_key";

-- AlterTable
ALTER TABLE "forklift" DROP COLUMN "id";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "forklift_id",
ADD COLUMN     "forklift_name" TEXT NOT NULL,
ADD COLUMN     "warehouse_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_forklift_name_warehouse_id_fkey" FOREIGN KEY ("forklift_name", "warehouse_id") REFERENCES "forklift"("name", "warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;
