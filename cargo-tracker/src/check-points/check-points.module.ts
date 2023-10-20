import { Module } from '@nestjs/common';
import { CheckPointsService } from './check-points.service';
import { CheckPointsController } from './check-points.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CheckPointsController],
  providers: [CheckPointsService],
  exports: [CheckPointsService],
})
export class CheckPointsModule {}
