import { Test, TestingModule } from '@nestjs/testing';
import { ForecastingService } from './forecasting.service';

describe('ForecastingService', () => {
  let service: ForecastingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForecastingService],
    }).compile();

    service = module.get<ForecastingService>(ForecastingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
