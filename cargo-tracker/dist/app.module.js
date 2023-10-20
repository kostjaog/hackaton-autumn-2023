"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const warehouses_module_1 = require("./warehouses/warehouses.module");
const orders_module_1 = require("./orders/orders.module");
const forklift_steps_module_1 = require("./forklift-steps/forklift-steps.module");
const forklifts_module_1 = require("./forklifts/forklifts.module");
const paths_module_1 = require("./paths/paths.module");
const check_points_module_1 = require("./check-points/check-points.module");
const sensors_module_1 = require("./sensors/sensors.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            warehouses_module_1.WarehousesModule,
            orders_module_1.OrdersModule,
            forklift_steps_module_1.ForkliftStepsModule,
            forklifts_module_1.ForkliftsModule,
            paths_module_1.PathsModule,
            check_points_module_1.CheckPointsModule,
            sensors_module_1.SensorsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map