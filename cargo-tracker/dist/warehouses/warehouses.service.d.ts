import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { warehouse } from '@prisma/client';
export declare class WarehousesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createWarehouseDto: CreateWarehouseDto): Promise<warehouse>;
    findAll(): Promise<warehouse[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__warehouseClient<{
        id: string;
        name: string;
        coordX: string | null;
        coordY: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Promise<warehouse>;
}
