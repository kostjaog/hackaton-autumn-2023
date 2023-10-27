import { Module } from '@nestjs/common';
import { ForkliftsService } from './forklifts.service';
import { ForkliftsController } from './forklifts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ForkliftsController],
  providers: [ForkliftsService],
  exports: [ForkliftsService],
})
export class ForkliftsModule {}
