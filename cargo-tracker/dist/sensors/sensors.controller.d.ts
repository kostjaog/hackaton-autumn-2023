import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
export declare class SensorsController {
    private readonly sensorsService;
    constructor(sensorsService: SensorsService);
    create(createSensorDto: CreateSensorDto): Promise<{
        id: string;
        name: string;
        warehouse_id: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        warehouse_id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        warehouse_id: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        warehouse_id: string;
    }>;
}
