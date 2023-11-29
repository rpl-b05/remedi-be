import { Test, TestingModule } from '@nestjs/testing';
import { KategoriObatService } from './kategori-obat.service';

describe('KategoriObatService', () => {
  let service: KategoriObatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KategoriObatService],
    }).compile();

    service = module.get<KategoriObatService>(KategoriObatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
