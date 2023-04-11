import { Test, TestingModule } from '@nestjs/testing';
import { WaifusMembersController } from './waifus-members.controller';

describe('WaifusMembersController', () => {
  let controller: WaifusMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaifusMembersController],
    }).compile();

    controller = module.get<WaifusMembersController>(WaifusMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
