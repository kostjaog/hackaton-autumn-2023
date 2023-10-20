import { Test, TestingModule } from '@nestjs/testing';
import { ForkliftsController } from './forklifts.controller';
import { ForkliftsService } from './forklifts.service';

describe('ForkliftsController', () => {
  let controller: ForkliftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForkliftsController],
      providers: [ForkliftsService],
    }).compile();

    controller = module.get<ForkliftsController>(ForkliftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
