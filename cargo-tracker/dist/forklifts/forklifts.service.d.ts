import { CreateForkliftDto } from './dto/create-forklift.dto';
import { UpdateForkliftDto } from './dto/update-forklift.dto';
export declare class ForkliftsService {
    create(createForkliftDto: CreateForkliftDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateForkliftDto: UpdateForkliftDto): string;
    remove(id: number): string;
}
