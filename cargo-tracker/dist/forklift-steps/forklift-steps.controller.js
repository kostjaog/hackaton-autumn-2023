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
exports.ForkliftStepsController = void 0;
const common_1 = require("@nestjs/common");
const forklift_steps_service_1 = require("./forklift-steps.service");
const create_forklift_step_dto_1 = require("./dto/create-forklift-step.dto");
const update_forklift_step_dto_1 = require("./dto/update-forklift-step.dto");
let ForkliftStepsController = class ForkliftStepsController {
    constructor(forkliftStepsService) {
        this.forkliftStepsService = forkliftStepsService;
    }
    create(createForkliftStepDto) {
        return this.forkliftStepsService.create(createForkliftStepDto);
    }
    findAll() {
        return this.forkliftStepsService.findAll();
    }
    findOne(id) {
        return this.forkliftStepsService.findOne(+id);
    }
    update(id, updateForkliftStepDto) {
        return this.forkliftStepsService.update(+id, updateForkliftStepDto);
    }
    remove(id) {
        return this.forkliftStepsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_forklift_step_dto_1.CreateForkliftStepDto]),
    __metadata("design:returntype", void 0)
], ForkliftStepsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ForkliftStepsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForkliftStepsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_forklift_step_dto_1.UpdateForkliftStepDto]),
    __metadata("design:returntype", void 0)
], ForkliftStepsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForkliftStepsController.prototype, "remove", null);
ForkliftStepsController = __decorate([
    (0, common_1.Controller)('forklift-steps'),
    __metadata("design:paramtypes", [forklift_steps_service_1.ForkliftStepsService])
], ForkliftStepsController);
exports.ForkliftStepsController = ForkliftStepsController;
//# sourceMappingURL=forklift-steps.controller.js.map