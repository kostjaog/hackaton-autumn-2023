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
exports.WarehousesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WarehousesService = class WarehousesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(createWarehouseDto) {
        try {
            console.log(createWarehouseDto);
            return this.prismaService.warehouse.create({
                data: {
                    coordX: createWarehouseDto.coordX,
                    coordY: createWarehouseDto.coordY,
                    name: createWarehouseDto.name,
                },
            });
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    }
    findAll() {
        try {
            return this.prismaService.warehouse.findMany();
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    }
    findOne(id) {
        try {
            return this.prismaService.warehouse.findUnique({
                where: {
                    id,
                },
                include: {
                    loaders: {
                        orderBy: {
                            name: 'asc',
                        },
                        include: {
                            orders: {
                                include: {
                                    check_points_time: true,
                                    path: true,
                                },
                            },
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
    async remove(id) {
        try {
            const candidate = await this.prismaService.warehouse.findUnique({
                where: {
                    id,
                },
            });
            if (!candidate) {
                throw new common_1.HttpException('Waregouse with provided ID does not exist', common_1.HttpStatus.NOT_FOUND);
            }
            return this.prismaService.warehouse.delete({
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
WarehousesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WarehousesService);
exports.WarehousesService = WarehousesService;
//# sourceMappingURL=warehouses.service.js.map