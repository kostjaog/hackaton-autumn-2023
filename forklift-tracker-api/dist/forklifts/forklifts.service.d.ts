import { CreateForkliftDto } from './dto/create-forklift.dto';
import { forklift } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { forklift_statistics_dto } from './dto/statistics.dto';
export declare class ForkliftsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createForkliftDto: CreateForkliftDto): Promise<forklift>;
    warehouseTransfer(forklift_id: string, warehouse_id: string): Promise<{
        id: string;
        name: number;
        warehouse_id: string;
        status: import(".prisma/client").$Enums.forklift_status;
        last_tm_date: Date | null;
        next_tm_date: Date | null;
        average_speed: number | null;
    }>;
    getStatistics(id: string, start_date: Date, end_date: Date): Promise<forklift_statistics_dto>;
    findAll(): Promise<forklift[]>;
    findOne(id: string): Promise<forklift>;
    remove(id: string): Promise<forklift>;
}
