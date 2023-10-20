import { CreateForkliftStepDto } from './dto/create-forklift-step.dto';
import { forklift_step } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ForkliftStepsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createForkliftStepDto: CreateForkliftStepDto): Promise<forklift_step>;
    findAll(): Promise<forklift_step[]>;
    findOne(id: string): Promise<forklift_step>;
    remove(id: string): Promise<forklift_step>;
}
