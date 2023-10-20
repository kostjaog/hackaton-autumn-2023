import { CheckPointsService } from './check-points.service';
import { CreateCheckPointDto } from './dto/create-check-point.dto';
export declare class CheckPointsController {
    private readonly checkPointsService;
    constructor(checkPointsService: CheckPointsService);
    create(createCheckPointDto: CreateCheckPointDto): Promise<{
        id: string;
        name: string;
        next_check_point_distance: number;
        path_id: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        next_check_point_distance: number;
        path_id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        next_check_point_distance: number;
        path_id: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        next_check_point_distance: number;
        path_id: string;
    }>;
}
