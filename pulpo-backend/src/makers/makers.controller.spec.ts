import { Test, TestingModule } from '@nestjs/testing';
import { MakersController } from './makers.controller';
import { MakersService } from './makers.service';

describe('MakersController', () => {
  let controller: MakersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MakersController],
      providers: [MakersService],
    }).compile();

    controller = module.get<MakersController>(MakersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
