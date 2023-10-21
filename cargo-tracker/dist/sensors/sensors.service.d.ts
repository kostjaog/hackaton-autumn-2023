import { CreateSensorDto } from './dto/create-sensor.dto';
import { sensor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SensorsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createSensorDto: CreateSensorDto): Promise<sensor>;
    findAll(): Promise<sensor[]>;
    getStatistics(name: string, warehouse_id: string): Promise<void>;
}
