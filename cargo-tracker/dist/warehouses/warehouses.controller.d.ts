import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
export declare class WarehousesController {
    private readonly warehousesService;
    constructor(warehousesService: WarehousesService);
    create(createWarehouseDto: CreateWarehouseDto): Promise<{
        id: string;
        name: string;
        coordX: string | null;
        coordY: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        coordX: string | null;
        coordY: string | null;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__warehouseClient<{
        id: string;
        name: string;
        coordX: string | null;
        coordY: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        coordX: string | null;
        coordY: string | null;
    }>;
}
