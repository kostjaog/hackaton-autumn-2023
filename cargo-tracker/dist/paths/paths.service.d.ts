import { CreatePathDto } from './dto/create-path.dto';
import { UpdatePathDto } from './dto/update-path.dto';
export declare class PathsService {
    create(createPathDto: CreatePathDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePathDto: UpdatePathDto): string;
    remove(id: number): string;
}
