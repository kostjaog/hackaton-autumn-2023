"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForkliftStepsModule = void 0;
const common_1 = require("@nestjs/common");
const forklift_steps_service_1 = require("./forklift-steps.service");
const forklift_steps_controller_1 = require("./forklift-steps.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let ForkliftStepsModule = class ForkliftStepsModule {
};
ForkliftStepsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [forklift_steps_controller_1.ForkliftStepsController],
        providers: [forklift_steps_service_1.ForkliftStepsService],
        exports: [forklift_steps_service_1.ForkliftStepsService],
    })
], ForkliftStepsModule);
exports.ForkliftStepsModule = ForkliftStepsModule;
//# sourceMappingURL=forklift-steps.module.js.map