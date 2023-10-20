import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { warehouse } from '@prisma/client';

@Injectable()
export class WarehousesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createWarehouseDto: CreateWarehouseDto): Promise<warehouse> {
    try {
      return this.prismaService.warehouse.create({
        data: {
          coordX: createWarehouseDto.coordX,
          coordY: createWarehouseDto.coordY,
          name: createWarehouseDto.name,
        },
      });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  findAll(): Promise<warehouse[]> {
    try {
      return this.prismaService.warehouse.findMany();
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.warehouse.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async remove(id: string): Promise<warehouse> {
    try {
      const candidate = await this.prismaService.warehouse.findUnique({
        where: {
          id,
        },
      });
      if (!candidate) {
        throw new HttpException(
          'Waregouse with provided ID does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return this.prismaService.warehouse.delete({
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
