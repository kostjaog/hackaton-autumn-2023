"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForkliftsService = void 0;
const common_1 = require("@nestjs/common");
let ForkliftsService = class ForkliftsService {
    create(createForkliftDto) {
        return 'This action adds a new forklift';
    }
    findAll() {
        return `This action returns all forklifts`;
    }
    findOne(id) {
        return `This action returns a #${id} forklift`;
    }
    update(id, updateForkliftDto) {
        return `This action updates a #${id} forklift`;
    }
    remove(id) {
        return `This action removes a #${id} forklift`;
    }
};
ForkliftsService = __decorate([
    (0, common_1.Injectable)()
], ForkliftsService);
exports.ForkliftsService = ForkliftsService;
//# sourceMappingURL=forklifts.service.js.map