import { Test, TestingModule } from '@nestjs/testing';
import { CheckPointsController } from './check-points.controller';
import { CheckPointsService } from './check-points.service';

describe('CheckPointsController', () => {
  let controller: CheckPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckPointsController],
      providers: [CheckPointsService],
    }).compile();

    controller = module.get<CheckPointsController>(CheckPointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
