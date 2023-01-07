import { Test, TestingModule } from '@nestjs/testing';
import { NoveltiesCategoriesService } from './novelties-categories.service';

describe('NoveltiesCategoriesService', () => {
  let service: NoveltiesCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoveltiesCategoriesService],
    }).compile();

    service = module.get<NoveltiesCategoriesService>(NoveltiesCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
