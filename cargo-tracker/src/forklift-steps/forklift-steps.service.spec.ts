import { Test, TestingModule } from '@nestjs/testing';
import { ForkliftStepsService } from './forklift-steps.service';

describe('ForkliftStepsService', () => {
  let service: ForkliftStepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForkliftStepsService],
    }).compile();

    service = module.get<ForkliftStepsService>(ForkliftStepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
