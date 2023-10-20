import { Module } from '@nestjs/common';
import { ForkliftStepsService } from './forklift-steps.service';
import { ForkliftStepsController } from './forklift-steps.controller';

@Module({
  controllers: [ForkliftStepsController],
  providers: [ForkliftStepsService]
})
export class ForkliftStepsModule {}
