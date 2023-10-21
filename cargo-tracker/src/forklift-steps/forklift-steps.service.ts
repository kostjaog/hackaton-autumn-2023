import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateForkliftStepDto } from './dto/create-forklift-step.dto';
import { forklift_step } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ForkliftStepsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createForkliftStepDto: CreateForkliftStepDto): Promise<forklift_step> {
    try {
      return this.prismaService.forklift_step.create({
        data: createForkliftStepDto,
      });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  findAll(): Promise<forklift_step[]> {
    try {
      return this.prismaService.forklift_step.findMany();
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async findOne(id: string): Promise<forklift_step> {
    try {
      const candidate = await this.prismaService.forklift_step.findUnique({
        where: {
          id,
        },
      });
      if (!candidate) {
        throw new HttpException(
          'Forklift_step with provided id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }

      return candidate;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async remove(id: string): Promise<forklift_step> {
    try {
      const candidate = await this.prismaService.forklift_step.findUnique({
        where: {
          id,
        },
      });
      if (!candidate) {
        throw new HttpException(
          'Forklift_step with provided id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return this.prismaService.forklift_step.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }
}
