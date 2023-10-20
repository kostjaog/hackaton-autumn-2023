import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
export declare class SensorsController {
    private readonly sensorsService;
    constructor(sensorsService: SensorsService);
    create(createSensorDto: CreateSensorDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSensorDto: UpdateSensorDto): string;
    remove(id: string): string;
}
