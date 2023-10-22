import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ConsumeMessage } from 'amqplib';

import { forklift_status, order, order_status } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  MessageHandlerErrorBehavior,
  Nack,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { rmq_order_dto } from './dto/rmq-order.dto';

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

  @RabbitSubscribe({
    queue: 'forklifts',
    exchange: 'integration',
    allowNonJsonMessages: true,
    createQueueIfNotExists: false,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async loadOrderDataFromRMQ(msg: rmq_order_dto, amqpMsg: ConsumeMessage) {
    try {
      if (amqpMsg.fields.routingKey === 'start_task') {
        console.log('Starting task...', msg.forklift_name);
        const warehouse = await this.prismaService.warehouse.findUnique({
          where: {
            name: msg.warehouse_name,
          },
        });
        if (!warehouse) {
          throw new Error('Warehouse with provided id does not exist');
        }
        const forklift = await this.prismaService.forklift.findUnique({
          where: {
            name_warehouse_id: {
              name: msg.forklift_name,
              warehouse_id: warehouse.id,
            },
          },
        });
        if (!forklift) {
          throw new Error('Forklift with provided id does not exist');
        }
        const path = await this.prismaService.path.findUnique({
          where: {
            target_name: msg.target_point,
          },
        });
        if (!path) {
          throw new Error('Path with provided id does not exist');
        }
        await this.prismaService.order.create({
          data: {
            warehouse_id: warehouse.id,
            forklift_name: forklift.name,
            path_id: path.id,
          },
        });
        await this.prismaService.forklift.update({
          where: {
            id: forklift.id,
          },
          data: {
            status: forklift_status.PROCESSING_ORDER,
          },
        });
        return;
      } else if (amqpMsg.fields.routingKey === 'reach_point') {
        console.log(
          `Forklift ${msg.forklift_name} reached point ${msg.point_name}...`,
        );
        const warehouse = await this.prismaService.warehouse.findUnique({
          where: {
            name: msg.warehouse_name,
          },
        });
        if (!warehouse) {
          throw new Error('Warehouse with provided id does not exist');
        }
        const order = await this.prismaService.order.findMany({
          where: {
            forklift_name: msg.forklift_name,
            warehouse_id: warehouse.id,
            status: {
              not: order_status.DONE,
            },
          },
        });
        if (order.length === 0) {
          throw new Error('No order');
        }
        if (order[0]) {
          if (msg.point_name === 'K1') {
            await this.prismaService.order.update({
              where: {
                id: order[0].id,
              },
              data: {
                status: order_status.PROCESSING,
              },
            });
          }
          const newStep = await this.prismaService.forklift_step.create({
            data: {
              point_name: msg.point_name,
              time: new Date(msg.timestamp),
              order: {
                connect: {
                  id: order[0].id,
                },
              },
            },
          });
          await this.prismaService.order.update({
            where: {
              id: order[0].id,
            },
            data: {
              check_points_time: {
                connect: {
                  id: newStep.id,
                },
              },
            },
          });
        }
        return;
      } else if (amqpMsg.fields.routingKey === 'reach_target') {
        console.log(
          `Forklift ${msg.forklift_name} reached target ${msg.point_name}...`,
        );
        const warehouse = await this.prismaService.warehouse.findUnique({
          where: {
            name: msg.warehouse_name,
          },
        });
        if (!warehouse) {
          if (!warehouse) {
            throw new Error('Warehouse with provided id does not exist');
          }
        }
        const order = await this.prismaService.order.findMany({
          where: {
            forklift_name: msg.forklift_name,
            warehouse_id: warehouse.id,
            status: {
              not: order_status.DONE,
            },
          },
        });
        if (order) {
          const newStep = await this.prismaService.forklift_step.create({
            data: {
              point_name: msg.point_name,
              time: new Date(msg.timestamp),
              order: {
                connect: {
                  id: order[0].id,
                },
              },
            },
          });
          await this.prismaService.order.update({
            where: {
              id: order[0].id,
            },
            data: {
              check_points_time: {
                connect: {
                  id: newStep.id,
                },
              },
            },
          });
        }

        const forklift = await this.prismaService.forklift.findUnique({
          where: {
            name_warehouse_id: {
              name: order[0].forklift_name,
              warehouse_id: warehouse.id,
            },
          },
        });
        if (!forklift) {
          if (!forklift) {
            throw new Error('Forklift with provided id does not exist');
          }
        }
        await this.prismaService.forklift.update({
          where: {
            id: forklift.id,
          },
          data: {
            status: forklift_status.ENDING_ORDER,
          },
        });
        return;
      } else if (amqpMsg.fields.routingKey === 'finish_task') {
        console.log(`Forklift ${msg.forklift_name} finished task...`);
        const warehouse = await this.prismaService.warehouse.findUnique({
          where: {
            name: msg.warehouse_name,
          },
        });
        if (!warehouse) {
          if (!warehouse) {
            throw new Error('Warehouse with provided id does not exist');
          }
        }
        const order = await this.prismaService.order.findMany({
          where: {
            forklift_name: msg.forklift_name,
            warehouse_id: warehouse.id,
            status: {
              not: order_status.DONE,
            },
          },
        });
        if (order) {
          const newStep = await this.prismaService.forklift_step.create({
            data: {
              point_name: msg.point_name,
              time: new Date(msg.timestamp),
              order: {
                connect: {
                  id: order[0].id,
                },
              },
            },
          });
          await this.prismaService.order.update({
            where: {
              id: order[0].id,
            },
            data: {
              check_points_time: {
                connect: {
                  id: newStep.id,
                },
              },
            },
          });
        }

        const forklift = await this.prismaService.forklift.findUnique({
          where: {
            name_warehouse_id: {
              name: order[0].forklift_name,
              warehouse_id: warehouse.id,
            },
          },
        });
        if (!forklift) {
          if (!forklift) {
            throw new Error('Forklift with provided id does not exist');
          }
        }
        await this.prismaService.order.update({
          where: {
            id: order[0].id,
          },
          data: {
            status: order_status.DONE,
            ended_at: new Date(),
          },
        });
        await this.prismaService.forklift.update({
          where: {
            id: forklift.id,
          },
          data: {
            status: forklift_status.WAITING_ORDER,
          },
        });
      }
      return;
    } catch (err) {
      console.error(err.message);
      return new Nack(false);
    }
  }
}
