import { ForkliftsService } from './forklifts.service';
export declare class ForkliftsController {
    private readonly forkliftsService;
    constructor(forkliftsService: ForkliftsService);
    create(createForkliftDto: any): Promise<{
        id: string;
        name: string;
        warehouse_id: string;
        status: import(".prisma/client").$Enums.forklift_status;
        last_tm_date: Date | null;
        next_tm_date: Date | null;
        average_speed: number | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        warehouse_id: string;
        status: import(".prisma/client").$Enums.forklift_status;
        last_tm_date: Date | null;
        next_tm_date: Date | null;
        average_speed: number | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        warehouse_id: string;
        status: import(".prisma/client").$Enums.forklift_status;
        last_tm_date: Date | null;
        next_tm_date: Date | null;
        average_speed: number | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        warehouse_id: string;
        status: import(".prisma/client").$Enums.forklift_status;
        last_tm_date: Date | null;
        next_tm_date: Date | null;
        average_speed: number | null;
    }>;
    getStatistics(id: string, start_date: Date, end_date: Date): Promise<import("./dto/statistics.dto").forklift_statistics_dto>;
    transferForklift(forklift_id: string, warehouse_id: string): Promise<{
        id: string;
        name: string;
        warehouse_id: string;
        status: import(".prisma/client").$Enums.forklift_status;
        last_tm_date: Date | null;
        next_tm_date: Date | null;
        average_speed: number | null;
    }>;
}
