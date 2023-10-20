import { Injectable } from '@nestjs/common';
import { CreateForkliftDto } from './dto/create-forklift.dto';
import { UpdateForkliftDto } from './dto/update-forklift.dto';

@Injectable()
export class ForkliftsService {
  create(createForkliftDto: CreateForkliftDto) {
    return 'This action adds a new forklift';
  }

  findAll() {
    return `This action returns all forklifts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forklift`;
  }

  update(id: number, updateForkliftDto: UpdateForkliftDto) {
    return `This action updates a #${id} forklift`;
  }

  remove(id: number) {
    return `This action removes a #${id} forklift`;
  }
}
