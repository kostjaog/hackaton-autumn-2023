import { CreateCheckPointDto } from './dto/create-check-point.dto';
import { check_point } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CheckPointsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createCheckPointDto: CreateCheckPointDto): Promise<check_point>;
    findAll(): Promise<check_point[]>;
    findOne(id: string): Promise<check_point>;
    remove(id: string): Promise<check_point>;
}
