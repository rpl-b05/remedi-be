import { Module } from '@nestjs/common';
import { PenyakitService } from './penyakit.service';
import { PenyakitController } from './penyakit.controller';

@Module({
  providers: [PenyakitService],
  controllers: [PenyakitController],
})
export class PenyakitModule {}
