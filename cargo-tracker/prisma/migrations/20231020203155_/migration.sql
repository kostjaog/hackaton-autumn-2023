/*
  Warnings:

  - Added the required column `forklift_id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "forklift_id" TEXT NOT NULL,
ALTER COLUMN "ended_at" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_forklift_id_fkey" FOREIGN KEY ("forklift_id") REFERENCES "forklift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
