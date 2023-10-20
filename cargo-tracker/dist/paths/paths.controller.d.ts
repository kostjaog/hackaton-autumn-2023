import { PathsService } from './paths.service';
import { CreatePathDto } from './dto/create-path.dto';
export declare class PathsController {
    private readonly pathsService;
    constructor(pathsService: PathsService);
    create(createPathDto: CreatePathDto): Promise<{
        id: string;
        target_name: string;
    }>;
    findAll(): Promise<{
        id: string;
        target_name: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        target_name: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        target_name: string;
    }>;
}
