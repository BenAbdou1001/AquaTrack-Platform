import { Test, TestingModule } from '@nestjs/testing';
import { ForecastingController } from './forecasting.controller';
import { ForecastingService } from './forecasting.service';

describe('ForecastingController', () => {
  let controller: ForecastingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForecastingController],
      providers: [ForecastingService],
    }).compile();

    controller = module.get<ForecastingController>(ForecastingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
