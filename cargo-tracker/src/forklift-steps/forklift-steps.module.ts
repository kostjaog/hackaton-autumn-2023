import { Module } from '@nestjs/common';
import { ForkliftStepsService } from './forklift-steps.service';
import { ForkliftStepsController } from './forklift-steps.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ForkliftStepsController],
  providers: [ForkliftStepsService],
  exports: [ForkliftStepsService],
})
export class ForkliftStepsModule {}
