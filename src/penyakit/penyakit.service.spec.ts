import { Test, TestingModule } from '@nestjs/testing';
import { PenyakitService } from './penyakit.service';

describe('PenyakitService', () => {
  let service: PenyakitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PenyakitService],
    }).compile();

    service = module.get<PenyakitService>(PenyakitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
