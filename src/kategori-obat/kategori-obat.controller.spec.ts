import { Test, TestingModule } from '@nestjs/testing';
import { KategoriObatController } from './kategori-obat.controller';
import { KategoriObatService } from './kategori-obat.service';

describe('KategoriObatController', () => {
  let controller: KategoriObatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KategoriObatController],
      providers: [KategoriObatService],
    }).compile();

    controller = module.get<KategoriObatController>(KategoriObatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
