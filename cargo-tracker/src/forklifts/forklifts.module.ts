import { Module } from '@nestjs/common';
import { ForkliftsService } from './forklifts.service';
import { ForkliftsController } from './forklifts.controller';

@Module({
  controllers: [ForkliftsController],
  providers: [ForkliftsService]
})
export class ForkliftsModule {}
