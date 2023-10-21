import { WarehousesService } from './warehouses.service';
export declare class WarehousesController {
    private readonly warehousesService;
    constructor(warehousesService: WarehousesService);
    create(createWarehouseDto: any): Promise<{
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__warehouseClient<({
        loaders: ({
            orders: ({
                path: {
                    id: string;
                    target_name: string;
                };
                check_points_time: {
                    id: string;
                    point_name: string;
                    time: Date;
                    order_id: string;
                }[];
            } & {
                id: string;
                status: import(".prisma/client").$Enums.order_status;
                created_at: Date;
                ended_at: Date | null;
                forklift_name: string;
                warehouse_id: string;
                path_id: string;
            })[];
        } & {
            id: string;
            name: string;
            warehouse_id: string;
            status: import(".prisma/client").$Enums.forklift_status;
            last_tm_date: Date | null;
            next_tm_date: Date | null;
            average_speed: number | null;
        })[];
    } & {
        id: string;
        name: string;
        coordX: string | null;
        coordY: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        coordX: string | null;
        coordY: string | null;
    }>;
}
