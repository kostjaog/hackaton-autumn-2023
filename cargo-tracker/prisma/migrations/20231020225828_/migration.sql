/*
  Warnings:

  - The `status` column on the `forklift` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "forklift_status" AS ENUM ('WAITING_ORDER', 'PROCESSING_ORDER', 'ENDING_ORDER');

-- AlterTable
ALTER TABLE "forklift" DROP COLUMN "status",
ADD COLUMN     "status" "forklift_status" NOT NULL DEFAULT 'WAITING_ORDER';

-- DropEnum
DROP TYPE "loader_status";
