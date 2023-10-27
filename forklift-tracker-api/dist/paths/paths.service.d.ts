import { path } from '@prisma/client';
import { CreatePathDto } from './dto/create-path.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PathsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createPathDto: CreatePathDto): Promise<path>;
    findAll(): Promise<path[]>;
    findOne(id: string): Promise<{
        id: string;
        target_name: string;
    }>;
    remove(id: string): Promise<path>;
}
