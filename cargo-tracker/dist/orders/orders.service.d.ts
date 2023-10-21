import { CreateOrderDto } from './dto/create-order.dto';
import { ConsumeMessage } from 'amqplib';
import { order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { rmq_order_dto } from './dto/rmq-order.dto';
export declare class OrdersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<order>;
    findAll(): Promise<order[]>;
    findOne(id: string): Promise<order>;
    remove(id: string): Promise<order>;
    loadOrderDataFromRMQ(msg: rmq_order_dto, amqpMsg: ConsumeMessage): Promise<void>;
}
