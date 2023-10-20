import { Module } from '@nestjs/common';
import { WarehousesModule } from './warehouses/warehouses.module';
import { OrdersModule } from './orders/orders.module';
import { ForkliftStepsModule } from './forklift-steps/forklift-steps.module';
import { ForkliftsModule } from './forklifts/forklifts.module';
import { PathsModule } from './paths/paths.module';
import { CheckPointsModule } from './check-points/check-points.module';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  imports: [
    WarehousesModule,
    OrdersModule,
    ForkliftStepsModule,
    ForkliftsModule,
    PathsModule,
    CheckPointsModule,
    SensorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
