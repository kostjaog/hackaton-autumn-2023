import { ForkliftStepsService } from './forklift-steps.service';
import { CreateForkliftStepDto } from './dto/create-forklift-step.dto';
export declare class ForkliftStepsController {
    private readonly forkliftStepsService;
    constructor(forkliftStepsService: ForkliftStepsService);
    create(createForkliftStepDto: CreateForkliftStepDto): Promise<{
        id: string;
        point_name: string;
        time: Date;
        order_id: string;
    }>;
    findAll(): Promise<{
        id: string;
        point_name: string;
        time: Date;
        order_id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        point_name: string;
        time: Date;
        order_id: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        point_name: string;
        time: Date;
        order_id: string;
    }>;
}
