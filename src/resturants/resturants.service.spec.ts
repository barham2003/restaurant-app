import { Test, TestingModule } from '@nestjs/testing';
import { ResturantsService } from './resturants.service';

describe('ResturantsService', () => {
  let service: ResturantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResturantsService],
    }).compile();

    service = module.get<ResturantsService>(ResturantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
