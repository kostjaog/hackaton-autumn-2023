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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPointsController = void 0;
const common_1 = require("@nestjs/common");
const check_points_service_1 = require("./check-points.service");
const create_check_point_dto_1 = require("./dto/create-check-point.dto");
const swagger_1 = require("@nestjs/swagger");
let CheckPointsController = class CheckPointsController {
    constructor(checkPointsService) {
        this.checkPointsService = checkPointsService;
    }
    create(createCheckPointDto) {
        return this.checkPointsService.create(createCheckPointDto);
    }
    findAll() {
        return this.checkPointsService.findAll();
    }
    findOne(id) {
        return this.checkPointsService.findOne(id);
    }
    remove(id) {
        return this.checkPointsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_check_point_dto_1.CreateCheckPointDto]),
    __metadata("design:returntype", void 0)
], CheckPointsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CheckPointsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CheckPointsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CheckPointsController.prototype, "remove", null);
CheckPointsController = __decorate([
    (0, swagger_1.ApiTags)('check-points'),
    (0, common_1.Controller)('check-points'),
    __metadata("design:paramtypes", [check_points_service_1.CheckPointsService])
], CheckPointsController);
exports.CheckPointsController = CheckPointsController;
//# sourceMappingURL=check-points.controller.js.map