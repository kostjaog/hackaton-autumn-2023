import { PathsService } from './paths.service';
import { CreatePathDto } from './dto/create-path.dto';
import { UpdatePathDto } from './dto/update-path.dto';
export declare class PathsController {
    private readonly pathsService;
    constructor(pathsService: PathsService);
    create(createPathDto: CreatePathDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePathDto: UpdatePathDto): string;
    remove(id: string): string;
}
