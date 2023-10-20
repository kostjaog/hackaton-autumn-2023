import { CreateOrderDto } from './dto/create-order.dto';
import { order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class OrdersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<order>;
    findAll(): Promise<order[]>;
    findOne(id: string): Promise<order>;
    remove(id: string): Promise<order>;
}
