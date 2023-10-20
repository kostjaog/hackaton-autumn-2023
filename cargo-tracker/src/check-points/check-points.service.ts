import { Injectable } from '@nestjs/common';
import { CreateCheckPointDto } from './dto/create-check-point.dto';
import { UpdateCheckPointDto } from './dto/update-check-point.dto';

@Injectable()
export class CheckPointsService {
  create(createCheckPointDto: CreateCheckPointDto) {
    return 'This action adds a new checkPoint';
  }

  findAll() {
    return `This action returns all checkPoints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkPoint`;
  }

  update(id: number, updateCheckPointDto: UpdateCheckPointDto) {
    return `This action updates a #${id} checkPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkPoint`;
  }
}
