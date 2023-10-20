import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { sensor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SensorsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createSensorDto: CreateSensorDto): Promise<sensor> {
    try {
      return this.prismaService.sensor.create({
        data: createSensorDto,
      });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  findAll(): Promise<sensor[]> {
    try {
      return this.prismaService.sensor.findMany();
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async findOne(id: string): Promise<sensor> {
    try {
      const candidate = await this.prismaService.sensor.findUnique({
        where: {
          id,
        },
      });
      if (!candidate) {
        throw new HttpException(
          'Sensor with provided id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return candidate;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async remove(id: string): Promise<sensor> {
    try {
      const candidate = await this.prismaService.sensor.findUnique({
        where: {
          id,
        },
      });

      if (!candidate) {
        throw new HttpException(
          'Sensor with provided id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }

      return this.prismaService.sensor.delete({
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
