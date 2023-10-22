/*
  Warnings:

  - The primary key for the `forklift` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `name` on the `forklift` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `forklift_name` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_forklift_name_warehouse_id_fkey";

-- AlterTable
ALTER TABLE "forklift" DROP CONSTRAINT "forklift_pkey",
DROP COLUMN "name",
ADD COLUMN     "name" INTEGER NOT NULL,
ADD CONSTRAINT "forklift_pkey" PRIMARY KEY ("name", "warehouse_id");

-- AlterTable
ALTER TABLE "order" DROP COLUMN "forklift_name",
ADD COLUMN     "forklift_name" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_forklift_name_warehouse_id_fkey" FOREIGN KEY ("forklift_name", "warehouse_id") REFERENCES "forklift"("name", "warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;
