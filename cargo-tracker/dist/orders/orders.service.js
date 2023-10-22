"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
let OrdersService = class OrdersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(createOrderDto) {
        try {
            return this.prismaService.order.create({
                data: createOrderDto,
            });
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    }
    findAll() {
        try {
            return this.prismaService.order.findMany();
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    }
    async findOne(id) {
        try {
            const candidate = await this.prismaService.order.findUnique({
                where: {
                    id,
                },
            });
            if (!candidate) {
                throw new common_1.HttpException('Order with provided id does not exist', common_1.HttpStatus.NOT_FOUND);
            }
            return candidate;
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    }
    async remove(id) {
        try {
            const candidate = await this.prismaService.order.findUnique({
                where: {
                    id,
                },
            });
            if (!candidate) {
                throw new common_1.HttpException('Order with provided id does not exist', common_1.HttpStatus.NOT_FOUND);
            }
            return this.prismaService.order.delete({
                where: {
                    id,
                },
            });
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    }
    async loadOrderDataFromRMQ(msg, amqpMsg) {
        var _a;
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
                        status: client_1.forklift_status.PROCESSING_ORDER,
                    },
                });
                return;
            }
            else if (amqpMsg.fields.routingKey === 'reach_point') {
                console.log(`Forklift ${msg.forklift_name} reached point ${msg.point_name}...`);
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
                            not: client_1.order_status.DONE,
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
                                status: client_1.order_status.PROCESSING,
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
            }
            else if (amqpMsg.fields.routingKey === 'reach_target') {
                console.log(`Forklift ${msg.forklift_name} reached target ${msg.point_name}...`);
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
                            not: client_1.order_status.DONE,
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
                        status: client_1.forklift_status.ENDING_ORDER,
                    },
                });
                return;
            }
            else if (amqpMsg.fields.routingKey === 'finish_task') {
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
                            not: client_1.order_status.DONE,
                        },
                    },
                    include: {
                        path: {
                            include: {
                                check_points: true,
                            },
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
                        status: client_1.order_status.DONE,
                        ended_at: new Date(),
                    },
                });
                await this.prismaService.forklift.update({
                    where: {
                        id: forklift.id,
                    },
                    data: {
                        status: client_1.forklift_status.WAITING_ORDER,
                    },
                });
                const averageLength = order[0].path.check_points.reduce((next, curr) => {
                    return (next += curr.next_check_point_distance);
                }, 0);
                if (order[0].ended_at) {
                    const timeInPath = ((_a = order[0].ended_at) === null || _a === void 0 ? void 0 : _a.valueOf()) - order[0].created_at.valueOf();
                    await this.prismaService.forklift.update({
                        where: {
                            id: forklift.id,
                        },
                        data: {
                            average_speed: averageLength / new Date(timeInPath).getMinutes(),
                        },
                    });
                }
            }
            return;
        }
        catch (err) {
            console.error(err.message);
            return new nestjs_rabbitmq_1.Nack(false);
        }
    }
};
__decorate([
    (0, nestjs_rabbitmq_1.RabbitSubscribe)({
        queue: 'forklifts',
        exchange: 'integration',
        allowNonJsonMessages: true,
        createQueueIfNotExists: false,
        errorBehavior: nestjs_rabbitmq_1.MessageHandlerErrorBehavior.NACK,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersService.prototype, "loadOrderDataFromRMQ", null);
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map