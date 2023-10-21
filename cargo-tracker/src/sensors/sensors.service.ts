import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { sensor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { sensor_statistics_dto } from './dto/sensor-statistics.dto';

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

  // async findOne(id: string): Promise<sensor> {
  //   try {
  //     const candidate = await this.prismaService.sensor.findUnique({
  //       where: {
  //         id,
  //       },
  //     });
  //     if (!candidate) {
  //       throw new HttpException(
  //         'Sensor with provided id does not exist',
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }
  //     return candidate;
  //   } catch (err) {
  //     console.error(err.message);
  //     throw err;
  //   }
  // }

  async getStatistics(name: string, warehouse_id: string) {
    try {
      const candidate = await this.prismaService.sensor.findUnique({
        where: {
          name_warehouse_id: {
            warehouse_id,
            name,
          },
        },
        include: {
          warehouse: {
            include: {
              loaders: {
                include: {
                  orders: {
                    include: {
                      check_points_time: {
                        where: {
                          point_name: name,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      const statistics: sensor_statistics_dto = {
        step_through_count: 0,
        forklift_steps_count: [],
      };

      candidate?.warehouse.loaders.map((loader) => {
        const forkStat = statistics.forklift_steps_count.filter(
          (fork) => fork.forklift_name === loader.name,
        );
        if (forkStat.length === 0) {
          statistics.forklift_steps_count.push({
            forklift_name: loader.name,
            step_through_count: 0,
          });
        }
        loader.orders.map((order) => {
          order.check_points_time.map((checkPoint) => {
            statistics.forklift_steps_count.map((forkStep) => {
              if (name === checkPoint.point_name) {
                forkStep.step_through_count += 1;
              }
            });
          });
          statistics.step_through_count += order.check_points_time.length;
        });
      });

      return statistics;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  // async remove(id: string): Promise<sensor> {
  //   try {
  //     const candidate = await this.prismaService.sensor.findUnique({
  //       where: {
  //         id,
  //       },
  //     });

  //     if (!candidate) {
  //       throw new HttpException(
  //         'Sensor with provided id does not exist',
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }

  //     return this.prismaService.sensor.delete({
  //       where: {
  //         id,
  //       },
  //     });
  //   } catch (err) {
  //     console.error(err.message);
  //     throw err;
  //   }
  // }
}
