import { ForkliftStepsService } from './forklift-steps.service';
import { CreateForkliftStepDto } from './dto/create-forklift-step.dto';
import { UpdateForkliftStepDto } from './dto/update-forklift-step.dto';
export declare class ForkliftStepsController {
    private readonly forkliftStepsService;
    constructor(forkliftStepsService: ForkliftStepsService);
    create(createForkliftStepDto: CreateForkliftStepDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateForkliftStepDto: UpdateForkliftStepDto): string;
    remove(id: string): string;
}
