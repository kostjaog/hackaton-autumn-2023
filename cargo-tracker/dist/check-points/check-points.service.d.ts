import { CreateCheckPointDto } from './dto/create-check-point.dto';
import { UpdateCheckPointDto } from './dto/update-check-point.dto';
export declare class CheckPointsService {
    create(createCheckPointDto: CreateCheckPointDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCheckPointDto: UpdateCheckPointDto): string;
    remove(id: number): string;
}
