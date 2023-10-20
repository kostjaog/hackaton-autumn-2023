import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createOrderDto: CreateOrderDto): Promise<order> {
    try {
      return this.prismaService.order.create({
        data: createOrderDto,
      });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  findAll(): Promise<order[]> {
    try {
      return this.prismaService.order.findMany();
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async findOne(id: string): Promise<order> {
    try {
      const candidate = await this.prismaService.order.findUnique({
        where: {
          id,
        },
      });

      if (!candidate) {
        throw new HttpException(
          'Order with provided id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return candidate;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async remove(id: string): Promise<order> {
    try {
      const candidate = await this.prismaService.order.findUnique({
        where: {
          id,
        },
      });

      if (!candidate) {
        throw new HttpException(
          'Order with provided id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return this.prismaService.order.delete({
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
