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
exports.PathsController = void 0;
const common_1 = require("@nestjs/common");
const paths_service_1 = require("./paths.service");
const create_path_dto_1 = require("./dto/create-path.dto");
const swagger_1 = require("@nestjs/swagger");
let PathsController = class PathsController {
    constructor(pathsService) {
        this.pathsService = pathsService;
    }
    create(createPathDto) {
        return this.pathsService.create(createPathDto);
    }
    findAll() {
        return this.pathsService.findAll();
    }
    findOne(id) {
        return this.pathsService.findOne(id);
    }
    remove(id) {
        return this.pathsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_path_dto_1.CreatePathDto]),
    __metadata("design:returntype", void 0)
], PathsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PathsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PathsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PathsController.prototype, "remove", null);
PathsController = __decorate([
    (0, swagger_1.ApiTags)('paths'),
    (0, common_1.Controller)('paths'),
    __metadata("design:paramtypes", [paths_service_1.PathsService])
], PathsController);
exports.PathsController = PathsController;
//# sourceMappingURL=paths.controller.js.map