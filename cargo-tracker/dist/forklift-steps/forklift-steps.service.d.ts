import { CreateForkliftStepDto } from './dto/create-forklift-step.dto';
import { UpdateForkliftStepDto } from './dto/update-forklift-step.dto';
export declare class ForkliftStepsService {
    create(createForkliftStepDto: CreateForkliftStepDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateForkliftStepDto: UpdateForkliftStepDto): string;
    remove(id: number): string;
}
