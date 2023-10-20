import { Module } from '@nestjs/common';
import { CheckPointsService } from './check-points.service';
import { CheckPointsController } from './check-points.controller';

@Module({
  controllers: [CheckPointsController],
  providers: [CheckPointsService]
})
export class CheckPointsModule {}
