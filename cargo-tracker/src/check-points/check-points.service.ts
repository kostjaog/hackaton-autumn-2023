import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCheckPointDto } from './dto/create-check-point.dto';
import { check_point } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CheckPointsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCheckPointDto: CreateCheckPointDto): Promise<check_point> {
    try {
      return this.prismaService.check_point.create({
        data: createCheckPointDto,
      });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  findAll(): Promise<check_point[]> {
    try {
      return this.prismaService.check_point.findMany();
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async findOne(id: string): Promise<check_point> {
    try {
      const candidate = await this.prismaService.check_point.findUnique({
        where: {
          id,
        },
      });
      if (!candidate) {
        throw new HttpException(
          'Check_point with provided id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return candidate;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async remove(id: string): Promise<check_point> {
    try {
      const candidate = await this.prismaService.check_point.findUnique({
        where: {
          id,
        },
      });
      if (!candidate) {
        throw new HttpException(
          'Check_point with provided id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return this.prismaService.check_point.delete({
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
