import { Test, TestingModule } from '@nestjs/testing';
import { WaifusController } from './waifus.controller';

describe('WaifusController', () => {
  let controller: WaifusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaifusController],
    }).compile();

    controller = module.get<WaifusController>(WaifusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
