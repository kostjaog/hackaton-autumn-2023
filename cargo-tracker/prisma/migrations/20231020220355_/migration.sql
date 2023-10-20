-- CreateEnum
CREATE TYPE "loader_status" AS ENUM ('WAITING_ORDER', 'PROCESSING_ORDER', 'ENDING_ORDER');

-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('CREATED', 'PROCESSING', 'DONE');

-- CreateTable
CREATE TABLE "warehouse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coordX" TEXT,
    "coordY" TEXT,

    CONSTRAINT "warehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "status" "order_status" NOT NULL DEFAULT 'CREATED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),
    "forklift_id" TEXT NOT NULL,
    "path_id" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forklift_step" (
    "id" TEXT NOT NULL,
    "point_name" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "forklift_step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forklift" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "warehouse_id" TEXT NOT NULL,
    "status" "loader_status" NOT NULL DEFAULT 'WAITING_ORDER',
    "last_tm_date" TIMESTAMP(3),
    "next_tm_date" TIMESTAMP(3),
    "average_speed" INTEGER,

    CONSTRAINT "forklift_pkey" PRIMARY KEY ("id","warehouse_id")
);

-- CreateTable
CREATE TABLE "path" (
    "id" TEXT NOT NULL,
    "target_name" TEXT NOT NULL,

    CONSTRAINT "path_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_point" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "next_check_point_distance" INTEGER NOT NULL,
    "path_id" TEXT NOT NULL,

    CONSTRAINT "check_point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "warehouse_id" TEXT NOT NULL,

    CONSTRAINT "sensor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "warehouse_name_key" ON "warehouse"("name");

-- CreateIndex
CREATE UNIQUE INDEX "forklift_id_key" ON "forklift"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sensor_name_key" ON "sensor"("name");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_forklift_id_fkey" FOREIGN KEY ("forklift_id") REFERENCES "forklift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_path_id_fkey" FOREIGN KEY ("path_id") REFERENCES "path"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forklift_step" ADD CONSTRAINT "forklift_step_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forklift" ADD CONSTRAINT "forklift_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_point" ADD CONSTRAINT "check_point_path_id_fkey" FOREIGN KEY ("path_id") REFERENCES "path"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor" ADD CONSTRAINT "sensor_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
