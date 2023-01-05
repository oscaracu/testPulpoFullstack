import { Test, TestingModule } from '@nestjs/testing';
import { NoveltiesController } from './novelties.controller';
import { NoveltiesService } from './novelties.service';

describe('NoveltiesController', () => {
  let controller: NoveltiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoveltiesController],
      providers: [NoveltiesService],
    }).compile();

    controller = module.get<NoveltiesController>(NoveltiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
