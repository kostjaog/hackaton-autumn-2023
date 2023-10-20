import { CreateForkliftDto } from './dto/create-forklift.dto';
import { forklift } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ForkliftsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createForkliftDto: CreateForkliftDto): Promise<forklift>;
    findAll(): Promise<forklift[]>;
    findOne(id: string): Promise<forklift>;
    remove(id: string): Promise<forklift>;
}
