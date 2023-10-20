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
exports.ForkliftsController = void 0;
const common_1 = require("@nestjs/common");
const forklifts_service_1 = require("./forklifts.service");
const create_forklift_dto_1 = require("./dto/create-forklift.dto");
const update_forklift_dto_1 = require("./dto/update-forklift.dto");
let ForkliftsController = class ForkliftsController {
    constructor(forkliftsService) {
        this.forkliftsService = forkliftsService;
    }
    create(createForkliftDto) {
        return this.forkliftsService.create(createForkliftDto);
    }
    findAll() {
        return this.forkliftsService.findAll();
    }
    findOne(id) {
        return this.forkliftsService.findOne(+id);
    }
    update(id, updateForkliftDto) {
        return this.forkliftsService.update(+id, updateForkliftDto);
    }
    remove(id) {
        return this.forkliftsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_forklift_dto_1.CreateForkliftDto]),
    __metadata("design:returntype", void 0)
], ForkliftsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ForkliftsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForkliftsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_forklift_dto_1.UpdateForkliftDto]),
    __metadata("design:returntype", void 0)
], ForkliftsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForkliftsController.prototype, "remove", null);
ForkliftsController = __decorate([
    (0, common_1.Controller)('forklifts'),
    __metadata("design:paramtypes", [forklifts_service_1.ForkliftsService])
], ForkliftsController);
exports.ForkliftsController = ForkliftsController;
//# sourceMappingURL=forklifts.controller.js.map