import { PartialType } from '@nestjs/mapped-types';
import { CreateForkliftStepDto } from './create-forklift-step.dto';

export class UpdateForkliftStepDto extends PartialType(CreateForkliftStepDto) {}
