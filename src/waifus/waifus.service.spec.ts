import { Test, TestingModule } from '@nestjs/testing';
import { WaifusService } from './waifus.service';

describe('WaifusService', () => {
  let service: WaifusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaifusService],
    }).compile();

    service = module.get<WaifusService>(WaifusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
