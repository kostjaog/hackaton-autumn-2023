/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateForkliftDto } from './dto/create-forklift.dto';
import { forklift, order_status } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { forklift_statistics_dto } from './dto/statistics.dto';

@Injectable()
export class ForkliftsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createForkliftDto: CreateForkliftDto): Promise<forklift> {
    try {
      return this.prismaService.forklift.create({
        data: {
          name: Number(createForkliftDto.name),
          last_tm_date: new Date(createForkliftDto.last_tm_date),
          next_tm_date: new Date(
            new Date().setDate(
              new Date(createForkliftDto.last_tm_date).getDate() + 181,
            ),
          ),
          warehouse: {
            connect: {
              name: createForkliftDto.warehouse_name,
            },
          },
        },
      });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async warehouseTransfer(forklift_id: string, warehouse_id: string) {
    try {
      const forkliftCandidate = await this.prismaService.forklift.findUnique({
        where: {
          id: forklift_id,
        },
      });
      const warehouseCandidate = await this.prismaService.warehouse.findUnique({
        where: {
          id: warehouse_id,
        },
      });

      if (!forkliftCandidate || !warehouseCandidate) {
        throw new HttpException(
          'One of two entities with provided data does not exist',
          HttpStatus.NOT_FOUND,
        );
      }

      const orders = await this.prismaService.order.findMany({
        where: {
          warehouse_id,
          forklift_name: forkliftCandidate.name,
          status: {
            not: order_status.DONE,
          },
        },
      });
      // cleaning up unprocessed orders before transfer
      orders.map(async (order) => {
        await this.prismaService.order.update({
          where: {
            id: order.id,
          },
          data: {
            status: order_status.DONE,
          },
        });
      });

      return this.prismaService.forklift.update({
        where: {
          id: forklift_id,
        },
        data: {
          warehouse: {
            connect: {
              id: warehouse_id,
            },
          },
        },
      });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async getStatistics(id: string, start_date: Date, end_date: Date) {
    try {
      const candidate = await this.prismaService.forklift.findUnique({
        where: {
          id,
        },
        include: {
          orders: {
            orderBy: {
              ended_at: 'desc',
            },
            where: {
              created_at: {
                gte: start_date,
                lte: end_date,
              },
              status: order_status.DONE,
            },
            include: {
              check_points_time: {
                orderBy: {
                  time: 'desc',
                },
              },
              path: {
                include: {
                  check_points: true,
                },
              },
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
      const statistics: forklift_statistics_dto = {
        travel_distance: 0,
        orders_count: candidate.orders.length,
        travel_time: [],
        downtime: 0,
        time_in_status: {
          waiting: 0,
          processing: 0,
          ending: 0,
        },
      };
      await Promise.all(
        candidate.orders.map(async (order, index) => {
          const endStep = await this.prismaService.forklift_step.findFirst({
            where: {
              point_name: order.path.check_points[0].name,
              order_id: order.id,
            },
          });
          if (order.ended_at) {
            const processingTime =
              order.ended_at!.valueOf() - order.created_at.valueOf();
            statistics.time_in_status.processing += processingTime;
            const hasCurrentDate = statistics.travel_time.filter(
              (time) =>
                new Date(time.date).getDate() === order.ended_at?.getDate(),
            );
            if (!hasCurrentDate) {
              statistics.travel_time.map((time, index) => {
                if (
                  new Date(time.date).getDate() === order.ended_at?.getDate()
                ) {
                  statistics.travel_time[index].move_time += processingTime;
                }
              });
            }
            statistics.travel_time.push({
              date: order.ended_at?.getDate().toString(),
              move_time: processingTime,
            });
          }
          if (index !== 0) {
            if (
              candidate.orders[index - 1] !== null &&
              candidate.orders[index - 1].ended_at
            ) {
              const downTime =
                order.created_at.valueOf() -
                //@ts-ignore
                candidate.orders[index - 1].ended_at.valueOf();
              statistics.time_in_status.waiting += downTime;
            }
          }
          order.check_points_time.map((check, index) => {
            if (check.time > endStep!.time && index !== 0) {
              statistics.time_in_status.ending +=
                order.ended_at!.valueOf() - endStep!.time.valueOf();
            }
          });
          order.path.check_points.map((point) => {
            statistics.travel_distance += point.next_check_point_distance * 2;
          });
        }),
      );
      statistics.downtime +=
        new Date().valueOf() - candidate.orders[0].ended_at!.valueOf();
      statistics.time_in_status.waiting +=
        new Date().valueOf() - candidate.orders[0].ended_at!.valueOf();
      return statistics;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  findAll(): Promise<forklift[]> {
    try {
      return this.prismaService.forklift.findMany({
        include: {
          orders: {
            include: {
              path: true,
              check_points_time: true,
            },
          },
        },
      });
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
