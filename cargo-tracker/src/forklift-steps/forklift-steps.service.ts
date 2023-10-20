import { Injectable } from '@nestjs/common';
import { CreateForkliftStepDto } from './dto/create-forklift-step.dto';
import { UpdateForkliftStepDto } from './dto/update-forklift-step.dto';

@Injectable()
export class ForkliftStepsService {
  create(createForkliftStepDto: CreateForkliftStepDto) {
    return 'This action adds a new forkliftStep';
  }

  findAll() {
    return `This action returns all forkliftSteps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forkliftStep`;
  }

  update(id: number, updateForkliftStepDto: UpdateForkliftStepDto) {
    return `This action updates a #${id} forkliftStep`;
  }

  remove(id: number) {
    return `This action removes a #${id} forkliftStep`;
  }
}
