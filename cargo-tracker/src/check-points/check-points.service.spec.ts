import { Test, TestingModule } from '@nestjs/testing';
import { CheckPointsService } from './check-points.service';

describe('CheckPointsService', () => {
  let service: CheckPointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckPointsService],
    }).compile();

    service = module.get<CheckPointsService>(CheckPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
