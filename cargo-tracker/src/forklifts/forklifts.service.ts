import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateForkliftDto } from './dto/create-forklift.dto';
import { UpdateForkliftDto } from './dto/update-forklift.dto';
import { forklift, order_status } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ForkliftsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createForkliftDto: CreateForkliftDto): Promise<forklift> {
    try {
      return this.prismaService.forklift.create({ data: createForkliftDto });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  findAll(): Promise<forklift[]> {
    try {
      return this.prismaService.forklift.findMany();
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async findOne(id: string): Promise<forklift> {
    try {
      const candidate = await this.prismaService.forklift.findUnique({
        where: {
          id,
        },
        include: {
          orders: {
            where: {
              status: order_status.PROCESSING || order_status.CREATED,
            },
            include: {
              path: true,
              check_points_time: true,
            },
          },
        },
      });
      if (!candidate) {
        throw new HttpException(
          'Forklift with provided id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return candidate;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async remove(id: string): Promise<forklift> {
    try {
      const candidate = await this.prismaService.forklift.findUnique({
        where: {
          id,
        },
      });
      if (!candidate) {
        throw new HttpException(
          'Forklift with provided id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return this.prismaService.forklift.delete({
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
