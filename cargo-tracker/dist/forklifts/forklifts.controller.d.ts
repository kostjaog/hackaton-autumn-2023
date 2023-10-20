import { ForkliftsService } from './forklifts.service';
import { CreateForkliftDto } from './dto/create-forklift.dto';
export declare class ForkliftsController {
    private readonly forkliftsService;
    constructor(forkliftsService: ForkliftsService);
    create(createForkliftDto: CreateForkliftDto): Promise<{
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
}
