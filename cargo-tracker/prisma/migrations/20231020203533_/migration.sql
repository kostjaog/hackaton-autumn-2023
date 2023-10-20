-- AlterTable
ALTER TABLE "forklift" ALTER COLUMN "last_tm_date" DROP NOT NULL,
ALTER COLUMN "next_tm_date" DROP NOT NULL,
ALTER COLUMN "average_speed" DROP NOT NULL;
