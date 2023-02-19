import { Test, TestingModule } from '@nestjs/testing';
import { WaifusMembersService } from './waifus-members.service';

describe('WaifusMembersService', () => {
  let service: WaifusMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaifusMembersService],
    }).compile();

    service = module.get<WaifusMembersService>(WaifusMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
