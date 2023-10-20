import { Test, TestingModule } from '@nestjs/testing';
import { ForkliftStepsController } from './forklift-steps.controller';
import { ForkliftStepsService } from './forklift-steps.service';

describe('ForkliftStepsController', () => {
  let controller: ForkliftStepsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForkliftStepsController],
      providers: [ForkliftStepsService],
    }).compile();

    controller = module.get<ForkliftStepsController>(ForkliftStepsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
