"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorsService = void 0;
const common_1 = require("@nestjs/common");
let SensorsService = class SensorsService {
    create(createSensorDto) {
        return 'This action adds a new sensor';
    }
    findAll() {
        return `This action returns all sensors`;
    }
    findOne(id) {
        return `This action returns a #${id} sensor`;
    }
    update(id, updateSensorDto) {
        return `This action updates a #${id} sensor`;
    }
    remove(id) {
        return `This action removes a #${id} sensor`;
    }
};
SensorsService = __decorate([
    (0, common_1.Injectable)()
], SensorsService);
exports.SensorsService = SensorsService;
//# sourceMappingURL=sensors.service.js.map