import { ForkliftsService } from './forklifts.service';
import { CreateForkliftDto } from './dto/create-forklift.dto';
import { UpdateForkliftDto } from './dto/update-forklift.dto';
export declare class ForkliftsController {
    private readonly forkliftsService;
    constructor(forkliftsService: ForkliftsService);
    create(createForkliftDto: CreateForkliftDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateForkliftDto: UpdateForkliftDto): string;
    remove(id: string): string;
}
