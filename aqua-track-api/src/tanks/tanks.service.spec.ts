import { Test, TestingModule } from '@nestjs/testing';
import { TanksService } from './tanks.service';

describe('TanksService', () => {
  let service: TanksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TanksService],
    }).compile();

    service = module.get<TanksService>(TanksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
