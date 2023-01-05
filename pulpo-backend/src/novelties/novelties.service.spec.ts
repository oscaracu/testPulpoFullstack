import { Test, TestingModule } from '@nestjs/testing';
import { NoveltiesService } from './novelties.service';

describe('NoveltiesService', () => {
  let service: NoveltiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoveltiesService],
    }).compile();

    service = module.get<NoveltiesService>(NoveltiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
