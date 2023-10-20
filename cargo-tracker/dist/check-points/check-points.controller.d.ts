import { CheckPointsService } from './check-points.service';
import { CreateCheckPointDto } from './dto/create-check-point.dto';
import { UpdateCheckPointDto } from './dto/update-check-point.dto';
export declare class CheckPointsController {
    private readonly checkPointsService;
    constructor(checkPointsService: CheckPointsService);
    create(createCheckPointDto: CreateCheckPointDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCheckPointDto: UpdateCheckPointDto): string;
    remove(id: string): string;
}
