import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.order_status;
        created_at: Date;
        ended_at: Date | null;
        forklift_name: number;
        warehouse_id: string;
        path_id: string;
    }>;
    findAll(): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.order_status;
        created_at: Date;
        ended_at: Date | null;
        forklift_name: number;
        warehouse_id: string;
        path_id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.order_status;
        created_at: Date;
        ended_at: Date | null;
        forklift_name: number;
        warehouse_id: string;
        path_id: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.order_status;
        created_at: Date;
        ended_at: Date | null;
        forklift_name: number;
        warehouse_id: string;
        path_id: string;
    }>;
}
