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
exports.ForkliftsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let ForkliftsService = class ForkliftsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(createForkliftDto) {
        try {
            return this.prismaService.forklift.create({
                data: {
                    name: createForkliftDto.name,
                    last_tm_date: new Date(createForkliftDto.last_tm_date),
                    next_tm_date: new Date(new Date().setDate(new Date(createForkliftDto.last_tm_date).getDate() + 181)),
                    warehouse: {
                        connect: {
                            name: createForkliftDto.warehouse_name,
                        },
                    },
                },
            });
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    }
    async warehouseTransfer(forklift_id, warehouse_id) {
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
                throw new common_1.HttpException('One of two entities with provided data does not exist', common_1.HttpStatus.NOT_FOUND);
            }
            const orders = await this.prismaService.order.findMany({
                where: {
                    warehouse_id,
                    forklift_name: forkliftCandidate.name,
                    status: {
                        not: client_1.order_status.DONE,
                    },
                },
            });
            orders.map(async (order) => {
                await this.prismaService.order.update({
                    where: {
                        id: order.id,
                    },
                    data: {
                        status: client_1.order_status.DONE,
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
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    }
    async getStatistics(id, start_date, end_date) {
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
                            status: client_1.order_status.DONE,
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
                throw new common_1.HttpException('Forklift with provided id does not exist', common_1.HttpStatus.NOT_FOUND);
            }
            const statistics = {
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
            await Promise.all(candidate.orders.map(async (order, index) => {
                var _a;
                const endStep = await this.prismaService.forklift_step.findFirst({
                    where: {
                        point_name: order.path.check_points[0].name,
                        order_id: order.id,
                    },
                });
                if (order.ended_at) {
                    const processingTime = order.ended_at.valueOf() - order.created_at.valueOf();
                    statistics.time_in_status.processing += processingTime;
                    const hasCurrentDate = statistics.travel_time.filter((time) => { var _a; return new Date(time.date).getDate() === ((_a = order.ended_at) === null || _a === void 0 ? void 0 : _a.getDate()); });
                    if (!hasCurrentDate) {
                        statistics.travel_time.map((time, index) => {
                            var _a;
                            if (new Date(time.date).getDate() === ((_a = order.ended_at) === null || _a === void 0 ? void 0 : _a.getDate())) {
                                statistics.travel_time[index].move_time += processingTime;
                            }
                        });
                    }
                    statistics.travel_time.push({
                        date: (_a = order.ended_at) === null || _a === void 0 ? void 0 : _a.getDate().toString(),
                        move_time: processingTime,
                    });
                }
                if (index !== 0) {
                    if (candidate.orders[index - 1] !== null &&
                        candidate.orders[index - 1].ended_at) {
                        const downTime = order.created_at.valueOf() -
                            candidate.orders[index - 1].ended_at.valueOf();
                        statistics.time_in_status.waiting += downTime;
                    }
                }
                order.check_points_time.map((check, index) => {
                    if (check.time > endStep.time && index !== 0) {
                        statistics.time_in_status.ending +=
                            order.ended_at.valueOf() - endStep.time.valueOf();
                    }
                });
                order.path.check_points.map((point) => {
                    statistics.travel_distance += point.next_check_point_distance * 2;
                });
            }));
            statistics.downtime +=
                new Date().valueOf() - candidate.orders[0].ended_at.valueOf();
            statistics.time_in_status.waiting +=
                new Date().valueOf() - candidate.orders[0].ended_at.valueOf();
            return statistics;
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    }
    findAll() {
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
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    }
    async findOne(id) {
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
                throw new common_1.HttpException('Forklift with provided id does not exist', common_1.HttpStatus.NOT_FOUND);
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
            const candidate = await this.prismaService.forklift.findUnique({
                where: {
                    id,
                },
            });
            if (!candidate) {
                throw new common_1.HttpException('Forklift with provided id does not exist', common_1.HttpStatus.NOT_FOUND);
            }
            return this.prismaService.forklift.delete({
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
};
ForkliftsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ForkliftsService);
exports.ForkliftsService = ForkliftsService;
//# sourceMappingURL=forklifts.service.js.map