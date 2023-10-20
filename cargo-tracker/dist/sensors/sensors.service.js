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
exports.SensorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SensorsService = class SensorsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(createSensorDto) {
        try {
            return this.prismaService.sensor.create({
                data: createSensorDto,
            });
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    }
    findAll() {
        try {
            return this.prismaService.sensor.findMany();
        }
        catch (err) {
            console.error(err.message);
            throw err;
        }
    }
    async findOne(id) {
        try {
            const candidate = await this.prismaService.sensor.findUnique({
                where: {
                    id,
                },
            });
            if (!candidate) {
                throw new common_1.HttpException('Sensor with provided id does not exist', common_1.HttpStatus.NOT_FOUND);
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
            const candidate = await this.prismaService.sensor.findUnique({
                where: {
                    id,
                },
            });
            if (!candidate) {
                throw new common_1.HttpException('Sensor with provided id does not exist', common_1.HttpStatus.NOT_FOUND);
            }
            return this.prismaService.sensor.delete({
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
SensorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SensorsService);
exports.SensorsService = SensorsService;
//# sourceMappingURL=sensors.service.js.map