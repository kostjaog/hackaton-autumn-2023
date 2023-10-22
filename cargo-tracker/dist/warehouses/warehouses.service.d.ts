import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { warehouse } from '@prisma/client';
export declare class WarehousesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createWarehouseDto: CreateWarehouseDto): Promise<warehouse>;
    findAll(): Promise<warehouse[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__warehouseClient<({
        loaders: ({
            orders: ({
                check_points_time: {
                    id: string;
                    point_name: string;
                    time: Date;
                    order_id: string;
                }[];
                path: {
                    id: string;
                    target_name: string;
                };
            } & {
                id: string;
                status: import(".prisma/client").$Enums.order_status;
                created_at: Date;
                ended_at: Date | null;
                forklift_name: number;
                warehouse_id: string;
                path_id: string;
            })[];
        } & {
            id: string;
            name: number;
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
    remove(id: string): Promise<warehouse>;
}
