import { PartialType } from '@nestjs/mapped-types';
import { CreateForkliftDto } from './create-forklift.dto';

export class UpdateForkliftDto extends PartialType(CreateForkliftDto) {}
