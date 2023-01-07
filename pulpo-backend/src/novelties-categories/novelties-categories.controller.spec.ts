import { Test, TestingModule } from '@nestjs/testing';
import { NoveltiesCategoriesController } from './novelties-categories.controller';
import { NoveltiesCategoriesService } from './novelties-categories.service';

describe('NoveltiesCategoriesController', () => {
  let controller: NoveltiesCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoveltiesCategoriesController],
      providers: [NoveltiesCategoriesService],
    }).compile();

    controller = module.get<NoveltiesCategoriesController>(NoveltiesCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
