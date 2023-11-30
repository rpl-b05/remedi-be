import { Test, TestingModule } from '@nestjs/testing';
import { PenyakitController } from './penyakit.controller';

describe('PenyakitController', () => {
  let controller: PenyakitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PenyakitController],
    }).compile();

    controller = module.get<PenyakitController>(PenyakitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
